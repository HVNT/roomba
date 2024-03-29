angular.module('roomba.app')
    .config(['$routeProvider', '$provide',
        function ($routeProvider, $provide) {
            $routeProvider
                .when('/market',
                {
                    redirectTo: '/market/listings'
                })
                .when('/market/:collection',
                {
                    templateUrl: '/app/market/views/market.html?v=' + Date.now(),
                    controller: 'CollectionCtrl',
                    reloadOnSearch: false,
                    resolve: {
                        init: function ($q, $http, User, Users, $route) {
                            var defer = $q.defer();

                            User.get()
                                .then(function (user) {
                                    if (User.isAdmin) {
                                        // If admin, get Users
                                        defer.resolve(Users.init());
                                    } else {
                                        defer.resolve(user);
                                    }
                                });

                            return defer.promise;
                        },
                        Market: function ($route, $q, Models) {
                            var defer = $q.defer(),
                                _Item;

                            Models.request()
                                .then(function (models) {
                                    _Item = models[$route.current.params.collection];
                                    if (_Item) {
                                        Models.setActive($route.current.params.collection);
                                    }
                                    return _Item.query();
                                })
                                .then(function (response) {
                                    var Market = new thotpod.Marketplace(_Item);
                                    Market.initialize(_Item.dimensions, response);
                                    defer.resolve(Market);
                                });

                            return defer.promise;
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/market'
                });
        }])
    .controller('CollectionCtrl', ['$scope', 'Market', '$routeParams', '$location', '$q', '$dialog', 'States_Inverse', 'Users', 'User', '$window',
        function ($scope, Market, $routeParams, $location, $q, $dialog, States_Inverse, Users, User, $window) {
            var Model = Market.Model;
            $scope.items = Market.visibleItems;
            $scope.dimensions = Market.dimensions;
            $scope.activeItem = Market.getActive();
            $scope.activeItemResources = {};
            $scope.collectionID = $routeParams.collection;
            $scope.collection = Model.collection;
            $scope.srcListingDetails = '/app/market/partials/' + $scope.collection.key + '-details.html?v=' + Date.now();
            $scope.searchBy = {
                $: ""
            };
            $scope.marketView = {
                collapseFilters: true
            };
            $scope.activeSearch = {title: 'Any', key: '$'};

            if (User.isAdmin) {
                $scope.users = Users.generateStats($scope.collectionID, Market.getItems());
            }

            $scope.joinDialog = $dialog.dialog({
                templateUrl: '/app/market/partials/join-dialog.html?v=' + Date.now(),
                controller: 'JoinDialogCtrl',
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                dialogFade: true,
                backdropFade: true,
                resolve: {
                    Market: function () {
                        return Market;
                    }
                }
            });

            $scope.userDialog = $dialog.dialog({
                templateUrl: '/app/market/partials/user-dialog.html?v=' + Date.now(),
                controller: 'UserDialogCtrl',
                resolve: {
                    user: function () {
                        return $scope.users[$scope.activeItem._updatedBy];
                    },
                    collection: function () {
                        return $scope.collectionID;
                    }
                }
            });

            $scope.openUserDialog = function () {
                $scope.userDialog.open().then(function (item) {
                    if (item) {
                        $location.search('id', item.id);
                    }
                });
            };

            $scope.applyFilters = function () {
                $scope.items = Market.apply();
            };

            $scope.selectItem = function (item) {
                if (Market.setActive(item)) {
                    $scope.previousActive = $scope.activeItem;

                    $scope.activeItem = Market.getActive();
                    $scope.activeItem.isActive = true;
                    $scope.activeItemResources = {};

                    if ($scope.previousActive) {
                        $scope.previousActive.isActive = false;
                    }
                }
            };

            function setActiveItem(id) {
                if (id) {
                    $scope.selectItem(id);

                    if ($scope.activeItem) {
                        $scope.activeItem.$getResources().then(function (results) {
                            for (var i = results.length - 1; i >= 0; i--) {
                                for (var _resource in results[i]) {
                                    if (results[i].hasOwnProperty(_resource)) {
                                        $scope.activeItemResources[_resource] = [];
                                        angular.copy(results[i][_resource], $scope.activeItemResources[_resource]);
                                    }
                                }
                            }
                        });
                    }
                }
            }

            if ($location.search().id) {
                setActiveItem($location.search().id);
            }

            $scope.$on('$locationChangeSuccess', function (e, newLocation, oldLocation) {
                if ($location.search().id) {
                    setActiveItem($location.search().id);
                }
            });

            $scope.getStatusBg = function (status, type) {
                type = type || 'solid';

                switch (status) {
                    case 0:
                        return 'status-' + type + '-info';
                    case 1:
                        return 'status-' + type + '-success';
                    case 2:
                        return 'status-' + type + '-warning';
                    case 3:
                        return 'status-' + type + '-error';
                    default:
                        return 'status-' + type + '-unknown';
                }
            };

            $scope.newItem = function () {
                var _newItem = new Model();
                $scope.items.unshift(_newItem);
                $scope.selectItem(_newItem);
            };

            $scope.duplicateNewsItem = function (newsItem) {
                var _dupe = new Model();

                if(_dupe.title == "New News") {
                    _dupe.address = newsItem.address;
                    _dupe.body = newsItem.body;
                    _dupe.category = newsItem.category;
                    _dupe.city = newsItem.city;
                    _dupe.date = newsItem.date;
                    _dupe.datePosted = newsItem.datePosted;
                    _dupe.site = newsItem.site;
                    _dupe.source = newsItem.source;
                    _dupe.state = newsItem.state;
                    _dupe.tags = newsItem.tags;
                    _dupe.title = newsItem.title;
                    _dupe.url = newsItem.url;
                    $scope.items.unshift(_dupe);
                    $scope.selectItem(_dupe);
                } else {
                    console.log("Cannot currently duplicated other item types");
                }
            };

            $scope.findMyAssessor = function (activeItem) {
//                var _county = activeItem.edited.county.toLowerCase(),
                var _state = activeItem.edited.address.state ?
                    activeItem.edited.address.state.trim() : activeItem.state.trim();

                // county is buggy because shit is fucked.. so until i can figure out hack to see
                // if a url will return a 404 this is the best we can do
                var url = 'http://publicrecords.netronline.com/state/' + States_Inverse[_state] + '/';
//                        + '/county/' + _county + '/';

                console.log(url);
                $window.open(url);
            };

            $scope.visitMyAssessor = function (activeItem) {
                $window.open(activeItem.edited.assessorUrl);
            };


            $scope.classRawField = function (field) {
                if (field) {
                    if (field.copied) {
                        return 'status-btn-success'
                    } else {
                        return $scope.getStatusBg(field.status, 'btn')
                    }
                }
            };

            $scope.isRawNull = function (field) {
                return field ? (field.value === "" || field.value == null) : true;
            };

            $scope.hasTag = function (item, tag) {
                return _.contains(item.tags, tag);
            };

            $scope.setSearchCriteria = function (field) {
                $scope.activeSearch = {};
                $scope.activeSearch = field ? field : {title: 'Any', key: '$'};
                $scope.searchBy[$scope.activeSearch.key] = "";
            };

            $scope.flagSelected = function () {
                var successes = 0;
                for (var i = $scope.items.length - 1; i >= 0; i--) {
                    var _item = $scope.items[i];
                    if (_item.isSelected) {
                        _item.$flag().then(function () {
                            successes++;
                            $scope.setGlobalAlert({
                                type: 'success',
                                text: successes + " items flagged."
                            });
                        });
                        _item.isSelected = false;
                    }
                }
            };

            $scope.publishSelected = function () {
                var successes = 0;
                for (var i = $scope.items.length - 1; i >= 0; i--) {
                    var _item = $scope.items[i];
                    if (_item.isSelected) {
                        _item.$publish().then(function () {
                            successes++;
                            $scope.setGlobalAlert({
                                type: 'success',
                                text: successes + " items published."
                            });
                        });
                        _item.isSelected = false;
                    }
                }
            };

            $scope.unpublishSelected = function () {
                var successes = 0;
                for (var i = $scope.items.length - 1; i >= 0; i--) {
                    var _item = $scope.items[i];
                    if (_item.isSelected) {
                        _item.$unpublish().then(function () {
                            successes++;
                            $scope.setGlobalAlert({
                                type: 'success',
                                text: successes + " items unpublished."
                            });
                        });
                        _item.isSelected = false;
                    }
                }
            };

            $scope.saveSelected = function () {
                var saveStats = {
                    saveSuccesses: 0,
                    saveFails: 0,
                    geoSuccesses: 0,
                    geoFails: 0
                };

                function saveAll() {
                    var promises = [];
                    for (var i = $scope.items.length - 1; i >= 0; i--) {
                        var _item = $scope.items[i];
                        if (_item.isSelected) {
                            var defer = $q.defer();

                            (function (defer, saveStats, _item) {
                                _item.$geocode()
                                    .then(function (response) {
                                        if (response.status) {
                                            saveStats.geoSuccesses++;
                                        } else {
                                            console.log(response);
                                            saveStats.geoFails++;
                                        }
                                        return _item.$save();
                                    }, function (response) {
                                        console.log(response);
                                        saveStats.geoFails++;
                                    })
                                    .then(function () {
                                        saveStats.saveSuccesses++;
                                        defer.resolve();
                                    }, function () {
                                        defer.reject();
                                        saveStats.saveFails++;
                                    });
                            })(defer, saveStats, _item);
                            promises.push(defer.promise);

                            _item.isSelected = false;
                        }
                    }

                    return $q.all(promises);
                }

                saveAll().then(function () {
                    if (saveStats.geoFails || saveStats.saveFails) {
                        $scope.setGlobalAlert([
                            {
                                type: 'success',
                                text: saveStats.geoSuccesses + " items geocoded. " + saveStats.saveSuccesses + " items saved."
                            },
                            {
                                type: 'danger',
                                text: saveStats.geoFails + " geocode fails." + saveStats.saveFails + " save fails.  "
                            }
                        ]);
                    } else {
                        $scope.setGlobalAlert({
                            type: 'success',
                            text: saveStats.geoSuccesses + " items geocoded. " + saveStats.saveSuccesses + " items saved."
                        });
                    }
                })

            };

            $scope.openJoinDialog = function () {
                $scope.joinDialog.open().then(function (response) {
                    if (response) {
                        $scope.setGlobalAlert({
                            type: response.status,
                            text: response.message
                        });
                    }
                });
            }

            $scope.noop = function () {
                return null;
            };

            $scope.toggleDiscrete = function (discrete, value) {
                $scope.items = Market.toggleDiscrete(discrete, value).apply();
                Market.predict();
            };
        }])
    .
    controller('MarketListCtrl', ['$scope', '$location',
        function ($scope, $location) {
            var selectToggle = true;

            $scope.openDetails = function (item) {
                if (item.id) {
                    $location.search('id', item.id);
                } else {
                    $location.search('id', '');
                    $scope.selectItem(item);
                }
            };

            $scope.sortFields = {
                title: false,
                completion: false,
                state: false,
                datePosted: false
            };

            $scope.setSortField = function (sortField) {
                angular.forEach($scope.sortFields, function (value, key) {
                    $scope.sortFields[key] = false;
                });
                $scope.sortBy = sortField;
                $scope.sortFields[sortField] = true;
            };

            $scope.toggleSelectAll = function () {
                angular.forEach($scope.filteredItems, function (value) {
                    value.isSelected = selectToggle;
                });
                selectToggle = !selectToggle;
            };
        }])
    .controller('DetailsCtrl', ['$scope', '$routeParams',
        function ($scope, $routeParams) {
            function copyRaw(obj) {
                angular.forEach(obj.raw, function (rawValue, key) {
                    if (rawValue.hasOwnProperty('status') && rawValue.hasOwnProperty('value')) {
                        if (!obj.edited[key] && rawValue.value != null) {
                            $scope.copyFromRaw(obj, key);
                        }
                    } else if (rawValue.length) {
                        if (!obj.edited[key].length && angular.isArray(obj.edited[key])) {
                            angular.forEach(rawValue, function (rawModel) {
                                $scope.copyModelFromRaw(obj, key, rawModel);
                            });
                        }
                    } else if (!angular.isArray(rawValue)) {
                        angular.forEach(rawValue, function (rawSubValue, subKey) {
                            if (rawSubValue.hasOwnProperty('status') && rawSubValue.hasOwnProperty('value')) {
                                if (rawSubValue.value) {
                                    $scope.copySubfieldFromRaw(obj, key, subKey);
                                }
                            }
                        });
                    }
                });
            }

            $scope.notPublished = function (item) {
                return !_.contains(item.tags, 'published');
            };

            $scope.copyAllRaw = function (item, itemResources) {
                if (item.hasOwnProperty('raw') && item.hasOwnProperty('edited')) {
                    copyRaw(item);
                }

                angular.forEach(itemResources, function (subresources, key) {
                    angular.forEach(subresources, function (subresource, key) {
                        if (subresource.hasOwnProperty('raw') && subresource.hasOwnProperty('edited')) {
                            copyRaw(subresource);
                        }
                    });
                });
            };

            $scope.copyModelFromRaw = function (item, modelKey, rawModel) {
                var _modelConfig = _.find($scope.collection.models, function (val) {
                        return val.key === modelKey;
                    }),
                    _editedModel = {};

                angular.forEach(_modelConfig.fields, function (modelField) {
                    _editedModel[modelField.key] = rawModel[modelField.key].value || "";
                });

                item.edited[modelKey].push(_editedModel);

                rawModel.copied = true;
            };

            $scope.copyFromRaw = function (item, fieldKey) {
                item.edited[fieldKey] = item.raw[fieldKey].value;
                item.raw[fieldKey].copied = true;
            };

            $scope.copySubfieldFromRaw = function (item, fieldKey, subfieldKey) {
                item.edited[fieldKey][subfieldKey] = item.raw[fieldKey][subfieldKey].value;
                item.raw[fieldKey][subfieldKey].copied = true;
            };

            $scope.saveItem = function (item) {

                $scope.clearGlobalAlerts();
                if (_.isEmpty($scope.activeItemResources)) {
                    item.$geocode()
                        .then(function (response) {
                            if (response.status) {
                                $scope.addGlobalAlert({
                                    type: 'success',
                                    text: item.title + ' successfully geocoded.'
                                });
                            } else {
                                $scope.addGlobalAlert({
                                    type: 'warning',
                                    text: item.title + ' did not geocode: ' + response.message
                                });
                            }
                            return item.$save();
                        }, function (response) {
                            $scope.addGlobalAlert({
                                type: 'danger',
                                text: 'Error during geocoding: ' + response.message || ''
                            });
                        })
                        .then(function () {
                            $scope.addGlobalAlert({
                                type: 'success',
                                text: item.title + ' successfully saved.'
                            });
                        }, function () {
                            $scope.addGlobalAlert({
                                type: 'danger',
                                text: 'Failed to save ' + item.title + '.'
                            });
                        });
                } else {
                    item.$geocode()
                        .then(function (response) {
                            if (response.status) {
                                $scope.addGlobalAlert({
                                    type: 'success',
                                    text: item.title + ' successfully geocoded.'
                                });
                            } else {
                                $scope.addGlobalAlert({
                                    type: 'warning',
                                    text: item.title + ' did not geocode: ' + response.message
                                });
                            }
                            return item.$saveResources($scope.activeItemResources);
                        }, function (response) {
                            $scope.addGlobalAlert({
                                type: 'danger',
                                text: 'Error during geocoding: ' + response.message || ''
                            });
                        })
                        .then(function (results) {
                            $scope.addGlobalAlert({
                                type: 'success',
                                text: 'Resources successfully saved.'
                            });

                            return item.$save();
                        }, function () {
                            $scope.addGlobalAlert({
                                type: 'danger',
                                text: 'Failed to save resources.'
                            });
                        })
                        .then(function () {
                            $scope.addGlobalAlert({
                                type: 'success',
                                text: item.title + ' successfully saved.'
                            });
                            return
                        }, function () {
                            $scope.addGlobalAlert({
                                type: 'danger',
                                text: 'Failed to save ' + item.title + '.'
                            });
                        });
                }
            };

        }])
    .controller('ResourceCtrl', ['$scope',
        function ($scope) {
            $scope.newResource = {};
            $scope.resourceView = {};

            $scope.addResource = function (resourceKey, resource) {
                if (_.isEmpty(resource)) {
                    console.log("empty!");
                } else {
                    $scope.activeItemResources[resourceKey] = $scope.activeItemResources[resourceKey] || [];
                    $scope.activeItemResources[resourceKey].push(angular.extend({}, { edited: resource }));
                    $scope.newResource = {};

                    $scope.$broadcast('ResourceAdded');
                }
            };

            $scope.removeResource = function (resourceKey, itemResource) {
                // Remove id from resource
                $scope.activeItem.resources[resourceKey] = _.reject($scope.activeItem.resources[resourceKey], function (val) {
                    return val === itemResource.id;
                });
                $scope.activeItemResources[resourceKey] = _.reject($scope.activeItemResources[resourceKey], function (val) {
                    return val.$$hashKey === itemResource.$$hashKey;
                });

            };
        }])
    .controller('ModelCtrl', ['$scope',
        function ($scope) {
            $scope.newModel = {};
            $scope.modelView = {};

            $scope.addModel = function (item, modelKey, model) {
                if (!_.isEmpty(model)) {
                    item.edited[modelKey].push(model);
                    $scope.newModel = {};
                    $scope.$broadcast('ModelAdded');
                }
            };

            $scope.removeModel = function (item, modelKey, model) {
                item.edited[modelKey] = _.reject(item.edited[modelKey], function (val) {
                    return val.$$hashKey === model.$$hashKey;
                });
            };
            $scope.showRaw = function () {
                $scope.modelView.showRaw = !$scope.modelView.showRaw;
            };
        }])
    .controller('JoinDialogCtrl', ['$scope', 'Market', 'dialog', 'Models',
        function ($scope, Market, dialog, Models) {
            $scope.activeItem = Market.getActive();
            $scope.joinItems = _.without(Market.getItems(), $scope.activeItem);
            $scope.selectedItem = {};
            $scope.collection = Models.getActive().collection;
            $scope.searchBy = {};

            $scope.join = function (selectedItem) {
                $scope.activeItem.$join(selectedItem)
                    .then(function (deletedItem) {
                        dialog.close({status: 'success', message: $scope.activeItem.title + ' and ' + selectedItem.title + ' successfully joined!'})
                    }, function (response) {
                        dialog.close({status: 'danger', message: response.message || 'Join failed.'})
                    });
            };

            $scope.selectItem = function (item) {
                $scope.selectedItem = item;
            };

            $scope.close = function () {
                dialog.close();
            };

            $scope.hasTag = function (item, tag) {
                return _.contains(item.tags, tag);
            };
        }])
    .controller('UserDialogCtrl', ['$scope', 'user', 'dialog', 'collection',
        function ($scope, user, dialog, collection) {
            $scope.user = user;
            $scope.collection = collection;
            $scope.close = function () {
                dialog.close();
            };

            $scope.openItem = function (item) {
                dialog.close(item);
            };
        }])
    .factory('Models', ['Item', '$http', '$_api', '$q',
        function (Item, $http, $_api, $q) {
            var models = {},
                activeModel = {};

            return {
                get: function () {
                    return models;
                },
                setActive: function (collectionKey) {
                    activeModel = models[collectionKey];
                },
                getActive: function () {
                    return activeModel;
                },
                request: function () {
                    var defer = $q.defer();

                    $http.get('/app-config/market.json', $_api.config)
                        .success(function (response) {
                            angular.forEach(response, function (value, key) {
                                models[key] = Item(value);
                            });

                            defer.resolve(models);
                        })
                        .error(function (data, status, headers, config) {
                            console.log('error');
                        });

                    return defer.promise;
                }
            };
        }])
    .directive('focusFirstOn', function () {
        return {
            link: function (scope, element, attrs) {
                scope.$on(attrs.focusFirstOn, function () {
                    if (scope.$index === 0) {
                        element[0].focus();
                    }
                })
            }
        };
    })
    .directive('slider', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                function setupSlider() {
                    $(element).slider({
                        range: true,
                        min: 0,
                        max: 100,
                        // Calculate percentages based off what the low selected and high selected are
                        values: [
                            parseInt((((scope.range.lowSelected - scope.range.low) / (scope.range.high - scope.range.low)) * 100), 10),
                            parseInt((((scope.range.highSelected - scope.range.low) / (scope.range.high - scope.range.low)) * 100), 10)
                        ],
                        step: 1,
                        slide: function (event, ui) {
                            scope.$apply(function () {
                                scope.range.lowSelected = parseInt((((ui.values[0] / 100) * (scope.range.high - scope.range.low)) + scope.range.low), 10);
                                scope.range.highSelected = parseInt((((ui.values[1] / 100) * (scope.range.high - scope.range.low)) + scope.range.low), 10);
                            });
                        },
                        stop: function (event, ui) {
                            scope.$apply(function () {
                                scope.applyFilters();
                            });

                            // WHY THE FUCK DO I NEED TO CALL THIS TWICE??
                            scope.$apply();
                        }
                    });
                }

                setupSlider();
            }
        };
    }])
    .filter('checkHighBound', function () {
        return function (input, limit, e) {
            return input == limit ? input + "+" : input;
        }
    })
    .filter('checkLowBound', function () {
        return function (input, limit, e) {
            return input == limit ? "< " + input : input;
        }
    });


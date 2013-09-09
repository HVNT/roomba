angular.module('roomba.app')
    .config(['$routeProvider',
        function ($routeProvider) {
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
                        collection: function (Market, $route, $q, Models) {
                            var defer = $q.defer(),
                                _Item = Models[$route.current.params.collection];

                            _Item.query().then(function (response) {
                                console.log(response);
                                defer.resolve(Market.initialize(response.data, _Item.dimensions, _Item));
                            });

                            return defer.promise;
                        },
                        Model: function ($route, Models) {
                            return Models[$route.current.params.collection];
                        }
                    }
                })
                .when('/market/:collection/:tag',
                {
                    templateUrl: '/app/market/views/market.html?v=' + Date.now(),
                    controller: 'CollectionCtrl',
                    reloadOnSearch: false,
                    resolve: {
                        collection: function (Market, $route, $q, Models) {
                            var defer = $q.defer(),
                                _Item = Models[$route.current.params.collection];

                            _Item.query($route.current.params.tag).then(function (response) {
                                defer.resolve(Market.initialize(response.data, _Item.dimensions, _Item));
                            });

                            return defer.promise;
                        },
                        Model: function ($route, Models) {
                            return Models[$route.current.params.collection];
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/market'
                });
        }])
    .controller('MarketCtrl', ['$scope', '$collections', '$location', 'collection', '$http',
        function ($scope, $collections, $location, collection, $http) {
            $scope.collections = $collections;
            $scope.collection = collection;

        }])
    .controller('CollectionCtrl', ['$scope', 'Market', '$routeParams', '$location', 'Model',
        function ($scope, Market, $routeParams, $location, Model) {
            $scope.items = Market.getItems();
            $scope.dimensions = Market.getDimensions();
            $scope.activeItem = Market.getActive();
            $scope.activeItemResources = {};
            $scope.collectionID = $routeParams.collection;
            $scope.collection = Model.collection;
            $scope.srcListingDetails = '/app/market/partials/' + $scope.collection.key + '-details.html?v=' + Date.now();
            $scope.searchBy = {
                $: ""
            };

            $scope.applyFilters = function () {
                Market.apply();
            };

            $scope.activeSearch = {title: 'Any', key: '$'};
            $scope.tags = (function (tags) {
                var _tags = {
                    all: false
                };
                angular.forEach(tags, function(value){
                    _tags[value] = false;
                });

                return _tags;
            })($scope.collection.tags);

            $scope.marketView = {
                collapseFilters: true
            };

            $scope.activeTag = $routeParams.tag || 'all';

            $scope.tags[$scope.activeTag] = true;

            function setActiveItem(id) {
                $scope.activeItem = Market.setActive(id);
                if ($scope.activeItem) {
                    $scope.activeItemResources = {};
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

            $scope.changeTag = function (tag) {
                tag = (tag === 'all') ? '' : tag;
                $location.path('/market/' + $routeParams.collection + '/' + tag);
            };

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
                        return 'status-' + type + '-error';
                    default:
                        return 'status-' + type + '-unknown';
                }
            };

            $scope.newItem = function () {
                var _newItem = new Model();
                $scope.items.unshift(_newItem);
                $scope.activeItem = Market.setActive(_newItem);
                $scope.activeItemResources = {};
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
                return field ? (field.status == null || field.value === "" || field.value == null) : true;
            };

            $scope.setSearchCriteria = function (field) {
                $scope.activeSearch = {};
                $scope.activeSearch = field ? field : {title: 'Any', key: '$'};
                $scope.searchBy[$scope.activeSearch.key] = "";
            };

            $scope.publishSelected = function () {
                for (var i = $scope.items.length - 1; i >= 0; i--) {
                    var _item = $scope.items[i];
                    if (_item.isSelected) {
                        _item.$publish();
                    }
                }
            };

            $scope.saveSelected = function () {
                for (var i = $scope.items.length - 1; i >= 0; i--) {
                    var _item = $scope.items[i];
                    if (_item.isSelected) {
                        _item.$save();
                    }
                }
            }
        }])
    .controller('MarketListCtrl', ['$scope', '$location',
        function ($scope, $location) {
            $scope.openDetails = function (id) {
                $location.search('id', id);
            };

            $scope.sortFields = {
                title: false,
                completion: false,
                state: false
            };

            $scope.setSortField = function (sortField) {
                angular.forEach($scope.sortFields, function (value, key) {
                    $scope.sortFields[key] = false;
                });
                $scope.sortBy = sortField;
                $scope.sortFields[sortField] = true;
            };

            $scope.noop = function () {
                return null;
            };
        }])
    .controller('MarketFilterCtrl', ['$scope', 'Market', '$routeParams', '$location',
        function ($scope, Market, $routeParams, $location) {
            $scope.toggleDiscreet = function (discreet, value) {
                Market.apply(discreet, value);
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
                    } else if (!angular.isArray(rawValue)){
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
                if (_.isEmpty($scope.activeItemResources)) {
                    item.$save();
                } else {
                    item.$saveResources($scope.activeItemResources).then(function (results) {
                        item.$save();
                    });
                }
            };
        }])
    .controller('ResourceCtrl', ['$scope',
        function ($scope) {
            $scope.newResource = {};
            $scope.resourceView = {};

            $scope.addResource = function (resourceKey, resource) {
                console.log($scope.activeItemResources);
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
    .factory('Models', ['Item', '$collections',
        function (Item, $collections) {
            var models = {};

            angular.forEach($collections, function (value, key) {
                models[key] = Item(value);
            });

            return models;
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
                            scope.$apply(function() {
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
    }]);


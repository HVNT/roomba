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
            $scope.srcListingDetails = '/app/market/partials/listing-details.html?v=' + Date.now();

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

            if ($location.search().id) {
                setActiveItem($location.search().id);
            }

            $scope.$on('$locationChangeSuccess', function (e, newLocation, oldLocation) {
                if ($location.search().id) {
                    setActiveItem($location.search().id);
                }
            });

            $scope.checkRawField = function (field) {
                return (field.status == null || field.value === "" || field.value == null);
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
        }])
    .controller('MarketFilterCtrl', ['$scope', 'Market', '$routeParams', '$location',
        function ($scope, Market, $routeParams, $location) {
            $scope.tags = {
                raw: false,
                published: false,
                staged: false
            };

            $scope.activeTag = $routeParams.tag;

            $scope.tags[$scope.activeTag] = true;

            $scope.toggleDiscreet = function (discreet, value) {
                Market.apply(discreet, value);
            };

            $scope.changeTag = function (tag) {
                $location.path('/market/' + $routeParams.collection + '/' + tag);
            };
        }])
    .controller('DetailsCtrl', ['$scope', '$routeParams',
        function ($scope, $routeParams) {
            $scope.notPublished = function (item) {
                return !_.contains(item.tags, 'published');
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
                item.$saveResources($scope.activeItemResources).then(function (results) {
                    item.$save();
                });
            };

            $scope.displayRaw = function (resource, field) {

            };

            $scope.getStatusBg = function (status, type) {
                type = type || 'solid';

                switch (status) {
                    case 0:
                        return 'status-' + type + '-info';
                    case 1:
                        return 'status-' + type + '-success';
                    case 2:
                        return 'status-' + type + '-success';
                    default:
                        return 'status-' + type + '-unknown';
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
                    $scope.activeItemResources[resourceKey] ? $scope.activeItemResources[resourceKey].push(angular.extend({}, { edited: resource })) : null;
                    $scope.newResource = {};
                    $scope.$broadcast('ResourceAdded');
                }

            };

            $scope.removeResource = function (resourceKey, itemResource) {
                console.log(itemResource, $scope.activeItemResources[resourceKey]);
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
    });


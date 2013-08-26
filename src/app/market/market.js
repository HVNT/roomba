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
                        collection: function (Market, $route, $q, $timeout, Models, $location) {
                            var defer = $q.defer();

                            Market.initialize(Models[$route.current.params.collection])
                                .then(function (items) {
                                    defer.resolve();
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
                        collection: function (Market, $route, $q, $timeout, Models, $location) {
                            var defer = $q.defer();
                            Market.initialize(Models[$route.current.params.collection], $route.current.params.tag)
                                .then(function (items) {
                                    defer.resolve();
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
                                    angular.copy(results[i][_resource], $scope.activeItemResources[_resource])
                                }
                            }
                        }
                    });
                }
            }

            if ($location.search().id) {
                setActiveItem ($location.search().id);
            }

            $scope.$on('$locationChangeSuccess', function (e, newLocation, oldLocation) {
                if ($location.search().id) {
                    setActiveItem ($location.search().id);
                }
            });

            $scope.isNull = function (prop) {
                return prop == null;
            }
        }])
    .controller('MarketListCtrl', ['$scope', '$location',
        function($scope, $location) {
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

            $scope.copyFromRaw = function (activeItem, field) {
                activeItem.edited[field] = activeItem.raw[field].value;
            };


            $scope.saveItem = function () {

            };


            $scope.displayRaw = function (resource, field) {

            };
        }])
    .controller('ResourceCtrl', ['$scope',
        function($scope) {
            $scope.newResource = {};

            $scope.addResource = function (resourceKey, resource) {
                if (resource === {}) {
                    console.log("empty!");
                } else {
                    $scope.activeItemResources[resourceKey].push(angular.extend({}, { edited: resource }));
                    $scope.newResource = {};
                }
                // POST to resources/resourceKey, get back ID
                // Push ID to activeItem.resources[resourceKey]
            };

            $scope.removeResource = function (resourceKey, id) {
                // Remove id from resource
                $scope.activeItem[resourceKey] = _.without($scope.activeItem[resourceKey], id);
                $scope.activeItemResources[resourceKey] = _.reject($scope.activeItemResources[resourceKey], function (val) {
                    return val.id === id;
                });
            };
        }])
    .factory('Models', ['Item', '$collections',
        function (Item, $collections) {
            var models = {};

            angular.forEach($collections, function (value, key) {
                models[key] = Item(value);
            });

            return models;
        }]);


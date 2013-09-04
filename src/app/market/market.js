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
//                    templateUrl: '/app/market/views/market.html',
                    templateUrl: '/app/market/views/market.html?v=' + Date.now(),
                    controller: 'CollectionCtrl',
                    reloadOnSearch: false,
                    resolve: {
                        collection: function (Market, $route, $q, $timeout, Models, $location) {
                            var defer = $q.defer();

                            Market.initialize(Models[$route.current.params.collection])
                                .then(function (items) {
                                    if ($location.search().id) {
                                        Market.setActive($location.search().id);
                                    }
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
//                    templateUrl: '/app/market/views/market.html',
                    templateUrl: '/app/market/views/market.html?v=' + Date.now(),
                    controller: 'CollectionCtrl',
                    reloadOnSearch: false,
                    resolve: {
                        collection: function (Market, $route, $q, $timeout, Models, $location) {
                            var defer = $q.defer();

                            console.log("doing this");
                            Market.initialize(Models[$route.current.params.collection], $route.current.params.tag)
                                .then(function (items) {
                                    if ($location.search().id) {
                                        Market.setActive($location.search().id);
                                    }
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
            $scope.collectionID = $routeParams.collection;
            $scope.collection = Model.collection;
//            $scope.srcListingDetails = '/app/market/partials/listing-details.html';
            $scope.srcListingDetails = '/app/market/partials/listing-details.html?v=' + Date.now();

            $scope.$on('$locationChangeSuccess', function (e, newLocation, oldLocation) {
                $scope.activeItem = Market.setActive($location.search().id);
                $scope.activeItem.$getResources();

            });
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
            }

            $scope.copyFromRaw = function (activeItem, field) {
                activeItem.edited[field] = activeItem.raw[field].value;
            }
        }])
    .factory('Models', ['Item', '$collections',
        function (Item, $collections) {
            var models = {};

            angular.forEach($collections, function (value, key) {
                models[key] = Item(value);
            });

            return models;
        }]);

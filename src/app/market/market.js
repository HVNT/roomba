angular.module('roomba.app')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/market',
                {
                    redirectTo: '/market/listings/raw'
                })
                .when('/market/:collection/:tag',
                {
                    templateUrl: '/app/market/views/market.html?v=' + Date.now(),
                    controller: 'CollectionCtrl',
                    resolve: {
                        collection: function (Market, $route, $q, $timeout, Models) {
                            var defer = $q.defer();

                            Market.initialize(Models[$route.current.params.collection], $route.current.params.tag)
                                .then(function () {
                                    defer.resolve();
                                });

                            return defer.promise;
                        }
                    }
                })
                .when('/market/:collection/:tag/:id',
                {
                    templateUrl: '/app/market/views/market.html?v=' + Date.now(),
                    controller: 'CollectionCtrl',
                    resolve: {
                        collection: function (Market, $route, $q, $timeout, Models) {
                            var defer = $q.defer(),
                                _collection = $route.current.params.collection,
                                _tag = $route.current.params.tag,
                                _id = $route.current.params.id;

                            Market.initialize(Models[_collection], _tag)
                                .then(function () {
                                    // Set active item
                                    Market.setActive(_id);
                                    defer.resolve();
                                });

                            return defer.promise;
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/market'
                });
        }])
    .controller('MarketCtrl', ['$scope', '$collections', '$location', 'collection',
        function ($scope, $collections, $location, collection) {
            $scope.collections = $collections;
            $scope.collection = collection;
        }])
    .controller('CollectionCtrl', ['$scope', 'Market', '$routeParams', '$location',
        function ($scope, Market, $routeParams, $location) {
            $scope.collection = Market.getItems();
            $scope.dimensions = Market.getDimensions();
            $scope.activeItem = Market.getActive();
            $scope.collectionID = $routeParams.collection;
            $scope.srcListingDetails = '/app/market/partials/listing-details.html?v=' + Date.now();

            $scope.openDetails = function (id) {
                $location.path('/market/' + $routeParams.collection + '/' +  $routeParams.tag + '/' + id)
            }
        }])
    .controller('MarketFilterCtrl', ['$scope', 'Market',
        function ($scope, Market) {
            $scope.toggleDiscreet = function (value) {
                Market.apply(value);
            };
        }])
    .controller('DetailsCtrl', ['$scope', '$routeParams',
        function ($scope, $routeParams) {
            $scope.collectionID = $routeParams.collection;
            $scope.itemID = $routeParams.id;
            $scope.test = "Hello!";

            // determine role
            // if active.sellerID === userID
            // $scope.role = 'seller'
            // else
            $scope.role = 'seller';
            $scope.detailsIncl = '/app/market/views/desktop/partials/' + $scope.collectionID + '_' + $scope.role + '.html';
        }])
    .factory('Models', ['Item', '$collections',
        function (Item, $collections) {
            var models = {};

            angular.forEach($collections, function(value, key){
                models[key] = Item(value);
            });

            return models;
        }])


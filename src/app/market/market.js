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
                        collection: function (Market, $route, $q, $timeout, Listing) {
                            var defer = $q.defer();

                            switch ($route.current.params.collection) {
                                case 'listings':
                                    Market.initialize(Listing, $route.current.params.tag)
                                        .then(function (items) {
                                            console.log(items);
                                            defer.resolve(items);
                                        });
                                    return defer.promise;
                                    break;
                                default:
                                    throw "Unknown collection";
                            }
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
    .controller('CollectionCtrl', ['$scope', 'collection', 'Market', '$routeParams',
        function ($scope, collection, Market, $routeParams) {
            $scope.collection = collection;
            $scope.dimensions = Market.dimensions;
            console.log($scope.dimensions);
            $scope.collectionID = $routeParams.collection;

            $scope.toggleDiscreet = function (value) {
                value.isSelected = !value.isSelected;
                Market.dimensions.apply();
                Market.render();
            }
        }])
    .factory('Listing', ['Item', '$collections',
        function (Item, $collections) {
            var Listing = Item($collections.listings);

            return Listing;
        }]);
//    .controller('DetailsCtrl', ['$scope', '$routeParams', 'active', 'user',
//        function ($scope, $routeParams, active, user) {
//            $scope.active = active;
//            $scope.collectionID = $routeParams.collection;
//            $scope.itemID = $routeParams.id;
//
//            // determine role
//            // if active.sellerID === userID
//            // $scope.role = 'seller'
//            // else
//            $scope.role = 'seller';
//            $scope.detailsIncl = '/app/market/views/desktop/partials/' + $scope.collectionID + '_' + $scope.role + '.html';
//        }]);
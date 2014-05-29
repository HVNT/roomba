/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/13/14
 * Time: 3:00 PM
 * File:
 */

angular.module('rescour.roomba')
    .config(function ($stateProvider, $tooltipProvider, $urlRouterProvider) {
        $tooltipProvider.options({
            appendToBody: true
        });

        $tooltipProvider.setTriggers({
            'mouseover': 'click mouseleave',
            'mouseenter': 'mouseleave'
        });

        $urlRouterProvider
            .when('/mduListings', '/mduListings/stage/list')
            .when('/mduListings/', '/mduListings/stage/list')
            .when('/mduListings/stage', '/mduListings/stage/list')
            .when('/mduListings/stage/', '/mduListings/stage/list')
            .when('/mduListings/stage/list/', '/mduListings/stage/list')
            .when('/mduListings/stage/newMduListing/', '/mduListings/stage/newMduListing')
            .when('/mduListings/stage/newMduListingMatch/', '/mduListings/stage/newMduListingMatch')
            .when('/mduListings/stage/newMduListingForm/', '/mduListings/stage/newMduListingForm')
            .when('/mduListings/stage/todoDetails/', '/mduListings/stage/todoDetails')
            .when('/mduListings/stage/doneDetails/', '/mduListings/stage/doneDetails')
            .when('/mduListings/review/', '/mduListings/review/list')
            .when('/mduListings/review/list/', '/mduListings/review/list')
            .when('/mduListings/review/doneDetails/', '/mduListings/review/doneDetails')
            .when('/mduListings/review/productionDetails/', '/mduListings/review/productionDetails');

        $stateProvider
            /* ABSTRACT ROOT STATE */
            .state('mduListings', {
                abstract: true,
                templateUrl: '/app/mduListings/views/mduListings.html',
                url: '/mduListings',
                controller: 'MduListingsCtrl',
                resolve: {
                    MduConfig: function ($http, $q, $log, Environment, MDUListingFactory, MDUListingMarketFactory) {
                        var MDUListingDefer = $q.defer();

                        $http.get('/app/config/market.json').then(function (config) {
                            var MDUConfig = config.data.mdu_listings;
                            var MDUListing = MDUListingFactory(MDUConfig);

                            MDUListing.query().then(function (response) {
                                console.log(response);
                                var MDUListingMarket = MDUListingMarketFactory(MDUListing);
                                MDUListingMarket.initialize(MDUListing.dimensions, response.data.collection);
                                $log.debug('MDU Listing Market Initialized: ', MDUListingMarketFactory);
                                MDUListingDefer.resolve([MDUListing, MDUListingMarket, MDUConfig]);
                            }, function (response) {
                                console.log(response);
                            });
                        }, function (response) {
                            console.log(response);
                        });
                        return MDUListingDefer.promise;
                    }
                }
            })

            /* STAGE STATES */
            .state('mduListings.stage', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.html',
                url: '/stage',
                controller: 'StageCtrl'
            })
            .state('mduListings.stage.list', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.list.html',
                url: '/list',
                controller: 'StageListCtrl'
            })
            .state('mduListings.stage.todoDetails', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.todoDetails.html',
                url: '/todoDetails/:listingId',
                controller: 'StageTodoDetailsCtrl'
            })
            .state('mduListings.stage.doneDetails', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.doneDetails.html',
                url: '/doneDetails/:listingId',
                controller: 'StageDoneDetailsCtrl'
            })
            .state('mduListings.stage.newMduListing', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.newMduListing.html',
                url: '/newMduListing',
                controller: 'StageNewMduListingCtrl'
            })
            .state('mduListings.stage.newMduListingMatch', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.newMduListingMatch.html',
                url: '/newMduListingMatch',
                controller: 'StageNewMduListingMatchCtrl'
            })
            .state('mduListings.stage.newMduListingForm', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.newMduListingForm.html',
                url: '/newMduListingForm',
                controller: 'StageNewMduListingFormCtrl'
            })

            /* REVIEW STATES */
            .state('mduListings.review', {
                templateUrl: '/app/mduListings/review/views/mduListings.review.html',
                url: '/review',
                controller: 'ReviewCtrl'
            })
            .state('mduListings.review.list', {
                templateUrl: '/app/mduListings/review/views/mduListings.review.list.html',
                url: '/list',
                controller: 'ReviewListCtrl'
            })
            .state('mduListings.review.doneDetails', {
                templateUrl: '/app/mduListings/review/views/mduListings.review.doneDetails.html',
                url: '/doneDetails/:listingId',
                controller: 'ReviewDoneDetailsCtrl'
            })
            .state('mduListings.review.productionDetails', {
                templateUrl: '/app/mduListings/review/views/mduListings.review.productionDetails.html',
                url: '/productionDetails/:listingId',
                controller: 'ReviewProductionDetailsCtrl'
            });

    });

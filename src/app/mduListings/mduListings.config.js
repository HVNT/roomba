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
            .when('/mduListings/stage/todo/newMduListing/', '/mduListings/stage/todo/newMduListing')
            .when('/mduListings/stage/todo/details/', '/mduListings/stage/todo/details')
            .when('/mduListings/stage/done/details/', '/mduListings/stage/done/details')
            .when('/mduListings/review/', '/mduListings/review/list')
            .when('/mduListings/review/list/', '/mduListings/review/list')
            .when('/mduListings/review/done/details/', '/mduListings/review/done/details')
            .when('/mduListings/review/production/details/', '/mduListings/review/production/details');

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
                            var MDUListing = MDUListingFactory(config.data.mdu_listings);

                            MDUListing.query().then(function (response) {
                                console.log(response);
                                var MDUListingMarket = MDUListingMarketFactory(MDUListing);
                                MDUListingMarket.initialize(MDUListing.dimensions, response.data.collection);
                                $log.debug('MDU Listing Market Initialized: ', MDUListingMarketFactory);
                                MDUListingDefer.resolve([MDUListing, MDUListingMarket]);
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
            .state('mduListings.stage.todo.details.listingId', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.todo.details.html',
                url: '/:listingId',
                controller: 'StageToDoDetailsCtrl'
            })
            .state('mduListings.stage.done.details.listingId', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.done.details.html',
                url: '/:listingId',
                controller: 'StageDoneDetailsCtrl'
            })
            .state('mduListings.stage.newMduListing', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.newMduListing.html',
                url: '/newMduListing',
                controller: 'StageNewMduListingCtrl'
            })

            /* REVIEW STATES*/
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
            .state('mduListings.review.done.details.listingId', {
                templateUrl: '/app/mduListings/review/views/mduListings.review.done.details.html',
                url: '/:listingId',
                controller: 'ReviewDoneDetailsCtrl'
            })
            .state('mduListings.review.production.details.listingId', {
                templateUrl: '/app/mduListings/review/views/mduListings.review.production.details.html',
                url: '/:listingId',
                controller: 'ReviewProductionDetailsCtrl'
            });

    });

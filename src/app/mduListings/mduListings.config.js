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
                controller: 'MduListingsCtrl',
                url: '/mduListings',
                resolve: {
//                    load: function ($q, $log, MDUListingFactory, MDUListingMarketplace) {
//
//                        (function () {
//                            var defer = $q.defer(),
//                                path = '/config/market.json';
//                            $http.get(path).then(function (response) {
//                                    console.log(response);
//                                    defer.resolve(response);
//                                }, function (data, status, headers, config) {
//                                    console.log('error');
//                                    defer.reject(data);
//                                });
//                            return defer.promise;
//                        })().then(function (response) {
//                            console.log(response);
//                        }, function(fuck) {
//                            console.log(fuck);
//                        });
//
//
//                        var mduListingsDefer = $q.defer();
//
//                        MDUListingFactory.query().then(function (response) {
//                            MDUListingMarketplace.initialize(MDUListingFactory.dimensions, response.data.collection);
//                            $log.debug('MDU Listing Market Initialized: ', MDUListingMarket);
//                            mduListingsDefer.resolve(response);
//                        });
//                        return mduListingsDefer.promise;
//                    }
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
            .state('mduListings.stage.todo.details', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.todo.details.html',
                url: '/:itemId',
                controller: 'StageToDoDetailsCtrl'
            })
            .state('mduListings.stage.done.details', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.done.details.html',
                url: '/:itemId',
                controller: 'StageDoneDetailsCtrl'
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
            .state('mduListings.review.done.details', {
                templateUrl: '/app/mduListings/review/views/mduListings.review.done.details.html',
                url: '/:itemId',
                controller: 'ReviewDoneDetailsCtrl'
            })
            .state('mduListings.review.production.details', {
                templateUrl: '/app/mduListings/review/views/mduListings.review.production.details.html',
                url: '/:itemId',
                controller: 'ReviewProductionDetailsCtrl'
            });

    });

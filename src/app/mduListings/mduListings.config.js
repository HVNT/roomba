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
            .when('/mduListings', '/mduListings/stage')
            .when('/mduListings/', '/mduListings/stage')
            .when('/mduListings/stage/', '/mduListings/stage')
            .when('/mduListings/review/', '/mduListings/review');

        $stateProvider
            .state('mduListings', {
                abstract: true,
                templateUrl: '/app/mduListings/views/mduListings.html',
                controller: 'MduListingsCtrl',
                url: '/mduListings',
                resolve: {
                    load: function ($q, $log) {
//                            var swifferRunsDefer;
//                            swifferRunsDefer = $q.defer();
//
//                            SwifferRun.query().then(function (response) {
//                                SwifferRunMarket.initialize(SwifferRun.dimensions, response.data.collection);
//                                $log.debug('Swiffer Run Market Initialized: ', SwifferRunMarket);
//                                swifferRunsDefer.resolve(response);
//                            });
//
//                            return swifferRunsDefer.promise;
                    }
                }
            })

            /* STAGE */
            .state('mduListings.stage', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.html',
                url: '/stage',
                controller: 'StageCtrl'
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

            /* REVIEW */
            .state('mduListings.review', {
                templateUrl: '/app/mduListings/review/views/mduListings.review.html',
                url: '/review',
                controller: 'ReviewCtrl'
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

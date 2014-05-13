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
            .when('/mduListings/stage/', '/mduListings/stage');
//                .when('/scrapes/:scrapeId', '/scrapes/:scrapeId/unmatched')
//                .when('/scrapes/:scrapeId/', '/scrapes/:scrapeId/unmatched')
//                .when('/scrapes/:scrapeId/unmatched/', '/scrapes/:scrapeId/unmatched');

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
            .state('mduListings.stage', {
                templateUrl: '/app/mduListings/stage/views/mduListings.stage.html',
                url: '/stage',
                controller: 'StageCtrl'
            });
//                .state('scrapes.run', {
//                    abstract: true,
//                    url: '/:scrapeId',
//                    controller: 'ScrapesRunCtrl',
//                    templateUrl: '/app/scrapes/views/scrapes.run.html'
//                })
//                .state('scrapes.run.subset', {
//                    url: '/:subset',
//                    views: {
//                        "left": {
//                            templateUrl: function ($stateParams) {
//                                return '/app/scrapes/views/scrapes.run.fragment-trees.' + $stateParams.subset + '.html'
//                            },
//                            controller: function($stateParams) {
//                                // for camel casing
//                                var subset = $stateParams.subset.charAt(0).toUpperCase() + $stateParams.subset.slice(1);
//                                return 'ScrapesRun' + subset + 'FragmentTreesCtrl'
//                            }
//                        },
//                        "right": {
//                            templateUrl: function () {
//                                return '/app/scrapes/views/scrapes.run.prototype-instances.html'
//                            },
//                            controller: function() {
//                                return 'ScrapesRunPrototypeInstancesCtrl'
//                            }
//                        }
//                    }
//                })

    });

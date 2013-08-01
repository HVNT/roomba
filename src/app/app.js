/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 4:24 PM
 * File: /app/app.js
 */

if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () {
};
angular.module('roomba.app',
        [
            'ui.bootstrap',
            'rescour.config',
            'rescour.auth',
            'rescour.user',
            'rescour.utility',
            'rescour.marketplace'
        ])
    .value('$collections', {
        listings: {
            title: 'Listings',
            tags: ['raw', 'staged', 'published'],
            path: 'listings',
            dimensions: {
                discreet: ['broker', 'state'],
                range: []
            },
            fields: {
                title: {
                    title: 'Title',
                    weight: 5000
                },
                description: {
                    title: 'Description',
                    weight: 8
                },
                broker: {
                    title: 'Broker',
                    weight: 10
                },
                state: {
                    title: 'State',
                    weight: 9
                }
            }
        }
    })
    .config(['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.withCredentials = true;
            $locationProvider.html5Mode(true);

            $routeProvider.when('/',
                {
                    redirectTo: '/market/'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }])
    .controller("AppController", ['$scope', '$rootScope', '$location', '$_api', '$http',
        function ($scope, $rootScope, $location, $_api, $http) {
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                $scope.loading = true;
                $scope.failure = false;
            });
            $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
                $scope.loading = false;
                $scope.failure = false;
            });
            $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
                $scope.loading = false;
                $scope.failure = true;
            });
        }]);



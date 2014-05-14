/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/13/14
 * Time: 10:52 AM
 * File:
 */

angular.module('rescour.roomba')

    .controller('StageCtrl',
    function ($scope, Environment, $http, $q) {

        (function () {
            var defer = $q.defer(),
                path = '/config/market.json';
            $http.get(path)
                .then(function (response) {
                    console.log(response);
                    defer.resolve(response);
                }, function (data, status, headers, config) {
                    console.log('error');
                    defer.reject(data);
                });
            return defer.promise;
        })().then(function (response) {
            console.log(response);
        }, function(fuck) {
            console.log(fuck);
        })

    })
    .controller('StageListCtrl',
    function ($scope) {

        $scope.openToDoDetails = function (mduListing) {
            $scope.go('mduListings.stage.todo.details', { itemId: mduListing.id});
        }

    })
    .controller('StageToDoDetailsCtrl',
    function ($scope) {

    })
    .controller('StageDoneDetailsCtrl',
    function ($scope) {

    });
/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/13/14
 * Time: 10:52 AM
 * File:
 */

angular.module('rescour.roomba')

    .controller('StageCtrl',
    function ($scope) {

    })
    .controller('StageListCtrl',
    function ($scope) {


        $scope.openToDoDetails = function (mduListing) {
            $scope.go('mduListings.stage.todo.details');
        }

    })
    .controller('StageToDoDetailsCtrl',
    function ($scope) {

    })
    .controller('StageDoneDetailsCtrl',
    function ($scope) {

    });
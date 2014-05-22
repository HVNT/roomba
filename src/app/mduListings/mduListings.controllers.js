/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/13/14
 * Time: 3:01 PM
 * File:
 */

angular.module('rescour.roomba')
    .controller('MduListingsCtrl', function ($scope, MduConfig) {
        console.log(MduConfig);
        /**
        Naming:
            if singular -> capitalize first char
            if plural   -> camel-case
         **/
        $scope.MduListing = MduConfig[0];
        $scope.MduListingMarket = MduConfig[1];
        $scope.mduListingDimensions = $scope.MduListingMarket.getDimensions();
        $scope.mduListings = $scope.MduListingMarket.visibleItems;
        console.log($scope.mduListings);

    })
    /** STAGE **/
    .controller('StageCtrl', function ($scope, Environment, $http, $q) {

    })
    .controller('StageListCtrl', function ($scope) {

        $scope.openToDoDetails = function (mduListing) {
            $scope.go('mduListings.stage.todo.details', { itemId: mduListing.id});
        }

    })
    .controller('StageToDoNewMduListingCtrl', function ($scope) {

    })
    .controller('StageToDoDetailsCtrl', function ($scope) {

    })
    .controller('StageDoneDetailsCtrl', function ($scope) {

    })
    /** REVIEW **/
    .controller('ReviewCtrl', function ($scope) {

    })
    .controller('ReviewListCtrl', function ($scope) {

    })
    .controller('ReviewToDoDetailsCtrl', function ($scope) {

    })
    .controller('ReviewDoneDetailsCtrl', function ($scope) {

    });
/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/13/14
 * Time: 3:01 PM
 * File:
 */

angular.module('rescour.roomba')
    .controller('MduListingsCtrl', function ($scope, $state, MduConfig) {
        /**
        Naming:
            if singular -> capitalize first char
            if plural   -> camel-case
         **/
        $scope.MduListing = MduConfig[0];
        $scope.MduListingMarket = MduConfig[1];
        $scope.mduListingDimensions = $scope.MduListingMarket.getDimensions();
        $scope.mduListings = $scope.MduListingMarket.visibleItems;
        $scope.todoListings = [];
        $scope.doneListings = [];
        $scope.publishedListings = [];
        for (var i = 0; i < $scope.mduListings.length; i++) {
            if($scope.mduListings[i].workflowState == 'todo') $scope.todoListings.push($scope.mduListings[i]);
            else if ($scope.mduListings[i].workflowState == 'done') $scope.doneListings.push($scope.mduListings[i]);
            else if ($scope.mduListings[i].workflowState == 'published') $scope.publishedListings.push($scope.mduListings[i]);
            else console.log($scope.mduListings[i], 'fucked');
        }
        $scope.MduListingInDetails = false;
    })
    /** STAGE **/
    .controller('StageCtrl', function ($scope, $state, $http, $q) {

    })
    .controller('StageListCtrl', function ($scope, $state) {
        $scope.openToDoDetails = function (mduListing) {
            console.log(mduListing);
            $state.go('mduListings.stage.todo.details.listingId',
                {
                    listingId: mduListing.id
                });
        };
        $scope.openDoneDetails = function (mduListing) {
            console.log(mduListing);
            $state.go('mduListings.stage.done.details.listingId',
                {
                    listingId: mduListing.id
                });
        };
        $scope.openNewMduListing = function () {
            console.log();
            $state.go('mduListings.stage.newMduListing');
        };

    })
    .controller('StageToDoDetailsCtrl', function ($scope) {

    })
    .controller('StageDoneDetailsCtrl', function ($scope) {

    })
    .controller('StageNewMduListingCtrl', function ($scope) {

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
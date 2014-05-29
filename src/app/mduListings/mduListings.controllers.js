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
        console.log(MduConfig);
        $scope.MduListing = MduConfig[0];
        $scope.MduListingMarket = MduConfig[1];
        $scope.MduConfigModel = MduConfig[2];
        $scope.mduListingDimensions = $scope.MduListingMarket.getDimensions();
        $scope.mduListings = $scope.MduListingMarket.visibleItems;
        $scope.todoListings = [];
        $scope.doneListings = [];
        $scope.publishedListings = [];
        for (var i = 0; i < $scope.mduListings.length; i++) {
            if ($scope.mduListings[i].workflowState == 'todo') $scope.todoListings.push($scope.mduListings[i]);
            else if ($scope.mduListings[i].workflowState == 'done') $scope.doneListings.push($scope.mduListings[i]);
            else if ($scope.mduListings[i].workflowState == 'published') $scope.publishedListings.push($scope.mduListings[i]);
            else console.log($scope.mduListings[i], 'fucked');
        }
        $scope.MduListingInDetails = false;
    })
/** STAGE **/
    .controller('StageCtrl', function ($scope, $state, $http, $q, Environment) {

        $scope.closeStageDetails = function () {
            $state.go('mduListings.stage.list');
        };
        $scope.openToDoDetails = function (mduListing) {
            console.log(mduListing);
            $state.go('mduListings.stage.todoDetails',
                {
                    listingId: mduListing.id
                });
        };
        $scope.openDoneDetails = function (mduListing) {
            console.log(mduListing);
            $state.go('mduListings.stage.doneDetails',
                {
                    listingId: mduListing.id
                });
        };
        $scope.openNewMduListing = function () {
            $state.go('mduListings.stage.newMduListing');
        };

        var mduAddressModel = {
            localId: 0,
            street1: 'Street',
            //street2
            city: 'City',
            state: 'State',
            zip: 'Zip Code'
        };
        $scope.mduAddressModels = [mduAddressModel];
        $scope.mduAddress0 = {
            street1: 'test remove for',
            //street2
            city: 'production',
            state: 'GA',
            zip: 30332
        };
        $scope.mduAddresses = [$scope.mduAddress0];

        $scope.whichAddress = function (index) {
            return $scope.mduAddresses[index];
        };

        $scope.addAddress = function () {
            var newMduAddressModel = mduAddressModel;
            newMduAddressModel.localId++;
            $scope.mduAddressModels.push(newMduAddressModel);

            var mduAddressNamespace = 'mduAddress' + newMduAddressModel.localId;
            $scope[mduAddressNamespace] = {
                street1: null,
                //street2
                city: null,
                state: null,
                zip: null
            };
            $scope.mduAddresses.push($scope[mduAddressNamespace]);
        };
        $scope.removeAddressForm = function (index) {
            $scope.mduAddresses.splice(index, 1);
            $scope.mduAddressModels.splice(index, 1);
        };

        $scope.matchingMdus = [];

        $scope.openNewMduListingMatch = function () {
            getMatchingMdus().then(function (response) {
                $scope.matchingMdus = response.data.collection;
                $state.go('mduListings.stage.newMduListingMatch');
            }, function (response) {
                console.log(response);
            });
        };

        $scope.openNewMduListingAddress = function () {
            console.log('TODO')
        };

        function getMatchingMdus() {
            var defer = $q.defer(),
                config = _.extend({
                    cache: true,
                    params: $scope.mduAddresses
                }, Environment.config);

            var path = Environment.path + '/mdus/';
            $http.get(path, {}, config).then(function (response) {
                console.log(response);
                defer.resolve(response);
            }, function (response) {
                defer.reject(response);
            });
            return defer.promise;
        }

        $scope.selectMdu = function (mdu, index) {
            if ($scope.matchingMdus[index].length > 0) {
                for (var i = 0; i < $scope.matchingMdus[index].length; i++) {
                    var _mdu = $scope.matchingMdus[index][i];
                    if (_mdu.isSelected && _mdu != mdu) {
                        _mdu.isSelected = false;
                    }
                }
            }
            mdu.isSelected = !mdu.isSelected;
        };

        $scope.revertNewMduListing = function () {
            $state.go('mduListings.stage.newMduListing');
        };

        $scope.revertNewMduListingMatch = function () {
            $state.go('mduListings.stage.newMduListingMatch');
        };

        /** VIEW MODEL FOR MDU LISTING FORM **/
            // reset data? --> from one place..
        $scope.newMduListingFormModel = {
            mdus: []
        };
        // SHITS IMPORTANT AF YO
        $scope.mduListingFormModel = {
            mdus: [],
            images: [],
            tourDates: [],
            contacts: []
        };
        /*******************************/

        $scope.openNewMduListingForm = function () {
            assessMatches();

            $scope.MduListing.init($scope.newMduListingFormModel).then(function (response) {
                $scope.newMduListingFormModel.id = response.data.response.id;
                $scope.mduListingFormModel = new $scope.MduListing($scope.newMduListingFormModel);
                console.log($scope.mduListingFormModel);
                $scope.continueToNewMduListingForm();
            }, function (response) {
                console.log(response);
            });
        };

        function assessMatches() {
            for (var i = 0; i < $scope.matchingMdus.length; i++) {
                if ($scope.matchingMdus[i].length > 0) {
                    for (var j = 0; j < $scope.matchingMdus[i].length; j++) {
                        var mdu = $scope.matchingMdus[i][j];
                        if (mdu.isSelected) {
                            $scope.newMduListingFormModel.mdus[i] = mdu; // should map 1:1 w/ indexes
                            break; // should only be 1 per index
                        } else {
                            if (j == $scope.matchingMdus[i].length - 1) { // at end
                                $scope.newMduListingFormModel.mdus[i] = {
                                    address: {}
                                }; // can do this here because of break;
                            }
                        }
                    }
                } else { // no match
                    $scope.newMduListingFormModel.mdus[i] = {
                        address: {}
                    }; // no match
                }
            }
            console.log($scope.newMduListingFormModel);
        }

        $scope.continueToNewMduListingForm = function () {
            $state.go('mduListings.stage.newMduListingForm');
        };

        $scope.activeMduFormIndex = 0;

        $scope.activateMduForm = function (index) {
            $scope.activeMduFormIndex = index;
        };

        //////////////////////////////////////////////////////////////////////////////
        /* DATE PICKER SHIT */
        // date posted
        $scope.datePostedOptions = {
            formatYear: 'yy'
        };
        $scope.openMduListingDatePosted = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.datePostedOpen = true;
        };
        // call for offers
        $scope.callForOffersOptions = {
            formatYear: 'yy'
        };
        $scope.openMduListingCallForOffers = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.callForOffersOpen = true;
        };

        //////////////////////////////////////////////////////////////////////////////
        /* CONTACT FIELD SHIT */
        $scope.showNewContactFields = false;
        $scope.toggleNewContactFields = function () {
            $scope.showNewContactFields = !$scope.showNewContactFields;
            $scope['tempContactModel' + $scope.mduListingFormModel.contacts.length] = {};
        };
        $scope.addMduListingFormContact = function () {
            if ($scope['tempContactModel' + $scope.mduListingFormModel.contacts.length]) {
                $scope['tempContactModel' + $scope.mduListingFormModel.contacts.length].id = null;
                $scope.mduListingFormModel.contacts.push($scope['tempContactModel' + $scope.mduListingFormModel.contacts.length]);
                $scope.showNewContactFields = !$scope.showNewContactFields;
                $scope.updateMduListing();
            }
        };
        $scope.removeMduListingFormContact = function (idx) {
            $scope.mduListingFormModel.contacts.splice(idx, 1);
            $scope.updateMduListing();
        };
        $scope.whichContactModel = function () {
            return $scope['tempContactModel' + $scope.mduListingFormModel.contacts.length];
        };

        //////////////////////////////////////////////////////////////////////////////
        /* SALES HISTORY FIELD SHIT */
        $scope.showNewSalesHistoryFields = false;
        $scope.toggleNewSalesHistoryFields = function () {
            $scope.showNewSalesHistoryFields = !$scope.showNewSalesHistoryFields;
            $scope['tempSalesHistoryModel' + $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].salesHistory.length] = {};
        };
        $scope.addMduListingFormSalesHistory = function () {
            if ($scope['tempSalesHistoryModel' + $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].salesHistory.length]) {
                $scope['tempSalesHistoryModel' + $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].salesHistory.length].id = null;
                $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].salesHistory.push($scope['tempSalesHistoryModel'
                    + $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].salesHistory.length]);
                $scope.showNewSalesHistoryFields = !$scope.showNewSalesHistoryFields;
                $scope.updateMduListing();
            }
        };
        $scope.removeMduListingFormSalesHistory = function (idx) {
            $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].salesHistory.splice(idx, 1);
            $scope.updateMduListing();
        };
        $scope.whichSalesHistoryModel = function () {
            return $scope['tempSalesHistoryModel' + $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].salesHistory.length];
        };

        //////////////////////////////////////////////////////////////////////////////
        /* TAX HISTORY FIELD SHIT */
        $scope.showNewTaxHistoryFields = false;
        $scope.toggleNewTaxHistoryFields = function () {
            $scope.showNewTaxHistoryFields = !$scope.showNewTaxHistoryFields;
            $scope['tempTaxHistoryModel' + $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].taxHistory.length] = {};
        };
        $scope.addMduListingFormTaxHistory = function () {
            if ($scope['tempTaxHistoryModel' + $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].taxHistory.length]) {
                $scope['tempTaxHistoryModel' + $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].taxHistory.length].id = null;
                $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].taxHistory.push($scope['tempTaxHistoryModel'
                    + $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].taxHistory.length]);
                $scope.showNewTaxHistoryFields = !$scope.showNewTaxHistoryFields;
                $scope.updateMduListing();
            }
        };
        $scope.removeMduListingFormTaxHistory = function (idx) {
            $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].taxHistory.splice(idx, 1);
            $scope.updateMduListing();
        };
        $scope.whichTaxHistoryModel = function () {
            return $scope['tempTaxHistoryModel' + $scope.mduListingFormModel.mdus[$scope.activeMduFormIndex].taxHistory.length];
        };

        /* FORM AXNS AND SHIT */
        $scope.updateMduListing = function () {
            $scope.mduListingFormModel.update().then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response);
            });
        };

        $scope.saveMduListingForm = function () {
            // put in to-do and set workflow state for demo
            $scope.mduListingFormModel.workflowState = 'todo';
            $scope.todoListings.push($scope.mduListingFormModel);

            // some kind of check here??
            $state.go('mduListings.stage.list');
            console.log($scope.mduListingFormModel);
        };

    })
    .controller('StageListCtrl', function ($scope) {

    })
    .controller('StageTodoDetailsCtrl', function ($scope) {

    })
    .controller('StageDoneDetailsCtrl', function ($scope) {

    })
    .controller('StageNewMduListingCtrl', function ($scope, $state, $http, $q, Environment) {

    })
    .controller('StageNewMduListingMatchCtrl', function ($scope, $state) {

    })
    .controller('StageNewMduListingFormCtrl', function ($scope) {

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
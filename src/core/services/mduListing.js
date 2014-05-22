/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/14/14
 * Time: 12:00 PM
 * File:
 */
angular.module('rescour.services')
    .factory('MDUListingFactory', function (Environment, $q, $http) {
        return function (config) {
            /**
             * MDUListing
             * @param data
             * @constructor
             */
            var MDUListing = function (data) {
                /** MDU Listing Fields **/
                this.id = data.id || 'lol no id?';
                this.workflowState = data.workflowState || 'lol no state?';
                this.title = data.title || 'Untitled Property';
                this.page = data.page || 'None Available';
                this.description = data.description || 'None Available';
                this.broker = data.broker || 'None Available';
                this.flyer = data.flyer || 'None Available';
                this.price = data.price  || 'None Available';
                this.marketingUrl = data.marketingUrl  || 'None Available';
                this.callForOffers = data.callForOffers  || 'None Available';
                this.datePosted = data.datePosted  || 'None Available';
                this.status = data.status  || 'None Available'; // key should be propertyStatus
                /** MDU Fields **/
                this.mdus = [];
                for (var i = 0; i < data.mdus.length; i++) {
                    var mdu = {},
                        mduData = data.mdus[i];
                    mdu.type = mduData.type || 'None Available';
                    mdu.yearBuilt = mduData.yearBuilt || 'None Available';
                    mdu.numUnits = mduData.numUnits || 'None Available';
                    mdu.acres = mduData.acres || 'None Available';
                    mdu.county = mduData.county || 'None Available';
                    mdu.assessorURl = mduData.assessorUrl || 'None Available';
                    /* MDU Address */
                    mdu.address = {};
                    mdu.address.street1 = mduData.address.street1 || 'None Available';
                    mdu.address.street2 = mduData.address.street2 || 'None Available';
                    mdu.address.city = mduData.address.city || 'None Available';
                    mdu.address.zip = mduData.address.zip || 'None Available';
                    mdu.address.latitude = mduData.latitude || 'None Available';
                    mdu.address.longitude = mduData.address.longitude || 'None Available';

                    this.mdus.push(mdu);
                }
            };
            /** MDU model properties **/
            MDUListing.title = config.title;
            MDUListing.key = config.key;
            MDUListing.path = config.path;
            MDUListing.fields = config.fields;
            MDUListing.dimensions = config.dimensions;

            /**
             * @doc method
             * @name query
             * @methodOf MDUListing
             *
             * @description Query all MDUListing's
             *
             * @returns {HttpPromise} Future Promise
             */
            MDUListing.query = function () {
                var items = [],
                    defer = $q.defer(),
                    config = _.extend({
                        cache: true
                    }, Environment.config),
                    batchLimit = 500;

                var path = Environment.path + MDUListing.path;
                $http.get(path, config).then(function (response) {
                    defer.resolve(response);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;

//                (function batchItems(limit, offset) {
//                    var path = Environment.path + MDUListing.path + "?limit=" + limit + (offset ? "&offset=" + offset : "");
//
//                    $http.get(path, config).then(function (response) {
//                        items = items.concat(response.data);
//                        console.log(items);
//
//                        if (response.data.length < limit || response.data.length === 0) {
//                            defer.resolve(items);
//                        } else {
//                            offset += batchLimit;
//                            batchItems(limit, offset);
//                        }
//                    }, function (response) {
//                        defer.reject(response);
//                    });
//
//                })(batchLimit);
//
//                return defer.promise;
            };

            /**
             * @doc method
             * @name getStatus
             * @methodOf MDUListing.prototype
             *
             * @description Returns CSS class suffix based off mduListingStatus.
             *
             * @returns {String} CSS class suffix
             */
            MDUListing.prototype.getStatus = function () {
                switch (this.propertyStatus) {
                    case 'Marketing':
                        return 'success';
                    case 'Marketing - Past Due':
                        return 'warning';
                    case 'Under Contract':
                        return 'warning';
                    case 'Under LOI':
                        return 'warning';
                    case 'Expired':
                        return 'danger';
                    default:
                        return 'inverse';
                }
            };

            MDUListing.prototype.getAddress = function () {
                var addressStr = '';

                if (this.mdu.address.street1) {
                    addressStr += this.mdu.address.street1;
                }
                if (this.address.state) {
                    addressStr += ', ';
                    addressStr += this.mdu.address.city ? this.mdu.address.city + ', '
                        + this.mdu.address.state : this.mdu.address.state;
                }
                if (this.address.zip) {
                    addressStr += ' ';
                    addressStr += this.mdu.address.zip;
                }

                return addressStr;
            };

            MDUListing.prototype.hasAddress = function () {
                return this.mdu.address.street1 || this.mdu.address.state || this.mdu.address.city;
            };

            return MDUListing;
        };
    })
    .factory('MDUListingMarketFactory', function () {
        return function (MDUListing) {
            return new thotpod.Marketplace(MDUListing, {
                sortBy: {
                    predicate: 'datePosted',
                    reverse: false
                }
            });
        }
    });
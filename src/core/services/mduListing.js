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
                /** MDU Fields **/
                this.mdu = {};
                this.mdu.propertyType = data.mdu.propertyType || 'None Available';
                this.mdu.yearBuilt = data.mdu.yearBuilt || 'None Available';
                this.mdu.numUnits = data.mdu.numUnits || 'None Available';
                this.mdu.acres = data.mdu.acres || 'None Available';
                this.mdu.county = data.mdu.county || 'None Available';
                this.mdu.assessorURl = data.mdu.assessorUrl || 'None Available';
                /* MDU Address */
                this.mdu.address = {};
                this.mdu.address.street1 = data.mdu.address.street1 || 'None Available';
                this.mdu.address.city = data.mdu.address.city || 'None Available';
                this.mdu.address.zip = data.mdu.address.zip || 'None Available';
                this.mdu.address.latitude = data.mdu.latitude || 'None Available';
                this.mdu.address.longitude = data.mdu.address.longitude || 'None Available';

                /** MDU Listing Fields **/
                this.title = data.title || 'Untitled Property';
                this.page = data.page || 'None Available';
                this.description = data.description || 'None Available';
                this.broker = data.broker || 'None Available';
                this.flyer = data.flyer || 'None Available';
                this.price = data.price  || 'None Available';
                this.marketingUrl = data.marketingUrl  || 'None Available';
                this.callForOffers = data.callForOffers  || 'None Available';
                this.datePosted = data.datePosted  || 'None Available';
                this.propertyStatus = data.propertyStatus  || 'None Available';
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
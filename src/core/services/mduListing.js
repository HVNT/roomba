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
                /*
                 NOTE: might want to refactor to itar over all collections for finer control
                 */
                /** MDU Listing Fields **/
                this.id = data.id || 'lol no id?';
                this.workflowState = data.workflowState || 'lol no state?';
                this.title = data.title || 'Untitled Property';
                this.sourceUrl = data.sourceUrl || 'None Available';
                this.description = data.description || 'None Available';
                this.broker = data.broker || 'None Available';
                this.flyerUrl = data.flyerUrl || 'None Available';
                this.marketingUrl = data.marketingUrl || 'None Available';
                this.callForOffers = data.callForOffers || new Date();
                this.datePosted = data.datePosted || new Date();
                this.status = data.status || 'None Available'; // key should be propertyStatus
                //MARKETPLACE NEEDS TO BE REFACTORED TO HANDLE ARR OF INTS
                //this.price = data.price || new Array(2);
                this.price = [];
                if (data.price) {
                    this.price[0] = data.price[0] ? {low: data.price[0]} : {low: null};
                    this.price[1] = data.price[1] ? {high: data.price[1]} : {high: null};
                }
//                this.lowPrice = data.price[0] || null;
//                this.highPrice = data.price[1] || null;

                this.images = data.images || [];
                this.tourDates = data.tourDates || [];
                this.contacts = data.contacts || [];
                /** MDU Fields **/
                this.mdus = [];
                if (data.mdus.length > 0) {
                    for (var i = 0; i < data.mdus.length; i++) {
                        var mdu = {},
                            mduData = data.mdus[i];
                        mdu.title = mduData.title || 'Untitled MDU';
                        mdu.type = mduData.type || 'None Available';
                        mdu.yearsBuilt = [];
                        if(mduData.yearsBuilt) { // because MARKETPLACE needs to be refactored to handle arr ints
                            for (var j = 0; j < mduData.yearsBuilt.length; j++) {
                                mdu.yearsBuilt.push({value: mduData.yearsBuilt[j]});
                            }
                        }
                        mdu.numUnits = mduData.numUnits || 'None Available';
                        mdu.acres = mduData.acres || 'None Available';
                        mdu.assessorUrl = mduData.assessorUrl || 'None Available';
                        // might want to itar
                        mdu.unitMix = mduData.unitMix || [];
                        mdu.salesHistory = mduData.salesHistory || [];
                        mdu.taxHistory = mduData.taxHistory || [];
                        /* MDU Address */
                        mdu.address = {};
                        mdu.address.street1 = mduData.address.street1 || 'None Available';
                        mdu.address.street2 = mduData.address.street2 || 'None Available';
                        mdu.address.city = mduData.address.city || 'None Available';
                        mdu.address.state = mduData.address.state || 'None Available';
                        mdu.address.zip = mduData.address.zip || 'None Available';
                        mdu.address.county = mduData.address.county || 'None Available';
                        mdu.address.latitude = mduData.address.latitude || 'None Available';
                        mdu.address.longitude = mduData.address.longitude || 'None Available';

                        this.mdus.push(mdu);
                    }
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

            MDUListing.init = function (listingData) {
                var defer = $q.defer(),
                    self = this,
                    path = Environment.path + MDUListing.path,
                    config = angular.extend({}, Environment.config),
                    body = JSON.stringify(listingData);

                $http.post(path, body, config).then(
                    function (response) {
                        defer.resolve(response);
                    },
                    function (response) {
                        // set status code
                        defer.reject(response);
                    }
                );
                return defer.promise;
            };

            MDUListing.prototype.update = function () {
                console.log(this);
                var defer = $q.defer(),
                    self = this,
                    path = Environment.path + MDUListing.path + self.id,
                    config = angular.extend({}, Environment.config),
                    body = JSON.stringify(self);

                $http.put(path, body, config).then(
                    function (response) {
                        defer.resolve(response);
                    },
                    function (response) {
                        // set status code
                        defer.reject(response);
                    }
                );
                return defer.promise;

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
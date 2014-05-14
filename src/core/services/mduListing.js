/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/14/14
 * Time: 12:00 PM
 * File:
 */
angular.module('rescour.services')
    .factory('MDUListingFactory', function (Environment, $q, $http, Comment, Favorite, Hidden, CustomField, $rootScope) {

        return function (config) {
            /**
             * MDUListing
             * @param data
             * @constructor
             */
            var MDUListing = function (data) {
                this.id = data.id;
                this.resourcePath = '/mdu_listings/';
                /* id of where its stored in massive, will be an s3 url */
                this.imagePath = Environment.name == 'mock' ? '' : Environment.path + '/pictures/';

                this.title = data.title || 'Untitled Property';
                this.description = data.description || 'No description provided.';
                this.thumbnail = data.thumbnail ? this.imagePath + data.thumbnail : '/assets/img/apt0.jpg';
                this.address = data.mdu.address || {
                    street1: 'No Address Listed'
                };
                if (Date.parse(data.datePosted)) {
                    this.datePosted = new Date(data.datePosted);
                } else {
                    this.datePosted = data.datePosted ? new Date(parseInt(data.datePosted, 10)) : new Date(parseInt(this.id.toString().slice(0, 8), 16) * 1000);
                }
                /* url for the flyer (listing flyer) - a listing has a flier not the MDU (broker specific) */
                this.flyer = data.flyer;
                if (Date.parse(data.callForOffers)) { /* day brokers are taking offers up until for listing */
                    this.callForOffers = new Date(data.callForOffers); // broker specific
                } else {
                    this.callForOffers = data.callForOffers ? new Date(data.callForOffers) : undefined;
                }
                this.acres = data.mdu.acres; /* acres land MDU is on */
                this.page = data.page; /* page url scraped from (broker's site) */

                /** Collections **/
                this.images = data.images || [];
                this.tourDates = data.tourDates || [];
                this.unitMixes = data.mdu.unitMix || [];
                this.news = data.news || []; /* renamed comps to news */
                this.portfolio = data.portfolio || [];
                this.salesHistory = data.mdu.salesHistory || [];
                this.taxHistory = data.mdu.taxHistory || [];

                /** Discrete **/
                this.state = data.mdu.address ? data.mdu.address.state : null;
                this.broker = data.broker || null;
                this.propertyStatus = data.propertyStatus || null;
                this.propertyType = data.mdu.propertyType || null;

                /** Range **/
                this.location = (data.mdu.address.latitude && data.mdu.address.longitude) ?
                    [data.mdu.address.latitude, data.mdu.address.longitude] : null;
                this.latitude = parseFloat(data.mdu.address.latitude) || 'NA';
                this.longitude = parseFloat(data.mdu.address.longitude) || 'NA';
                this.yearBuilt = parseInt(data.mdu.yearBuilt, 10) || 'NA';
                this.numberUnits = parseInt(data.mdu.numUnits, 10) || 'NA';
                this.daysOnMarket = data.datePosted ? Math.ceil(Math.abs(Date.now() - (this.datePosted.getTime())) / (1000 * 3600 * 24)) : 'NA';
            };

            /**
             * @doc object
             * @name MDU.dimensions
             *
             * @description Discrete and Ranged dimensions configuration for marketplace.
             */
            MDUListing.dimensions = {
                discrete: {
                    'broker': {
                        title: 'Broker',
                        weight: 10
                    },
                    'state': {
                        title: 'State',
                        weight: 9
                    },
                    'propertyStatus': {
                        title: 'Status',
                        weight: 8
                    },
                    'propertyType': {
                        title: 'Type',
                        weight: 7
                    }
                },
                range: {
                    'numberUnits': {
                        title: 'Number of Units',
                        highBound: 500,
                        weight: 10
                    },
                    'yearBuilt': {
                        title: 'Year Built',
                        lowBound: 1930,
                        weight: 9
                    },
                    'daysOnMarket': {
                        title: 'Days on Market',
                        highBound: 300,
                        weight: 8
                    },
                    'latitude': {
                        title: 'Latitude',
                        weight: 9,
                        hidden: true
                    },
                    'longitude': {
                        title: 'Longitude',
                        weight: 9,
                        hidden: true
                    }
                }
            };

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

                (function batchItems(limit, offset) {
                    var path = Environment.path + self.path + "?limit=" + limit + (offset ? "&offset=" + offset : "");

                    $http.get(path, config).then(function (response) {
                        items = items.concat(response.data);

                        if (response.data.length < limit || response.data.length === 0) {
                            defer.resolve(items);
                        } else {
                            batchItems(limit, response.data[response.data.length - 1].id);
                        }
                    }, function (response) {
                        defer.reject(response);
                    });

                })(batchLimit);

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

            return MDU;
        };
    })
    .factory('MDUMarket',
    function (MDU) {
        return new thotpod.Marketplace(MDU, {
            sortBy: {
                predicate: 'datePosted',
                reverse: false
            }
        });
    });
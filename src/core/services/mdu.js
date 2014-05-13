angular.module('rescour.services')
    .factory('MDU', function (Environment, $q, $http, Comment, Favorite, Hidden, CustomField, $rootScope) {
        /**
         * MDU
         * @param data
         * @constructor
         */
        var MDU = function (data) {
            this.id = data.id;
            this.resourcePath = '/properties/' + this.id;
            this.imagePath = Environment.name == 'mock' ? '' : Environment.path + '/pictures/';

            this.title = data.title || 'Untitled Property';
            this.description = data.description || 'No description provided.';
            this.thumbnail = data.thumbnail ? this.imagePath + data.thumbnail : '/assets/img/apt0.jpg';
            this.address = data.address || {
                street1: 'No Address Listed'
            };
            if (Date.parse(data.datePosted)) {
                this.datePosted = new Date(data.datePosted);
            } else {
                this.datePosted = data.datePosted ? new Date(parseInt(data.datePosted, 10)) : new Date(parseInt(this.id.toString().slice(0, 8), 16) * 1000);
            }
            this.flyer = data.flyer;
            if (Date.parse(data.callForOffers)) {
                this.callForOffers = new Date(data.callForOffers);
            } else {
                this.callForOffers = data.callForOffers ? new Date(data.callForOffers) : undefined;
            }
            this.acres = data.acres;
            this.page = data.page;

            /** Collections **/
            this.comments = [];
            this.favorites = [];
            this.hidden = [];
            this.images = data.images || [];
            this.tourDates = data.tourDates || [];
            this.unitMixes = data.unitMix || [];
            this.comps = data.comps || [];
            this.contacts = data.contacts || [];
            this.portfolio = data.portfolio || [];
            this.customFields = {};


            /** Discrete **/
            this.state = data.address ? data.address.state : null;
            this.broker = data.broker || null;
            this.propertyStatus = data.propertyStatus || null;
            this.propertyType = data.propertyType || null;

            /** Range **/
            this.location = (data.address.latitude && data.address.longitude) ? [data.address.latitude, data.address.longitude] : null;
            this.latitude = parseFloat(data.address.latitude) || 'NA';
            this.longitude = parseFloat(data.address.longitude) || 'NA';
            this.yearBuilt = parseInt(data.yearBuilt, 10) || 'NA';
            this.numberUnits = parseInt(data.numUnits, 10) || 'NA';
            this.daysOnMarket = data.datePosted ? Math.ceil(Math.abs(Date.now() - (this.datePosted.getTime())) / (1000 * 3600 * 24)) : 'NA';
        };

        /**
         * @doc object
         * @name MDU.dimensions
         *
         * @description Discrete and Ranged dimensions configuration for marketplace.
         */
        MDU.dimensions = {
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
         * @methodOf MDU
         *
         * @description Query all MDU's
         *
         * @returns {HttpPromise} Future Promise
         */
        MDU.query = function () {
            var items = [],
                defer = $q.defer(),
                config = _.extend({
                    cache: true
                }, Environment.config),
                batchLimit = 500;

            (function batchItems(limit, offset) {
                var path = Environment.path + '/properties/' + "?limit=" + limit + (offset ? "&offset=" + offset : "");

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
         * @name fetch
         * @methodOf MDU.prototype
         *
         * @description Fetch and merge sub resources onto MDU instance.
         *
         * @returns {HttpPromise} Future Promise
         */
        MDU.prototype.fetch = function () {
            var defer = $q.defer(),
                self = this,
                path = Environment.path + self.resourcePath,
                config = _.extend({}, Environment.config);

            if (self.fetched) {
                defer.resolve(self);
            } else {
                self
                    .getWalkscore()
                    .then(function (response) {
                        self.fetched = true;
                    });
                defer.resolve(self);
            }

            return defer.promise;
        };

        MDU.prototype.getWalkscore = function () {
            var defer = $q.defer(),
                self = this;

            $http
                .get(Environment.walkscore.path, {
                    params: {
                        format: 'json',
                        address: self.getAddress(),
                        lat: self.address.latitude,
                        lon: self.address.longitude
                    },
                    cache: true,
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(function (response) {
                    self.walkscore = response.data;
                    defer.resolve(response);
                }, function (response) {
                    defer.reject(response);
                });

            return defer.promise;
        };

        /**
         * @doc method
         * @name getStatus
         * @methodOf MDU.prototype
         *
         * @description Returns CSS class suffix based off mduStatus.
         *
         * @returns {String} CSS class suffix
         */
        MDU.prototype.getStatus = function () {
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

        /**
         * @doc method
         * @name toggleFavorite
         * @methodOf MDU.prototype
         *
         * @description Toggles isFavorite, if false, DELETE, if true POST.
         *
         * @returns {HttpPromise} Resolves {MDU} this, Rejects {obj} response.
         */
        MDU.prototype.toggleFavorite = function () {
            var defer = $q.defer(),
                self = this,
                path = Environment.path + self.resourcePath + '/favorites/',
                config = _.extend({}, Environment.config);

            this.isFavorite = !this.isFavorite;

            $http(_.extend({
                url: path,
                method: this.isFavorite ? 'POST' : 'DELETE'
            }, config)).then(
                function (response) {
                    if (response.status === 200) {
                        defer.resolve(self);
                    } else {
                        self.isFavorite = !self.isFavorite;
                        defer.reject(response);
                    }
                },
                function (response) {
                    self.isFavorite = !self.isFavorite;
                    defer.reject(response);
                }
            );

            return defer.promise;
        };

        /**
         * @doc method
         * @name addComment
         * @methodOf MDU.prototype
         *
         * @description Takes a raw comment, initializes, adds to MDU and then saves.
         * If save fails, remove from MDU.
         *
         * @param {obj} commentObj Raw comment
         * @returns {HttpPromise} Resolves {Comment} comment.  Rejects {obj} response.
         */
        MDU.prototype.addComment = function (commentObj) {
            var comment = new Comment(commentObj, this),
                defer = $q.defer(),
                self = this,
                index = self.comments.push(comment) - 1;

            comment
                .save()
                .then(function (response) {
                    if (response.status === 200) {
                        defer.resolve(comment);
                    } else {
                        // remove comment from MDU
                        self.comments.splice(index, 1);
                        defer.reject(response);
                    }
                }, function (response) {
                    // remove comment from MDU
                    self.comments.splice(index, 1);
                    defer.reject(response)
                });

            return defer.promise;
        };

        MDU.prototype.toggleFavorite = function () {
            var self = this,
                promises = [];

            if (self.favorites.length > 0) {
                self.isFavorite = false;
                angular.forEach(self.favorites, function (fav) {
                    var defer = $q.defer();

                    fav.delete().then(function (response) {
                        self.favorites = _.without(self.favorites, fav);
                        defer.resolve(response);
                    }, function (response) {
                        self.isFavorite = true;
                        defer.reject(response);
                    })
                    promises.push(defer);
                });
            } else {
                var newFavorite = new Favorite({
                        propertyId: self.id
                    }),
                    defer = $q.defer();

                self.isFavorite = true;
                newFavorite.save().then(function (response) {
                        self.favorites.push(newFavorite);
                        defer.resolve(response);
                    },
                    function (response) {
                        self.isFavorite = false;
                        defer.reject(response);
                    });
                promises.push(defer);
            }

            return $q.all(promises);

        };

        MDU.prototype.toggleHidden = function () {
            var self = this,
                promises = [];

            if (self.hidden.length > 0) {
                self.isHidden = false;

                angular.forEach(self.hidden, function (h) {
                    var defer = $q.defer();

                    h.delete().then(function (response) {
                        self.hidden = _.without(self.hidden, h);
                        defer.resolve(response);
                    }, function () {
                        self.isHidden = true;
                    });

                    promises.push(defer);
                });
            } else {
                var newHidden = new Hidden({
                        propertyId: self.id
                    }),
                    defer = $q.defer();

                self.isHidden = true;
                newHidden.save().then(function (response) {
                        self.$spinner = false;
                        self.hidden.push(newHidden);
                        defer.resolve(response);
                    },
                    function (response) {
                        self.hidden = false;
                        defer.reject(response);
                    });

                promises.push(defer);
            }

            return $q.all(promises);
        };

        MDU.prototype.getAddress = function () {
            var addressStr = '';

            if (this.address.street1) {
                addressStr += this.address.street1;
            }
            if (this.address.state) {
                addressStr += ', ';
                addressStr += this.address.city ? this.address.city + ', ' + this.address.state : this.address.state;
            }
            if (this.address.zip) {
                addressStr += ' ';
                addressStr += this.address.zip;
            }

            return addressStr;
        };

        MDU.prototype.getCustomField = function (customFieldDimension) {
            return this.customFields[customFieldDimension.id] =
                this.customFields[customFieldDimension.id] ?
                    this.customFields[customFieldDimension.id] :
                    new CustomField({
                        propertyId: this.id,
                        customFieldDimensionId: customFieldDimension.id
                    });
        };

        MDU.prototype.saveCustomField = function (customFieldDimension) {
            //
        };

        MDU.prototype.hasAddress = function () {
            return this.address.street1 || this.address.state || this.address.city;
        };

        return MDU;
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
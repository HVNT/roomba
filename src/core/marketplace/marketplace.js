/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 4:04 PM
 * File: /core/market/market.js
 */

'use strict';

angular.module('rescour.marketplace', ['rescour.config'])
    .service('Market', ['Dimensions', '$q',
        function (Dimensions, $q) {
            // Private items data
            this.activeItem = null;
            this.activeCollection = null;
            this.items = {};
            this.dimensions = {};
            this.visibleIds = [];

            this.setActive = function (item) {
                var defer = $q.defer(),
                    self = this;

                if (!item.details) {
                    item.$get()
                        .then(function (_item) {
                            self.activeItem = _item;
                            defer.resolve(self.active);
                        });
                } else {
                    this.activeItem = item;
                    defer.resolve(this.active);
                }

                return defer.promise;
            };

            this.toArray = function () {
                return _.map(this.items, function (val) {
                    return val;
                });
            };

            this.initialize = function (Item, tag) {
                var defer = $q.defer(),
                    self = this;

                if (tag) {
                   Item.path += '/' + tag;
                }

                if (_.isEmpty(self.items)) {
                    this.items = {};
                    this.dimensions = new Dimensions(Item.collection.dimensions);

                    Item.query().then(
                        function (response) {
                            var products = response.data;
                            console.log(products);
                            for (var product in products) {
                                if (products.hasOwnProperty(product)) {
                                    var _product = products[product];
                                    try {
                                        self.items[_product.id] = new Item(_product);
                                        self.items[_product.id].mapDimensions(self.dimensions);
                                        self.dimensions.ids.push(_product.id);
                                    } catch (e) {
                                        console.log(e.message);
                                    }
                                }
                            }
                            self.dimensions.initialize().apply().predict();
                            self.render();
                            defer.resolve(self.items);
                        }, function (response) {
                            defer.reject(response);
                        }
                    );
                } else {
                    defer.resolve(self.items);
                }

                return defer.promise;
            };

            this.reload = function () {
                for (var id in this.items) {
                    if (this.items.hasOwnProperty(id)) {
                        this.items[id].mapDimensions(this.dimensions);
                    }
                }
                this.dimensions.initialize();
            };

            this.render = function (subset) {
                var _dimensions = this.dimensions;
                this.visibleIds = [];

                if (!subset || subset === 'all') {
                    for (var id in this.items) {
                        if (this.items.hasOwnProperty(id)) {
                            this.items[id].isVisible = (_.contains(_dimensions.visibleIds, id) && !this.items[id].hidden);
                            this.items[id].isVisible ? this.visibleIds.push(id) : null;
                        }
                    }
                } else if (subset === 'notes') {
                    for (var i = 0, len = _dimensions.visibleIds.length; i < len; i++) {
                        var _id = _dimensions.visibleIds[i];
                        if (this.items.hasOwnProperty(_id)) {
                            this.items[_id].isVisible = this.items[_id].hasComments || this.items[_id].hasFinances;
                            this.items[_id].isVisible ? this.visibleIds.push(_id) : null;
                        }
                    }
                } else {
                    for (var i = 0, len = _dimensions.visibleIds.length; i < len; i++) {
                        var _id = _dimensions.visibleIds[i];
                        if (this.items.hasOwnProperty(_id)) {
                            this.items[_id].isVisible = this.items[_id][subset];
                            this.items[_id].isVisible ? this.visibleIds.push(_id) : null;
                        }
                    }
                }
            };
        }])
    .factory('Item', ['$_api', '$q', '$http', '$collections',
        function ($_api, $q, $http, $collections) {

            function ItemFactory (collection) {

                var Item = function (data) {
                    var defaults = {
                            title: 'Untitled',
                            description: 'No description provided.',
                            thumbnail: 'http://placehold.it/100x100',
                            hidden: false,
                            isVisible: true
                        },
                        opts = angular.extend({}, defaults, data),
                        self = this;

                    angular.copy(opts, this);

                    if (collection) {
                        var _collection = collection;
                        angular.forEach(_collection.discreet, function(value, key){
                            self[key] = self[key] || (value.placeholder || "");
                        });
                        angular.forEach(_collection.range, function(value, key){
                            self[key] = self[key] || (value.placeholder || "");
                        });
                        angular.forEach(_collection.misc, function(value, key){
                            self[key] = self[key] || (value.placeholder || "");
                        });
                    }
                };

                Item.collection = collection;

                Item.path = collection.path;

                Item.query = function () {
                    // if collection is undefined, just query
                    var defer = $q.defer(),
                        config = angular.extend({
                            transformRequest: function (data) {
                                return data;
                            }
                        }, $_api.config);

                    $http.get($_api.path + Item.path, config).then(function (response) {
                        var items = {};
                        angular.forEach(response.data, function(value, key){

                        });
                        defer.resolve(response);
                    }, function (response) {
                        defer.reject(response);
                    });

                    return defer.promise;
                };

                Item.prototype.mapDimensions = function (dimensions) {
                    var self = this;

                    angular.forEach(collection.dimensions.discreet, function (attrValue, attrID) {
                        self[attrID] = self[attrID] || 'Unknown';
                        dimensions.pushDiscreetId(attrID, self.id, self[attrID]);
                    });

                    angular.forEach(collection.dimensions.range, function (attrValue, attrID) {
                        self[attrID] = (_.isNaN(parseInt(self[attrID], 10)) || !self[attrID]) ? 'NA' : self[attrID];
                        dimensions.pushRangeId(attrID, self.id, self[attrID]);
                    });
                };

                Item.prototype.$get = function () {
                    var self = this,
                        defer = $q.defer(),
                        config = angular.extend({
                            transformRequest: function (data) {
                                self.$spinner = true;
                                return data;
                            }
                        });

                    $http.get($_api.path + Item.path + '/' + this.id, config).then(function (response) {
                        angular.extend(self, {}, response.data);
                        self.$spinner = false;
                        defer.resolve(self);

                    }, function (response) {
                        self.$spinner = false;
                        defer.reject(response);
                    });

                    return defer.promise;
                };

                Item.prototype.$save = function () {
                    var self = this,
                        defer = $q.defer(),
                        config = angular.extend({
                            transformRequest: function (data) {
                                self.$spinner = true;
                                return data;
                            }
                        }),
                        body = JSON.stringify(self);

                    if (self.id) {
                        $http.put($_api.path + Item.path + '/' + self.id, body, config)
                            .then(function (response) {
                                self.$spinner = false;
                                defer.resolve(response);
                            }, function (response) {
                                self.$spinner = false;
                                defer.reject(response);
                            });
                    } else {
                        $http.post($_api.path + Item.path + '/', body, config)
                            .then(function (response) {
                                self.$spinner = false;
                                self.id = response.data.id;
                                defer.resolve(response);
                            }, function (response) {
                                self.$spinner = false;
                                defer.reject(response);
                            });
                    }

                    return defer.promise;
                };

                return Item;
            }

            return ItemFactory;
        }])
    .factory('Dimensions', ['$timeout', '$collections',
        function ($timeout, $collections) {
            // Dimensions Constructor
            function Dimensions(collection) {

                var defaults = angular.extend({
                        title: "",
                        discreet: {},
                        range: {},
                        visibleIds: [],
                        ids: []
                    }, collection),
                    discreetDefaults = {
                        values: {},
                        selected: 0,
                        visibleIds: []
                    },
                    rangeDefaults = {
                        ids: [],
                        na: [],
                        high: null,
                        low: null
                    },
                    self = this;

                angular.copy(defaults, this);

                angular.forEach(this.discreet, function (value, key) {
                    var _discreet = angular.extend({}, discreetDefaults, value);
                    angular.copy(_discreet, self.discreet[key]);
                });

                angular.forEach(this.range, function (value, key) {
                    var _range = angular.extend({}, rangeDefaults, value);
                    angular.copy(_range, self.range[key]);
                });
            }

            Dimensions.prototype.pushDiscreetId = function (attrID, itemID, value) {
                // Only add if dimension already exists
                if (_.has(this.discreet, attrID)) {
                    var _discreet = this.discreet[attrID];
                    value = value || "Unknown";

                    if (_.has(_discreet.values, value)) {
                        _discreet.values[value].ids.push(itemID);
                    } else {
                        _discreet.values[value] = {
                            ids: [itemID],
                            title: value,
                            isSelected: false
                        };
                    }
                }
            };

            Dimensions.prototype.pushRangeId = function (attrID, itemID, value) {
                if (_.has(this.range, attrID)) {
                    var _range = this.range[attrID],
                        parsedVal = parseInt(value, 10),
                        boundedVal = _.isNaN(parsedVal) ? "NA" : (this.range[attrID].bound ? (parsedVal > this.range[attrID].bound ? this.range[attrID].bound : parsedVal) : parsedVal);
                    if (boundedVal === "NA") {
                        _range.na.push(itemID);
                    }
                    else {
                        _range.ids.push({
                            id: itemID,
                            value: boundedVal
                        });

                        // Check to see if current value is the low bound value
                        if (_range.low === null || parsedVal <= _range.low) {
                            _range.low = boundedVal;
                        }

                        // Check to see if the current value is the high bound value
                        if (_range.high === null || parsedVal >= _range.high) {
                            _range.high = boundedVal;
                        }
                    }
                }
            };

            Dimensions.prototype.initialize = function () {
                var attrID;
                // Set selected to the bounds of high and low
                if (this.range !== {}) {
                    _.each(this.range, function (r) {
                        r.highSelected = r.highSelected || r.high;
                        r.lowSelected = r.lowSelected || r.low;
                    });
                }

                // Sort
                for (attrID in this.range) {
                    if (this.range.hasOwnProperty(attrID)) {
                        this.range[attrID].ids = _.sortBy(this.range[attrID].ids, function (i) {
                            return i.value;
                        });
                    }
                }

                return this;
            };

            Dimensions.prototype.apply = function () {
                this.visibleIds = this._calcRangeVisible()._calcDiscreetVisible()._intersectVisible();
                return this;
            };

            Dimensions.prototype.predict = function () {
                var self = this;
                angular.forEach(self.discreet, function (parent) {
                    angular.forEach(parent.values, function (value) {
                        $timeout(function () {
                            var len;
                            if (parent.selected > 0 && !value.isSelected) {
                                // Calculate length
                                value.compare = true;
                                len = (self._calcDiscreetVisible()._intersectVisible()).length - self.visibleIds.length;
                                delete value.compare;

                                if (len > 0) {
                                    value.badge = "badge-success";
                                    value.predict = "+" + len;
                                } else {
                                    value.badge = ""; // Otherwise leave gray
                                    value.predict = 0;
                                }
                            } else { // Means that there is nothing selected in this attribute section,
                                // or this value is the one selected

                                // Calculate intersection of this value and what current visible is
                                len = _.intersection(value.ids, self.visibleIds).length;

                                // Make the badge blue if greater than 0
                                value.badge = len ? "badge-info" : "";

                                // Return the value
                                value.predict = len;
                            }
                        }, 0);
                    });
                });

                return this;
            };

            Dimensions.prototype.load = function (search) {
                var self = this;

                var _search = angular.extend({
                    title: '',
                    discreet: {},
                    range: {}
                }, search);

                self.id = _search.id || undefined;
                self.title = _search.title || '';

                for (var rangeID in self.range) {
                    // Check if range attribute exists
                    if (_search.range.hasOwnProperty(rangeID)) {
                        var withinLowBound = (_search.range[rangeID].lowSelected >= self.range[rangeID].low),
                            withinHighBound = (_search.range[rangeID].highSelected <= self.range[rangeID].high);
                        // Then check if the selected on the save is still within bounds
                        if (withinLowBound && withinHighBound) {
                            self.range[rangeID].lowSelected = _search.range[rangeID].lowSelected;
                            self.range[rangeID].highSelected = _search.range[rangeID].highSelected;
                        } else if (!withinLowBound && withinHighBound) {
                            self.range[rangeID].lowSelected = self.range[rangeID].low;
                            self.range[rangeID].highSelected = _search.range[rangeID].highSelected;
                        } else if (withinLowBound && !withinHighBound) {
                            self.range[rangeID].lowSelected = _search.range[rangeID].lowSelected;
                            self.range[rangeID].highSelected = self.range[rangeID].high;
                        } else {
                            self.range[rangeID].lowSelected = self.range[rangeID].low;
                            self.range[rangeID].highSelected = self.range[rangeID].high;
                        }
                    } else {
                        if (self.range.hasOwnProperty(rangeID)) {
                            self.range[rangeID].lowSelected = self.range[rangeID].low;
                            self.range[rangeID].highSelected = self.range[rangeID].high;
                        }
                    }
                }

                for (var discreetID in self.discreet) {
                    // Check if discreet attribute exists on current attributes
                    if (_search.discreet.hasOwnProperty(discreetID)) {
                        for (var attrID in _search.discreet[discreetID].values) {
                            // If the saved search attribute exists
                            if (self.discreet[discreetID].values.hasOwnProperty(attrID)) {
                                // Check to see if marked as true
                                if (_search.discreet[discreetID].values[attrID].isSelected && !self.discreet[discreetID].values[attrID].isSelected) {
                                    self.discreet[discreetID].values[attrID].isSelected = true;
                                    self.discreet[discreetID].selected++;
                                } else if (!_search.discreet[discreetID].values[attrID].isSelected && self.discreet[discreetID].values[attrID].isSelected) {
                                    self.discreet[discreetID].values[attrID].isSelected = false;
                                    self.discreet[discreetID].selected--;
                                }
                            }
                        }
                    } else {
                        if (self.discreet.hasOwnProperty(discreetID)) {
                            for (var attrID in self.discreet[discreetID].values) {
                                // If the saved search attribute exists
                                if (self.discreet[discreetID].values.hasOwnProperty(attrID)) {
                                    // Check to see if marked as true
                                    if (self.discreet[discreetID].values[attrID].isSelected) {
                                        self.discreet[discreetID].values[attrID].isSelected = false;
                                        self.discreet[discreetID].selected--;
                                    }
                                }
                            }
                        }
                    }
                }
            };

            Dimensions.prototype.toArray = function () {
                var dimensionsArr = angular.extend({}, this, {
                    discreet: _.map(this.discreet, function (val) {
                        return val
                    }),
                    range: _.map(this.range, function (val) {
                        return val
                    })
                });
                return dimensionsArr;
            };

            Dimensions.prototype.reset = function () {
                this.title = "";
                this.id = undefined;
                this.discreet = {};
                this.range = {};

                return this;
            };

            Dimensions.prototype._calcRangeVisible = function () {
                var self = this;

                for (var rangeID in self.range) {
                    if (self.range.hasOwnProperty(rangeID)) {
                        var endpointArray = [],
                            _range = self.range[rangeID];

                        // Iterate from bottom to find low bound on sorted id array
                        for (var j = 0; j < _range.ids.length; j++) {
                            if (_range.ids[j].value >= _range.lowSelected) {
                                endpointArray.push(j);
                                break;
                            }
                        }

                        if (_range.highSelected >= _range.bound) {
                            endpointArray.push(_range.ids.length - 1);
                        } else {
                            // Iterate from top to find high bound on sorted id array
                            for (var i = _range.ids.length - 1; i > 0; i--) {

                                if (_range.ids[i].value <= _range.highSelected) {
                                    endpointArray.push(i);
                                    break;
                                }
                            }
                        }

                        endpointArray[1] = endpointArray[1] || endpointArray[0];

                        // Remove ids from id, value objects

                        self.range[rangeID].visibleIds = _.union(
                            _range.na, // concat
                            _.map(_range.ids.slice(endpointArray[0], endpointArray[1] + 1),
                                function (idPair) {
                                    return idPair.id;
                                })
                        );
                    }
                }

                return this;
            };

            Dimensions.prototype._calcDiscreetVisible = function () {
                var unionArray = [],
                    self = this;

                for (var discreetID in self.discreet) {
                    if (self.discreet.hasOwnProperty(discreetID)) {
                        unionArray = [];
                        var _discreet = self.discreet[discreetID];
                        _discreet.selected = 0;
                        for (var attrID in _discreet.values) {
                            if (self.discreet[discreetID].values.hasOwnProperty(attrID)) {
                                var _value = self.discreet[discreetID].values[attrID];
                                if (_value.isSelected || _value.compare) {
                                    unionArray = unionArray.concat(_value.ids);
                                }
                                _value.isSelected ? _discreet.selected += 1 : null;
                            }
                        }
                        self.discreet[discreetID].visibleIds = unionArray;
                    }
                }

                return this;
            };

            Dimensions.prototype._intersectVisible = function () {
                var self = this, _range, _discreet,
                    intersectArray = [];

                if (!_.isEmpty(self.range)) {
                    for (var rangeID in self.range) {
                        if (self.range.hasOwnProperty(rangeID)) {
                            _range = self.range[rangeID];
                            if (_range.visibleIds.length === 0) {
                                continue;
                            }
                            if (intersectArray.length === 0) {
                                intersectArray = _range.visibleIds;
                            } else {
                                intersectArray = _.intersection(intersectArray, _range.visibleIds);
                            }
                        }
                    }
                } else {
                    intersectArray = self.ids;
                }

                for (var discreetID in self.discreet) {
                    if (self.discreet.hasOwnProperty(discreetID)) {
                        _discreet = self.discreet[discreetID];
                        if (_discreet.visibleIds.length === 0) {
                            continue;
                        }
                        intersectArray = _.intersection(intersectArray, _discreet.visibleIds);
                    }
                }
                return intersectArray;
            };


            return Dimensions;
        }]);


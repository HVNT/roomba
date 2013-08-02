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
            var activeItem = null,
                activePath = null,
                items = {},
                dimensions = {};

            this.visibleIds = [];

            this.getActive = function () {
                return activeItem;
            };

            this.setActive = function (id) {
                if (angular.isObject(id)) {
                    activeItem = id;
                } else {
                    activeItem = items[id];
                }
                return activeItem;
            };

            this.getItems = function () {
                return _.map(items, function (val) {
                    return val;
                });
            };

            this.getDimensions = function () {
                return dimensions.toArray();
            };

            this.initialize = function (Model) {
                var defer = $q.defer(),
                    self = this;

                // Apply any tags to the path
                if (arguments.length > 1) {
                    var tags = Array.prototype.slice.call(arguments).slice(1);
                    Model.path = Model.collection.path;
                    angular.forEach(tags, function (value) {
                        Model.path += '/' + value;
                    });
                }

                if (_.isEmpty(items) || activePath !== Model.path) {
                    items = {};
                    dimensions = new Dimensions(Model.collection);

                    Model.query().then(
                        function (response) {
                            var products = response.data;
                            for (var product in products) {
                                if (products.hasOwnProperty(product)) {
                                    var _product = products[product];
                                    try {
                                        items[_product.id] = new Model(_product);
                                        items[_product.id].mapDimensions(dimensions);
                                        dimensions.ids.push(_product.id);
                                    } catch (e) {
                                        console.log(e.message);
                                    }
                                }
                            }
                            activePath = Model.path;
                            dimensions.initialize().apply().predict();
                            self.render();
                            defer.resolve(items);
                        }, function (response) {
                            defer.reject(response);
                        }
                    );
                } else {
                    defer.resolve(items);
                }

                return defer.promise;
            };

            this.reload = function () {
                for (var id in items) {
                    if (items.hasOwnProperty(id)) {
                        items[id].mapDimensions(dimensions);
                    }
                }
                dimensions.initialize();
            };

            this.render = function (subset) {
                var self = this;
                self.visibleIds = [];
                self.subset = subset || self.subset;

                for (var id in items) {
                    if (items.hasOwnProperty(id)) {
                        if (!self.subset || self.subset === 'all') {
                            items[id].isVisible = _.contains(dimensions.visibleIds, id) && !items[id].hidden;
                        } else {
                            items[id].isVisible = _.contains(dimensions.visibleIds, id) && items[id][self.subset];
                        }
                        items[id].isVisible ? self.visibleIds.push(id) : null;
                    }
                }
            };

            this.apply = function () {
                // Toggle any values
                if (arguments.length > 0) {
                    angular.forEach(arguments, function (discreet) {
                        if (discreet) {
                            discreet.isSelected = !discreet.isSelected;
                        }
                    });
                    dimensions.apply();
                    this.render();
                }
            }
        }])
    .factory('Item', ['$_api', '$q', '$http',
        function ($_api, $q, $http) {
            function ItemFactory(collection) {

                var Item = function (data, defaults) {
                    var _defaults = defaults || {
                            title: 'Untitled',
                            description: 'No description provided.',
                            thumbnail: 'http://placehold.it/100x100',
                            hidden: false,
                            isVisible: true
                        },
                        opts = angular.extend({}, _defaults, data),
                        self = this;

                    angular.copy(opts, this);

                    if (collection) {
                        angular.forEach(collection.fields, function (value, key) {
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
                        defer.resolve(response);
                    }, function (response) {
                        defer.reject(response);
                    });

                    return defer.promise;
                };

                Item.prototype.mapDimensions = function (dimensions) {
                    var self = this;

                    angular.forEach(collection.dimensions.discreet, function (attrID) {
                        self[attrID] = self[attrID] || 'Unknown';
                        dimensions.pushDiscreetId(attrID, self.id, self[attrID]);
                    });

                    angular.forEach(collection.dimensions.range, function (attrID) {
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
    .factory('Dimensions', ['$timeout',
        function ($timeout) {
            // Dimensions Constructor
            function Dimensions(collection) {
                var defaults = angular.extend({
                    title: "",
                    discreet: {},
                    range: {},
                    visibleIds: [],
                    ids: []
                });

                angular.forEach(collection.dimensions.discreet, function (value, key) {
                    defaults.discreet[value] = collection.fields[value];
                });

                angular.forEach(collection.dimensions.range, function (value, key) {
                    defaults.range[value] = collection.fields[value];
                });

                var discreetDefaults = {
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
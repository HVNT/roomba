/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 4:04 PM
 * File: /core/market/market.js
 */

'use strict';

angular.module('rescour.marketplace', ['rescour.config'])
    .service('Market', ['Dimensions',
        function (Dimensions, $q) {
            // Private items data
            var activeItem = null,
                prevActive = null;

            this.dimensions = {};
            this.items = {};
            this.visibleIds = [];

            this.getActive = function () {
                return activeItem;
            };

            this.setActive = function (id) {
                if (angular.isObject(id)) {
                    prevActive = activeItem;
                    activeItem = id;
                    activeItem.isActive = true;
                } else if (this.items[id]) {
                    prevActive = activeItem;
                    activeItem = this.items[id];
                    activeItem.isActive = true;
                } else {
                    activeItem = null;
                }

                if (prevActive) {
                    prevActive.isActive = false;
                }

                return activeItem;
            };

            this.items = {};

            this.getItems = function () {
                return _.map(this.items, function (val) {
                    return val;
                });
            };

            this.getDimensions = function () {
                return this.dimensions.toArray();
            };

            this.initialize = function (models, dimensions, Model) {
                // Apply any tags to the path
                var self = this;
                this.items = {};
                this.dimensions = new Dimensions(dimensions);

                var idPosition = 0;
                for (var _model in models) {
                    if (models.hasOwnProperty(_model)) {
                        var model = models[_model];

                        try {
                            var _item = this.items[model.id] = (Model ? new Model(model) : model);

                            this.dimensions.idMap.push(model.id);

                            angular.forEach(dimensions.discreet, function (attr, attrID) {
                                if (_item.dimensions) {
                                    var _discreetVal = _item.dimensions.discreet[attrID] = (_item.dimensions.discreet[attrID] || 'Unknown');
                                } else if (typeof _item[attrID] !== 'undefined') {
                                    var _discreetVal = _item[attrID] = (_item[attrID] || 'Unknown');
                                } else {
                                    throw new Error("Cannot find discrete attribute: " + attrID);
                                }
                                self.dimensions.pushDiscreetId(attrID, idPosition, _discreetVal);
                            });
                            idPosition += 1;
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                }
//                this.dimensions.initialize();
                this.apply();
                console.log(this.items);
                console.log(this.dimensions);
                return this.items;
            };

            this.render = function (subset) {
                var self = this,
                    dimensions = this.dimensions;
                self.visibleIds = [];
                self.subset = subset || self.subset;

                for (var id in this.items) {
                    if (this.items.hasOwnProperty(id)) {
                        if (!self.subset || self.subset === 'all') {
                            this.items[id].isVisible = _.contains(dimensions.visibleIds, id) && !this.items[id].hidden;
                        } else {
                            this.items[id].isVisible = _.contains(dimensions.visibleIds, id) && this.items[id][self.subset];
                        }
                        this.items[id].isVisible ? self.visibleIds.push(id) : null;
                    }
                }
            };

            this.apply = function (discreet, value) {
                var dimensions = this.dimensions,
                    items = this.items;

                dimensions.visibleIds.length = 0;

                // apply is called on init, so we have to check whether args are passed in
                if (discreet && value) {
                    value.isSelected = !value.isSelected;
                    value.isSelected ? discreet.selected++ : discreet.selected--;
                }

                // determines how many integers we need to store n bits, if n is number of items
                var BIT_SET_LENGTH = Math.ceil(dimensions.idMap.length / 32),
                    bitSet = [],
                    i;

                // each integer is first flattened into a single integer within each discreet category
                // by taking the union of all sets. Each of those flattened integers are
                for (i = 0; i < BIT_SET_LENGTH; i++) {
                    bitSet.push(~0);

                    for (var attrId in dimensions.discreet) {
                        if (dimensions.discreet.hasOwnProperty(attrId)) {
                            var _discreet = dimensions.discreet[attrId],
                                union = 0;

                            for (var valueId in _discreet.values) {
                                if (_discreet.values.hasOwnProperty(valueId)) {
                                    var _value = _discreet.values[valueId];

                                    if (_value.isSelected || _discreet.selected === 0) {
                                        union = union | _value.ids[i];
                                    }
                                }
                            }

                            bitSet[i] = bitSet[i] & union;
                        }
                    }

                    for (var p = 0; p < 32; p++) {
                        // index is (i * 32) + whatever bit number is flipped
                        var itemIndex = (i * 32) + p;
                        if (dimensions.idMap[itemIndex]) {
                            items[dimensions.idMap[itemIndex]].isVisible = !!(1 & bitSet[i]);
                            dimensions.visibleIds.push(dimensions.idMap[itemIndex]);
                        }

                        bitSet[i] = bitSet[i] >> 1;
                    }
                }
            }
        }])
    .factory('Dimensions', ['$timeout',
        function ($timeout) {

            function setBit(idPos, bitSet) {
                var bitSetIndex = parseInt((idPos / 32), 10);
                bitSet[bitSetIndex] = bitSet[bitSetIndex] | ( 1 << (idPos % 32) );
                return bitSet;
            }

            // Dimensions Constructor
            function Dimensions(dimensions) {
                var defaults = angular.extend({
                        title: "",
                        discreet: {},
                        range: {},
                        visibleIds: [],
                        idMap: []
                    }),
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

                angular.copy(defaults, self);

                for (var attrID in dimensions.discreet) {
                    if (dimensions.discreet.hasOwnProperty(attrID)) {
                        var _attr = dimensions.discreet[attrID],
                            _discreet = angular.extend(_attr, discreetDefaults);

                        self.discreet[attrID] = {};
                        angular.copy(_discreet, self.discreet[attrID]);
                    }
                }

                for (var attrID in dimensions.range) {
                    if (dimensions.range.hasOwnProperty(attrID)) {
                        var _attr = dimensions.range[attrID],
                            _range = angular.extend(_attr, rangeDefaults);

                        self.range[attrID] = {};
                        angular.copy(_range, self.range[attrID]);
                    }
                }
            }

            Dimensions.prototype.pushDiscreetId = function (attrID, idPosition, value) {
                var _discreet = this.discreet[attrID];

                if (_discreet) {
                    value = value || "Unknown";

                    if (_discreet.values.hasOwnProperty(value)) {
                        if (_discreet.values[value].ids.length < this.idMap.length / 32) {
                            _discreet.values[value].ids.push(0);
                        }
                        _discreet.values[value].ids = setBit(idPosition, _discreet.values[value].ids);
                    } else {
                        _discreet.values[value] = {
                            ids: [0],
                            title: value,
                            isSelected: false
                        };
                        _discreet.values[value].ids = setBit(idPosition, _discreet.values[value].ids);
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

            return Dimensions;
        }]);
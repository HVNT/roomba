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
                        Model.path += value;
                    });
                }

                if (_.isEmpty(items) || activePath !== Model.path) {
                    items = {};
                    dimensions = new Dimensions(Model.collection);

                    Model.query().then(
                        function (response) {
                            var _models = response.data;
                            var idPosition = 0;
                            for (var _model in _models) {
                                if (_models.hasOwnProperty(_model)) {
                                    var model = _models[_model];

                                    try {
                                        items[model.id] = new Model(model);
                                        dimensions.idMap.push(model.id);

                                        // Map them dimensions
                                        angular.forEach(items[model.id].dimensions.discreet, function (attrValue, attrID) {
                                            if (Model.collection.fields.hasOwnProperty(attrID)) {
                                                var _discreetVal = items[model.id].dimensions.discreet[attrID] = items[model.id].dimensions.discreet[attrID] || 'Unknown';
                                                dimensions.pushDiscreetId(attrID, idPosition, _discreetVal);
                                            } else {
                                                throw Error("Field " + attrID + " is not defined in collection");
                                            }
                                        });

//                                        items[model.id].mapDimensions(dimensions, idPosition);
                                        idPosition++;
                                    } catch (e) {
                                        console.log(e.message);
                                    }
                                }
                            }
                            activePath = Model.path;
                            dimensions.initialize();
                            self.apply();
//                            self.render();
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

            this.apply = function (discreet, value) {
                // apply is called on init, so we have to check whether args are passed in
                if (discreet && value) {
                    value.isSelected = !value.isSelected;
                    value.isSelected ? discreet.selected ++ : discreet.selected --;
                }

                // determines how many integers we need to store n bits, if n is number of items
                var BIT_SET_LENGTH = Math.ceil(dimensions.idMap.length / 32),
                    bitSet = [],
                    i;

                // each integer is first flattened into a single integer within each discreet category
                // by taking the union of all sets. Each of those flattened integers are
                for (i = 0; i < BIT_SET_LENGTH; i ++) {
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
            function Dimensions(collection) {
                var defaults = angular.extend({
                    title: "",
                    discreet: {},
                    range: {},
                    visibleIds: [],
                    idMap: []
                });

                angular.forEach(collection.dimensions.discreet, function (value, key) {
                    if (collection.fields.hasOwnProperty(value)) {
                        defaults.discreet[value] = collection.fields[value];
                    } else {
                        throw Error(value + " is not defined in collection")
                    }
                });

                angular.forEach(collection.dimensions.range, function (value, key) {
                    if (collection.fields.hasOwnProperty(value)) {
                        defaults.range[value] = collection.fields[value];
                    } else {
                        throw Error(value + " is not defined in collection")
                    }
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

            Dimensions.prototype.pushDiscreetId = function (attrID, idPosition, value) {
                // Only add if dimension already exists
                if (_.has(this.discreet, attrID)) {
                    var _discreet = this.discreet[attrID];
                    value = value || "Unknown";

                    if (_.has(_discreet.values, value)) {
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


//            Dimensions.prototype.apply = function (items) {
////                this.visibleIds = this._calcRangeVisible()._calcDiscreetVisible()._intersectVisible();
//                var BIT_SET_SIZE = Math.ceil(this.idMap / 32),
//                    bitIntersectedSet = [];
//
//                this._calcDiscreetVisible();
//
//                var prevBitIds = new Array(this.);
//
//                for (var discreetID in self.discreet) {
//                    if (this.discreet.hasOwnProperty(discreetID)) {
//                        var _discreet = this.discreet[discreetID];
//
//                        if (_discreet.visibleIds.length === 0) {
//                            continue;
//                        }
//                        intersectArray = _.intersection(intersectArray, _discreet.visibleIds);
//                    }
//                }
//
//                for (var i = BIT_SET_SIZE- 1; i >= 0; i--) {
//                    idBitSet1[i] & idBitSet2[i]
//                    bitIntersectedSet.push();
//                    var currentBitSet = bitIntersectedSet[i];
//                    for (var p = 0; p < 32; p++) {
//                        // index is (i * 32) + whatever bit number is flipped
//                        var itemIndex = (i * 32) + p;
//                        if (!!(1 & currentBitSet) && idMap[itemIndex]) {
//                            console.log("bitwise ", items[idMap[itemIndex]].id);
//                            items[idMap[itemIndex]].isVisible = !!(1 & currentBitSet);
//                        }
//
//                        currentBitSet = currentBitSet >> 1;
//                    }
//                }
//                return this;
//            };

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
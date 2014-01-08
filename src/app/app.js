/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 4:24 PM
 * File: /app/app.js
 */

if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () {
};
angular.module('roomba.app',
        [
            'ui.bootstrap',
            'rescour.config',
            'rescour.auth',
            'rescour.user',
            'rescour.utility',
//            'rescour.marketplace',
            'thotpod.spinner',
            'ui'
        ])
    .value('States', {
        "AL": "Alabama",
        "AK": "Alaska",
        "AS": "American Samoa",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FM": "Federated States Of Micronesia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MH": "Marshall Islands",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "MP": "Northern Mariana Islands",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PW": "Palau",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VI": "Virgin Islands",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    })
    .factory('Item', ['$_api', '$q', '$http', 'States', '$rootScope',

        function ($_api, $q, $http, States, $rootScope) {

            function ItemFactory(collection) {

                var Item = function (data, defaults) {
                    var _defaults = defaults || {
                            title: 'New ' + collection.title,
                            tags: [],
                            isVisible: true
                        },
                        opts = angular.extend({}, _defaults, data),
                        self = this;

                    angular.copy(opts, this);

                    if (collection.key === 'listings' || collection.key === 'contacts') {
                        self.raw = self.raw || {};
                        self.edited = self.edited || {};

                        angular.forEach(collection.fields, function (fieldConfig) {
                            var rawDefault = {
                                value: null,
                                status: null
                            };

                            // Initialize raw fields based off config
                            if (fieldConfig.fields) {
                                var _rawField = self.raw[fieldConfig.key] = self.raw[fieldConfig.key] || {} ,
                                    _editedField = self.edited[fieldConfig.key] = self.edited[fieldConfig.key] || {};

                                for (var i = 0; i < fieldConfig.fields.length; i++) {
                                    var subFieldConfig = fieldConfig.fields[i];
                                    _rawField[subFieldConfig.key] = _rawField[subFieldConfig.key] || rawDefault;
                                    _editedField[subFieldConfig.key] = _editedField[subFieldConfig.key] || (fieldConfig.placeholder || null);

                                    if (_rawField[subFieldConfig.key].status == 2) {
                                        self.isConflict = true;
                                    }

                                    // Initialize dates
                                    if (subFieldConfig.type === 'date') {
                                        _editedField[subFieldConfig.key] = _editedField[subFieldConfig.key] ? new Date(_editedField[subFieldConfig.key]) : null;
                                        _rawField[subFieldConfig.key].value = _rawField[subFieldConfig.key].value ? new Date(_rawField[subFieldConfig.key].value) : null;
                                    }
                                }
                            } else {
                                self.raw[fieldConfig.key] = self.raw[fieldConfig.key] || rawDefault;

                                // Initialize edited fields based off config, falling back to placeholders
                                self.edited[fieldConfig.key] = self.edited[fieldConfig.key] || (fieldConfig.placeholder || null);

                                if (self.raw[fieldConfig.key].status == 2 && fieldConfig.key !== 'page') {
                                    self.isConflict = true;
                                } else if (self.raw[fieldConfig.key].status == 3) {
                                    self.isRemoved = true;
                                }

                                // Initialize dates
                                if (fieldConfig.type === 'date') {
                                    if (Date.parse(self.edited[fieldConfig.key])) {
                                        self.edited[fieldConfig.key] = new Date(self.edited[fieldConfig.key]);
                                    } else {
                                        self.edited[fieldConfig.key] = self.edited[fieldConfig.key] ? new Date(parseInt(self.edited[fieldConfig.key], 10)) : null;
                                    }

                                    if (Date.parse(self.raw[fieldConfig.key].value)) {
                                        self.raw[fieldConfig.key].value = new Date(self.raw[fieldConfig.key].value);
                                    } else {
                                        self.raw[fieldConfig.key].value = self.raw[fieldConfig.key].value ? new Date(parseInt(self.raw[fieldConfig.key].value, 10)) : null;
                                    }

//                                    self.edited[fieldConfig.key] = self.edited[fieldConfig.key] ? new Date(self.edited[fieldConfig.key]) : null;
//                                    self.raw[fieldConfig.key].value = self.raw[fieldConfig.key].value ? new Date(self.raw[fieldConfig.key].value) : null;
                                }
                            }
                        });

                        angular.forEach(collection.models, function (modelConfig) {
                            // Initialize raw fields based off config
                            self.raw[modelConfig.key] = self.raw[modelConfig.key] || [];
                            self.edited[modelConfig.key] = self.edited[modelConfig.key] || [];

                            // For each raw model instance
                            for (var i = 0; i < self.raw[modelConfig.key].length; i++) {
                                var modelInstance = self.raw[modelConfig.key][i];

                                // instantiate fields based off config
                                for (var j = 0; j < modelConfig.fields.length; j++) {
                                    var modelFieldConfig = modelConfig.fields[j];
                                    modelInstance[modelFieldConfig.key] = modelInstance[modelFieldConfig.key] || {
                                        value: null,
                                        status: null
                                    }

                                    if (modelInstance[modelFieldConfig.key].status == 2 && modelConfig.key != 'pages') {
                                        self.isConflict = true;
                                    }

                                    if (modelFieldConfig.type === 'date') {
                                        modelInstance[modelFieldConfig.key].value = modelInstance[modelFieldConfig.key].value ? new Date(modelInstance[modelFieldConfig.key]) : null;
                                    }
                                }
                            }

                            // For each edited model instance
                            for (var i = 0; i < self.edited[modelConfig.key].length; i++) {
                                var modelInstance = self.edited[modelConfig.key][i];

                                // instantiate fields based off config
                                for (var j = 0; j < modelConfig.fields.length; j++) {
                                    var modelFieldConfig = modelConfig.fields[j];
                                    modelInstance[modelFieldConfig.key] = modelInstance[modelFieldConfig.key] || (modelFieldConfig.placeholder || "");

                                    if (modelFieldConfig.type === 'date') {
                                        modelInstance[modelFieldConfig.key] = modelInstance[modelFieldConfig.key] ? new Date(modelInstance[modelFieldConfig.key]) : null;
                                    }
                                }
                            }
                        });

                        angular.forEach(collection.dimensions.discrete, function (attr, attrID) {
                            // Initialize on root level for dimensional filtering
                            if (!attr.nested) {
                                if (self.hasOwnProperty(attrID)) {
                                    self[attrID] = self[attrID] || (self.edited[attrID] || (self.raw[attrID].value || (attr.placeholder || "")));
                                } else if (self.raw.hasOwnProperty(attrID)) {
                                    self[attrID] = self.edited[attrID] || (self.raw[attrID].value || (attr.placeholder || ""));
                                } else {
                                    throw new Error(attrID + " is not defined in $collection");
                                }
                            } else {
                                if (self.raw.hasOwnProperty(attr.nested)) {
                                    if (self.raw[attr.nested].hasOwnProperty(attrID)) {
                                        self[attrID] = self.edited[attr.nested][attrID] || (self.raw[attr.nested][attrID].value || (attr.placeholder || ""));
                                    } else {
                                        throw new Error(attr.nested + " has no property " + attrID);
                                    }
                                } else {
                                    throw new Error(attr.nested + " is not defined in $collection");
                                }
                            }

                        });

                        angular.forEach(collection.dimensions.range, function (attr, attrID) {
                            // Initialize on root level for dimensional filtering
                            self[attrID] = parseFloat(self.edited[attrID])
                                || parseFloat(self.raw[attrID].value);
                        });
                    } else {
                        angular.forEach(collection.fields, function (fieldConfig) {
                            // Initialize raw fields based off config
                            if (fieldConfig.fields) {
                                var _field = self[fieldConfig.key] = self[fieldConfig.key] || {};

                                for (var i = 0; i < fieldConfig.fields.length; i++) {
                                    var subFieldConfig = fieldConfig.fields[i];
                                    _field[subFieldConfig.key] = _field[subFieldConfig.key] || (fieldConfig.placeholder || null);

                                    // Initialize dates
                                    if (subFieldConfig.type === 'date') {
                                        _field[subFieldConfig.key] = _field[subFieldConfig.key] ? new Date(_field[subFieldConfig.key]) : null;
                                    }
                                }
                            } else {
                                self[fieldConfig.key] = self[fieldConfig.key] || (fieldConfig.placeholder || null);

                                // Initialize dates
                                if (fieldConfig.type === 'date') {
                                    self[fieldConfig.key] = self[fieldConfig.key] ? new Date(self[fieldConfig.key]) : null;
                                }
                            }
                        });

                        angular.forEach(collection.models, function (modelConfig) {
                            // Initialize raw fields based off config
                            self[modelConfig.key] = self[modelConfig.key] || [];
                        });

                        angular.forEach(collection.dimensions.discrete, function (attr, attrID) {
                            // Initialize on root level for dimensional filtering
                            if (!attr.nested) {
                                if (self.hasOwnProperty(attrID)) {
                                    self[attrID] = self[attrID] || (attr.placeholder || "");
                                } else {
                                    throw new Error(attrID + " is not defined in $collection");
                                }
                            } else {
                                if (self.hasOwnProperty(attr.nested)) {
                                    if (self[attr.nested].hasOwnProperty(attrID)) {
                                        self[attrID] = self[attr.nested][attrID] || (attr.placeholder || "");
                                    } else {
                                        throw new Error(attr.nested + " has no property " + attrID);
                                    }
                                } else {
                                    throw new Error(attr.nested + " is not defined in $collection");
                                }
                            }
                        });

                        angular.forEach(collection.dimensions.range, function (attr, attrID) {
                            self[attrID] = parseFloat(self[attrID]);
                        });
                    }

                    if (collection.key === 'listings') {
                        self.checkStateAbbreviation();
                        if (!this.edited.title) {
                            this.title = this.raw.title.value || 'Untitled';
                        } else {
                            this.title = this.edited.title;
                        }
                        self.prodId = self.prodId || null;
                    } else if (collection.key === 'contacts') {
                        if (!this.edited.name) {
                            this.title = this.raw.name.value || 'Unnamed';
                        } else {
                            this.title = this.edited.name;
                        }
                    } else if (collection.key === 'news') {
                        if (Date.parse(self.date)) {
                            self.age = Math.ceil(Math.abs(Date.now() - (new Date(self.date))) / (1000 * 3600 * 24));
                        } else {
                            self.age = self.date ? new Date(parseInt(this.date, 10)) : new Date(parseInt(this.id.toString().slice(0, 8), 16) * 1000);
                        }

                        self.checkStateAbbreviation();
                        self.checkSource();
                    }
                };

                Item.collection = collection;

                Item.dimensions = collection.dimensions;

                Item.path = collection.path;

                Item.query = function (tag) {
                    // if collection is undefined, just query
                    var items = [],
                        defer = $q.defer(),
                        config = angular.extend({
                            transformRequest: function (data) {
                                return data;
                            }
                        }, $_api.config),
                        batchLimit = 500;

                    (function batchItems(limit, offset) {
                        var path = tag ? $_api.path + Item.path + tag : $_api.path + Item.path + "?limit=" + limit + (offset ? "&offset=" + offset : "");

                        $http.get(path, config).then(function (response) {
                            items = items.concat(response.data);

                            if (response.data.length < limit) {
                                defer.resolve(items);
                            } else {
                                batchItems(limit, response.data[response.data.length - 1].id);
                            }
                        }, function (response) {
                            defer.reject(response);
                        });

                    })(batchLimit)

                    return defer.promise;
                };

                Item.prototype.$get = function () {
                    var self = this,
                        defer = $q.defer(),
                        config = angular.extend({
                            transformRequest: function (data) {
                                self.$spinner = true;
                                return data;
                            }
                        }, $_api.config);

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

                Item.prototype.$geocode = function () {

                    var defer = $q.defer(),
                        self = this,
                        geocoder = new google.maps.Geocoder(),
                        address = self.edited ? self.edited.address : self.address;

                    if (address.street1 && address.city && address.state) {
                        geocoder.geocode({
                            address: address.street1 + ',' + address.city + ',' + address.state
                        }, function (results, status) {
                            if (!$rootScope.$$phase) {
                                $rootScope.$apply(function () {
                                    if (results) {
                                        var _location = results[0].geometry.location;
                                        if (_location) {
                                            address.latitude = _location.lat();
                                            address.longitude = _location.lng();
                                            defer.resolve({status: "success"});
                                        } else {
                                            defer.reject({message: "Could not find location."});
                                        }
                                    } else {
                                        defer.resolve({message: status, status: 0});
                                    }
                                });
                            } else {
                                if (results) {
                                    var _location = results[0].geometry.location;
                                    if (_location) {
                                        address.latitude = _location.lat();
                                        address.longitude = _location.lng();
                                        defer.resolve({status: "success"});
                                    } else {
                                        defer.reject({message: "Could not find location."});
                                    }
                                } else {
                                    defer.resolve({message: status, status: 0});
                                }
                            }

                        });
                    } else {
                        defer.resolve({status: 0, message: "No address provided."})
                    }

                    return defer.promise;
                };

                Item.prototype.$getResources = function () {
                    var self = this,
                        promises = [],
                        config = angular.extend({
                            transformRequest: function (data) {
                                self.$spinner = true;
                                return data;
                            }
                        }, $_api.config);

                    for (var i = collection.resources.length - 1; i >= 0; i--) {
                        var _resource = collection.resources[i];

                        (function (resourceKey) {
                            var _defer = $q.defer(),
                                resourcePath = _resource.path;

                            if (self.resources[resourceKey]) {
                                $http.get($_api.path + Item.path + self.id + '/resources' + resourcePath, config).then(function (response) {
                                    self.$spinner = false;
                                    var _resources = {};
                                    _resources[resourceKey] = response.data;
                                    console.log(response);
                                    _defer.resolve(_resources);
                                }, function (response) {
                                    self.$spinner = false;
                                    _defer.reject(response);
                                });
                            }
                            promises.push(_defer.promise);
                        })(_resource.key);
                    }

                    return $q.all(promises);
                };

                Item.prototype.$saveResources = function (resources) {
                    var self = this,
                        promises = [],
                        config = angular.extend({
                            transformRequest: function (data) {
                                self.$spinner = true;
                                return data;
                            }
                        }, $_api.config);

                    self.resources = self.resources || {};

                    for (var i = 0; i < collection.resources.length; i++) {
                        var _resource = collection.resources[i],
                            _resourcePath = _resource.path;

                        for (var j = 0; j < resources[_resource.key].length; j++) {
                            var _resourceInstance = resources[_resource.key][j];
                            var _defer = $q.defer();
                            var body = angular.toJson(_resourceInstance);

                            // If its a new property it won't have resources
                            self.resources[_resource.key] = self.resources[_resource.key] || [];
                            if (!_resourceInstance.id) {
                                (function (defer, resourceKey, resourceInstance) {
                                    $http.post($_api.path + _resourcePath, body, config).then(function (response) {
                                        self.$spinner = false;
                                        var _id = response.data.id;
                                        resourceInstance.id = _id;
                                        self.resources[resourceKey].push(_id);
                                        defer.resolve(response.data.id);
                                    }, function (response) {
                                        self.$spinner = false;
                                        defer.reject();
                                    });

                                    promises.push(_defer.promise);
                                })(_defer, _resource.key, _resourceInstance);
                            } else {
                                (function (defer) {
                                    $http.put($_api.path + _resourcePath + _resourceInstance.id, body, config).then(function (response) {
                                        self.$spinner = false;
                                        defer.resolve();
                                    }, function (response) {
                                        self.$spinner = false;
                                        defer.reject();
                                    });

                                    promises.push(_defer.promise);
                                })(_defer);
                            }
                        }
                    }

                    return $q.all(promises);
                };

                Item.prototype.$update = function () {
                    var self = this,
                        defer = $q.defer(),
                        config = angular.extend({
                            transformRequest: function (data) {
                                self.$spinner = true;
                                return data;
                            }
                        }, $_api.config),
                        body = angular.toJson(self);

                    if (self.id) {
                        $http.put($_api.path + Item.path + self.id, body, config)
                            .then(function (response) {
                                self.$spinner = false;
                                defer.resolve(response);
                            }, function (response) {
                                self.$spinner = false;
                                defer.reject(response);
                            });
                    } else {
                        $http.post($_api.path + Item.path, body, config)
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

                Item.prototype.$updateTags = function () {
                    var self = this,
                        defer = $q.defer(),
                        config = angular.extend({
                            transformRequest: function (data) {
                                self.$spinner = true;
                                return data;
                            }
                        }, $_api.config),
                        body = angular.toJson({tags: self.tags});

                    $http.put($_api.path + Item.path + self.id, body, config)
                        .then(function (response) {
                            self.$spinner = false;
                            defer.resolve(response);
                        }, function (response) {
                            self.$spinner = false;
                            defer.reject(response);
                        });

                    return defer.promise;
                };

                Item.prototype.$delete = function () {
                    var self = this,
                        defer = $q.defer(),
                        config = angular.extend({
                            transformRequest: function (data) {
                                self.$spinner = true;
                                return data;
                            }
                        }, $_api.config);

                    $http.delete($_api.path + Item.path + self.id, config)
                        .then(function (response) {
                            self.$spinner = false;
                            defer.resolve(response);
                        }, function (response) {
                            self.$spinner = false;
                            defer.reject(response);
                        });

                    return defer.promise;
                }

                Item.prototype.$save = function () {
                    this.tags = _.without(this.tags, 'edited', 'raw');
                    this.tags.push('edited');

                    return this.$update();
                };

                Item.prototype.$publish = function () {
                    this.tags = _.without(this.tags, 'published', 'unpublished');
                    this.tags.push('published');

                    return this.$updateTags();
                };

                Item.prototype.$unpublish = function () {
                    this.tags = _.without(this.tags, 'published', 'unpublished');
                    this.tags.push('unpublished');

                    return this.$updateTags();
                };

                Item.prototype.$flag = function () {
                    if (_.contains(this.tags, 'flagged')) {
                        this.tags = _.without(this.tags, 'flagged');
                    } else {
                        this.tags.push('flagged');
                    }

                    return this.$updateTags();
                };

                Item.prototype.$join = function (selectedItem) {
                    var defer = $q.defer();

                    function isNull(obj) {
                        var _isNull = true;
                        (function recursive(obj) {
                            if (angular.isObject(obj)) {
                                angular.forEach(obj, function (value) {
                                    recursive(value);
                                });
                            } else if (obj != null && obj != '' && !angular.isArray(obj) && !angular.isObject(obj)) {
                                _isNull = false;
                                return;
                            }
                        })(obj);
                        return _isNull;
                    }

                    if (!selectedItem) {
                        throw new Error("No Item to join with");
                    }

                    var _oldItem = null,
                        _newItem = null;

                    if (isNull(this.raw) && isNull(selectedItem.edited)) {
                        _oldItem = this;
                        _newItem = selectedItem;
                    } else if (isNull(this.edited) && isNull(selectedItem.raw)) {
                        _oldItem = selectedItem;
                        _newItem = this;
                    }

                    if (_oldItem && _newItem) {
                        _newItem.edited = _oldItem.edited;
                        _newItem.resources = _oldItem.resources;
                        _newItem.prodId = _oldItem.prodId;

                        _newItem.$save()
                            .then(function (response) {
                                return _oldItem.$delete();
                            },function (response) {
                                defer.reject(response);
                            }).then(function (response) {
                                defer.resolve(_oldItem);
                            }, function (response) {
                                defer.reject(response);
                            });

                        // Save _newItem, delete _old
                    } else {
                        console.log("Old: ", _oldItem, this);
                        console.log("New: ", _newItem, selectedItem);
                        defer.reject({
                            message: 'Items are not compatible to join'
                        });
                    }

                    return defer.promise;
                };

                Item.prototype.calcFillPercent = function () {
                    var self = this,
                        _edited = self.edited,
                        _raw = self.raw,
                        hasEdited = false,
                        fieldCounter = {
                            total: 0,
                            filled: 0
                        };

                    if (_edited && _raw) {
                        // Check edited first
                        angular.forEach(_edited, function (editedField) {
                            if (angular.isArray(editedField)) {
                                angular.forEach(editedField, function (editedModel) {
                                    angular.forEach(editedModel, function (editedModelField) {
                                        if (editedModelField) {
                                            hasEdited = true;
                                            fieldCounter.filled++;
                                        }
                                        fieldCounter.total++;
                                    });
                                });
                            } else if (angular.isObject(editedField)) {
                                // Address field or embedded object
                                angular.forEach(editedField, function (editedSubField) {
                                    if (editedSubField) {
                                        hasEdited = true;
                                        fieldCounter.filled++;
                                    }
                                    fieldCounter.total++;
                                });
                            } else {
                                if (editedField) {
                                    hasEdited = true;
                                    fieldCounter.filled++;
                                }
                                fieldCounter.total++;
                            }
                        });

                        // If no edited calculate based off raw data
                        if (!hasEdited) {
                            fieldCounter.total = 0;
                            fieldCounter.filled = 0;

                            angular.forEach(_raw, function (rawField, key) {
                                if (rawField.hasOwnProperty('value') && rawField.hasOwnProperty('status')) {
                                    if (rawField.value) {
                                        fieldCounter.filled++;
                                    }
                                    fieldCounter.total++;
                                } else if (angular.isArray(rawField)) {
                                    angular.forEach(rawField, function (rawModel) {
                                        angular.forEach(rawModel, function (rawModelField, key) {
                                            if (rawModelField.value) {
                                                fieldCounter.filled++;
                                            }
                                            fieldCounter.total++;
                                        });
                                    });
                                } else if (angular.isObject(rawField)) {
                                    angular.forEach(rawField, function (rawSubField, key) {
                                        if (rawSubField.value) {
                                            fieldCounter.filled++;
                                        }
                                        fieldCounter.total++;
                                    });
                                } else {
                                    throw new Error("Raw field is not in recognized format");
                                }
                            });
                            self.progressClass = self.isRemoved ? "progress-bar-danger" : self.isConflict ? "progress-bar-warning" : "progress-bar-success";
                        } else {
                            self.progressClass = self.isRemoved ? "progress-bar-danger" : self.isConflict ? "progress-bar-warning" : "progress-bar-info";
                        }
                    } else {
                        fieldCounter.total = 0;
                        fieldCounter.filled = 0;

                        angular.forEach(collection.fields, function (fieldConfig) {
                            if (fieldConfig.fields) {
                                angular.forEach(fieldConfig.fields, function (subFieldConfig) {
                                    if (self[fieldConfig.key][subFieldConfig.key]) {
                                        fieldCounter.filled++;
                                    }
                                    fieldCounter.total++;
                                });
                            } else {
                                if (self[fieldConfig.key]) {
                                    fieldCounter.filled++;
                                }
                                fieldCounter.total++;
                            }
                        });

                        self.progressClass = "";
                    }

                    this.completion = parseInt((fieldCounter.filled / fieldCounter.total) * 100, 10);
                    return this.completion + "%";
                };

                Item.prototype.checkStateAbbreviation = function () {
                    if (this.address) {
                        var state = this.address.state ? (this.address.state).replace(/\s+/g, '').toUpperCase() : null;
                        if (States.hasOwnProperty(state)) {
                            this.address.state = States[state];
                        }
                    } else if (this.hasOwnProperty('raw')) {
                        if (this.raw.address.state.value) {
                            var state = this.raw.address.state.value ? (this.raw.address.state.value).replace(/\s+/g, '').toUpperCase() : null;
                            if (States.hasOwnProperty(state)) {
                                this.raw.address.state.value = States[state];
                            }
                        }
                    }
                };

                Item.prototype.checkSource = function () {
                    var sources = {
                        'www.bizjournals.com': 'The Business Journals',
                        'www.rebusinessonline.com': 'REBusiness Online',
                        'www.globest.com': 'GlobeSt.com',
                        'www.multifamilybiz.com': 'MultifamilyBiz.com',
                        'www.multihousingnews.com': 'Multi-Housing News'
                    };

                    if (this.url) {
                        var sourceUrl = this.url.split(/^http:\/\//)[1];
                        if (sourceUrl) {
                            this.source = sources[sourceUrl.split(/\//)[0]] || '';
                        } else {
                            this.source = sources[this.url.split(/\//)[0]] || '';
                        }
                    };
                };

                Item.prototype.hasPageConflict = function () {
                    if (this.raw) {
                        if (this.raw.page) {
                            return this.raw.page.status == 2;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }

                }

                return Item;
            }

            return ItemFactory;
        }])
    .config(['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.withCredentials = true;
            $locationProvider.html5Mode(true);

            $routeProvider.when('/',
                {
                    redirectTo: '/market/'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }])
    .controller("AppController", ['$scope', '$rootScope', '$location', '$_api', '$http',
        function ($scope, $rootScope, $location, $_api, $http) {

            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                $scope.loading = true;
                $scope.failure = false;
            });
            $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
                $scope.loading = false;
                $scope.failure = false;
            });
            $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
                $scope.loading = false;
                $scope.failure = true;
            });

            $scope.globalAlerts = [];

            $scope.setGlobalAlert = function (alert) {
                if (angular.isArray(alert)) {
                    $scope.globalAlerts = alert;
                } else {
                    $scope.globalAlerts = [alert];
                }
            };

            $scope.addGlobalAlert = function (alert) {
                $scope.globalAlerts.push(alert);
            };

            $scope.closeGlobalAlert = function (alert) {
                $scope.globalAlerts = _.reject($scope.globalAlerts, function (val) {
                    return angular.equals(alert, val);
                });
            };

            $scope.clearGlobalAlerts = function () {
                $scope.globalAlerts = [];
            };

        }]);



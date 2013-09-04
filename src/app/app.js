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
            'rescour.marketplace',
            'thotpod.spinner',
            'ui'
        ])
    .value('$collections', {
        listings: {
            title: 'Listings',
            tags: ['raw', 'edited', 'published'],
            path: '/listings/',
            dimensions: {
                discreet: {
                    broker: {
                        title: 'Broker',
                        weight: 10
                    },
                    propertyStatus: {
                        title: 'Property Status',
                        weight: 5
                    },
                    state: {
                        title: 'State',
                        nested: 'address',
                        weight: 5
                    }
                },
                range: {}
            },
            fields: [
                {
                    title: 'Title',
                    weight: 5000,
                    key: 'title',
                    type: 'text'
                },
                {
                    title: 'Description',
                    weight: 8,
                    key: 'description',
                    type: 'textarea'
                },
                {
                    title: 'Broker',
                    weight: 10,
                    key: 'broker'
                },
                {
                    title: '# Units',
                    weight: 10,
                    key: 'numUnits'
                },
                {
                    title: 'State',
                    weight: 9,
                    key: 'state'
                },
                {
                    title: 'Flyer',
                    weight: 9,
                    key: 'flyer'
                },
                {
                    title: 'Status',
                    weight: 9,
                    key: 'status'
                },
                {
                    title: 'Acres',
                    weight: 9,
                    key: 'acres'
                },
                {
                    title: 'Call For Offers',
                    weight: 9,
                    key: 'callForOffers',
                    type: 'date'
                },
                {
                    title: 'Property Status',
                    weight: 9,
                    key: 'propertyStatus',
                    type: 'typeahead',
                    typeahead: ['Marketing', 'Under Contract']
                },
                {
                    title: 'Address',
                    weight: 0,
                    key: 'address',
                    fields: [
                        {
                            title: 'Street 1',
                            key: 'street1'
                        },
                        {
                            title: 'Street 2',
                            key: 'street2'
                        },
                        {
                            title: 'City',
                            key: 'city'
                        },
                        {
                            title: 'State',
                            key: 'state'
                        },
                        {
                            title: 'Zip',
                            key: 'zip'
                        }
                    ]
                }
            ],
            models: [
                {
                    title: 'Unit Mix',
                    key: 'unitMix',
                    weight: 100,
                    fields: [
                        {
                            key: 'type',
                            title: 'Type',
                            type: 'typeahead',
                            typeahead: [
                                '1 BR / 1 BA', '1 BR / 1.5 BA', '2 BR / 1 BA', '2 BR / 1.5 BA', '2 BR / 2 BA', '3 BR / 2 BA', '3 BR / 2.5 BA', '3 BR / 3 BA', '4 BR / 2 BA', '4 BR / 2.5 BA', '4 BR / 3 BA',
                                '1 BR / 1 BA S', '1 BR / 1.5 BA S', '2 BR / 1 BA S', '2 BR / 1.5 BA S', '2 BR / 2 BA S', '3 BR / 2 BA S', '3 BR / 2.5 BA S', '3 BR / 3 BA S', '4 BR / 2 BA S', '4 BR / 2.5 BA S', '4 BR / 3 BA S',
                                'AVERAGE', 'Studio'
                            ]
                        },
                        {
                            key: 'units',
                            title: 'Units'
                        },
                        {
                            key: 'sqft',
                            title: 'Sq Ft'
                        },
                        {
                            key: 'rent',
                            title: 'Rent'
                        },
                        {
                            key: 'rentpsqft',
                            title: 'Rent / Sqft'
                        }
                    ]
                },
                {
                    title: 'Pages',
                    key: 'pages',
                    weight: 5000,
                    fields: [
                        {
                            key: 'url',
                            title: 'URL'
                        }
                    ]
                },
                {
                    title: 'Tour Dates',
                    key: 'tourDates',
                    weight: 10,
                    fields: [
                        {
                            key: 'date',
                            title: 'Date',
                            type: 'date'
                        }
                    ]
                },
                {
                    title: 'Portfolio',
                    key: 'portfolio',
                    weight: 10,
                    fields: [
                        {
                            key: 'title',
                            title: 'Title'
                        }
                    ]
                },
                {
                    title: 'Comps',
                    weight: 9,
                    key: 'comps',
                    fields: [
                        {
                            key: 'link',
                            title: 'Link'
                        },
                        {
                            key: 'title',
                            title: 'Title'
                        },
                        {
                            key: 'buyer',
                            title: 'Buyer'
                        },
                        {
                            key: 'seller',
                            title: 'Seller'
                        },
                        {
                            key: 'price',
                            title: 'Price'
                        },
                        {
                            key: 'body',
                            title: 'Body'
                        }
                    ]
                }
            ],
            resources: [
                {
                    title: 'Contacts',
                    key: 'contacts',
                    path: '/contacts/',
                    fields: [
                        {
                            key: 'name',
                            title: 'Name'
                        },
                        {
                            key: 'email',
                            title: 'Email'
                        },
                        {
                            key: 'phone',
                            title: 'Phone'
                        }
                    ]
                },
                {
                    title: 'Images',
                    path: '/images/',
                    key: 'images',
                    fields: [
                        {
                            key: 'url',
                            title: 'URL'
                        }
                    ]
                }
            ]
        }
    })
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
    .factory('Item', ['$_api', '$q', '$http', 'States',
        function ($_api, $q, $http, States) {

            function ItemFactory(collection) {

                var Item = function (data, defaults) {
                    var _defaults = defaults || {
                            isVisible: true
                        },
                        opts = angular.extend({}, _defaults, data),
                        self = this;

                    angular.copy(opts, this);

                    if (!this.edited.title) {
                        this.title = this.raw.title.value || 'Untitled';
                    } else {
                        this.title = this.edited.title;
                    }

                    self.checkStateAbbreviation();

                    if (collection) {
                        angular.forEach(collection.fields, function (fieldConfig) {
                            var rawDefault = {
                                value: null,
                                status: null
                            };

                            self.raw[fieldConfig.key] = self.raw[fieldConfig.key] || rawDefault;

                            // Initialize edited fields based off config, falling back to placeholders
                            self.edited[fieldConfig.key] = self.edited[fieldConfig.key] || (fieldConfig.placeholder || null);

                            // Initialize dates
                            if (fieldConfig.type === 'date') {
                                self.edited[fieldConfig.key] = self.edited[fieldConfig.key] ? new Date(self.edited[fieldConfig.key]) : null;
                                self.raw[fieldConfig.key].value = self.raw[fieldConfig.key].value ? new Date(self.raw[fieldConfig.key].value) : null;
                            }

                            // Initialize raw fields based off config
                            if (fieldConfig.fields) {
                                var _rawField = self.raw[fieldConfig.key],
                                    _editedField = self.edited[fieldConfig.key] = self.edited[fieldConfig.key] || {};

                                for (var i = 0; i < fieldConfig.fields.length; i++) {
                                    var subFieldConfig = fieldConfig.fields[i];
                                    _rawField[subFieldConfig.key] = _rawField[subFieldConfig.key] || rawDefault;
                                    _editedField[subFieldConfig.key] = _editedField[subFieldConfig.key] || (fieldConfig.placeholder || null);
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
                                }
                            }

                            // For each edited model instance
                            for (var i = 0; i < self.edited[modelConfig.key].length; i++) {
                                var modelInstance = self.edited[modelConfig.key][i];

                                // instantiate fields based off config
                                for (var j = 0; j < modelConfig.fields.length; j++) {
                                    var modelFieldConfig = modelConfig.fields[j];
                                    modelInstance[modelFieldConfig.key] = modelInstance[modelFieldConfig.key] || (modelFieldConfig.placeholder || "");
                                }
                            }
                        });

                        angular.forEach(collection.dimensions.discreet, function (attr, attrID) {
                            // Initialize on root level for dimensional filtering
                            if (!attr.nested) {
                                if (self.raw.hasOwnProperty(attrID)) {
                                    self[attrID] = self.edited[attrID] || (self.raw[attrID].value || (attr.placeholder || ""));
                                } else {
                                    throw new Error (attrID + " is not defined in $collection");
                                }
                            } else {
                                if (self.raw.hasOwnProperty(attr.nested)) {
                                    if (self.raw[attr.nested].hasOwnProperty(attrID)) {
                                        self[attrID] = self.edited[attr.nested][attrID] || (self.raw[attr.nested][attrID].value || (attr.placeholder || ""));
                                    } else {
                                        throw new Error (attr.nested + " has no property " + attrID);
                                    }
                                } else {
                                    throw new Error (attr.nested + " is not defined in $collection");
                                }
                            }

                        });

                        angular.forEach(collection.dimensions.range, function (attr, attrID) {
                            // Initialize on root level for dimensional filtering
                            self[attrID] = self.edited[attrID] || (self.raw[attrID].value || (attr.placeholder || ""));
                        });
                    }
                };

                Item.collection = collection;

                Item.dimensions = collection.dimensions;

                Item.path = collection.path;

                Item.query = function (tag) {
                    // if collection is undefined, just query
                    var defer = $q.defer(),
                        config = angular.extend({
                            transformRequest: function (data) {
                                return data;
                            }
                        }, $_api.config),
                        path = tag ? $_api.path + Item.path + tag : $_api.path + Item.path;

                    path += "/?limit=5000";

                    $http.get(path, config).then(function (response) {
                        defer.resolve(response);
                    }, function (response) {
                        defer.reject(response);
                    });

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

                    for (var i = 0; i < collection.resources.length; i++) {
                        var _resource = collection.resources[i],
                            _resourcePath = _resource.path;

                        for (var i = 0; i < resources[_resource.key].length; i++) {
                            var _resourceInstance = resources[_resource.key][i];
                            var _defer = $q.defer();
                            var body = angular.toJson(_resourceInstance);

                            if (!_resourceInstance.id) {
                                (function (defer, resourceKey) {
                                    $http.post($_api.path + _resourcePath, body, config).then(function (response) {
                                        self.$spinner = false;
                                        var _id = response.data.id;
                                        self.resources[resourceKey].push(_id);
                                        defer.resolve(response.data.id);
                                    }, function (response) {
                                        self.$spinner = false;
                                        defer.reject();
                                    });

                                    promises.push(_defer.promise);
                                })(_defer, _resource.key);
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

                Item.prototype.$save = function () {
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

                Item.prototype.calcFillPercent = function () {
                    var self = this,
                        _edited = self.edited,
                        _raw = self.raw,
                        hasEdited = false,
                        fieldCounter = {
                            total: 0,
                            filled: 0
                        };

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
                        self.progressClass = "";
                    } else {
                        self.progressClass = "progress-bar-success";

                    }

                    return parseInt((fieldCounter.filled / fieldCounter.total) * 100, 10) + "%";
                };

                Item.prototype.checkStateAbbreviation = function () {
                    if (this.raw.address.state.value) {
                        var state = (this.raw.address.state.value).replace(/\s+/g, '').toUpperCase();
                        if (States.hasOwnProperty(state)) {
                            this.raw.address.state.value = States[state];
                        }
                    }

                    return this.raw.address.state.value;
                };

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
        }]);



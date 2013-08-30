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
            'thotpod.spinner'
        ])
    .value('$collections', {
        listings: {
            title: 'Listings',
            tags: ['raw', 'staged', 'published'],
            path: '/listings/',
            dimensions: {
                discreet: {
                    broker: {
                        title: 'Broker',
                        weight: 10
                    },
                    state: {
                        title: 'State',
                        weight: 5
                    }
                },
                range: []
            },
            fields: [
                {
                    title: 'Title',
                    weight: 5000,
                    key: 'title'
                },
                {
                    title: 'Description',
                    weight: 8,
                    key: 'description'
                },
                {
                    title: 'Broker',
                    weight: 10,
                    key: 'broker'
                },
                {
                    title: 'State',
                    weight: 9,
                    key: 'state'
                },
                {
                    title: 'Acres',
                    weight: 9,
                    key: 'acres'
                },
                {
                    title: 'Comps',
                    weight: 9,
                    key: 'comps'
                },
                {
                    title: 'Call For Offers',
                    weight: 9,
                    key: 'callForOffers'
                }
            ],
            resources: {
                contacts: {
                    title: 'Contacts',
                    path: '/contacts/',
                    fields: {
                        name: {
                            title: 'Name'
                        },
                        email: {
                            title: 'Email'
                        },
                        phone: {
                            title: 'Phone'
                        }
                    }
                },
                images: {
                    title: 'Images',
                    path: '/images/',
                    fields: {
                        url: {
                            title: 'URL'
                        }
                    }
                }
            },
            models: {
                unitMix: {
                    title: 'Unit Mix',
                    fields: {
                        type: {
                            title: 'Type'
                        },
                        units: {
                            title: 'Units'
                        },
                        sqft: {
                            title: 'Sq Ft'
                        },
                        rent: {
                            title: 'Rent'
                        },
                        rentpsqft: {
                            title: 'Rent / Sq Ft'
                        }
                    }
                }
            }
        }
    })
    .factory('Item', ['$_api', '$q', '$http',
        function ($_api, $q, $http) {

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

                    if (collection) {
                        angular.forEach(collection.fields, function (value, key) {
                            // Initialize raw fields based off config
                            self.raw[value.key] = self.raw[value.key] || {
                                value: null,
                                status: null
                            };

                            // Initialize edited fields based off config, falling back to placeholders
                            self.edited[value.key] = self.edited[value.key] || (value.placeholder || null);
                        });

                        angular.forEach(collection.dimensions.discreet, function (attr, attrID) {
                            // Initialize on root level for dimensional filtering
                            self[attrID] = self.edited[attrID] || (self.raw[attrID].value || (attr.placeholder || ""));
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

                    console.log(self.resources);

                    for (var _resource in collection.resources) {
                        if (collection.resources.hasOwnProperty(_resource)) {

                            (function (resource) {
                                var _defer = $q.defer(),
                                    resourcePath = collection.resources[resource].path;

                                if (self.resources[_resource]) {
                                    $http.get($_api.path + Item.path + self.id + '/resources' + resourcePath, config).then(function (response) {
                                        self.$spinner = false;
                                        var _resources = {};
                                        _resources[resource] = response.data;
                                        _defer.resolve(_resources);
                                    }, function (response) {
                                        self.$spinner = false;
                                        _defer.reject(response);
                                    });
                                }
                                promises.push(_defer.promise);
                            })(_resource);
                        }
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

                    // NO ONE WILL EVER UNDERSTAND THIS
                    // DON'T EVEN TRY
                    for (var _resource in collection.resources) {
                        if (collection.resources.hasOwnProperty(_resource)) {
                            var _resourcePath = collection.resources[_resource].path;

                            for (var i = 0; i < resources[_resource].length; i++) {
                                var _resourceInstance = resources[_resource][i];
                                var _defer = $q.defer();
                                var body = JSON.stringify(_resourceInstance);

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
                                    })(_defer, _resource);
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
                        body = JSON.stringify(self);

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
                return Item;
            }

            return ItemFactory;
        }])
    .
    config(['$routeProvider', '$locationProvider', '$httpProvider',
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



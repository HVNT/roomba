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
            'rescour.marketplace'
        ])
    .value('$collections', {
        listings: {
            title: 'Listings',
            tags: ['raw', 'staged', 'published'],
            path: '/listings/',
            dimensions: {
                discreet: ['broker', 'state'],
                range: []
            },
            fields: {
                title: {
                    title: 'Title',
                    weight: 5000
                },
                description: {
                    title: 'Description',
                    weight: 8
                },
                broker: {
                    title: 'Broker',
                    weight: 10
                },
                state: {
                    title: 'State',
                    weight: 9
                }
            },
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
        },
        articles: {
            title: 'Articles',
            tags: ['raw', 'staged', 'published'],
            path: '/articles/',
            dimensions: {
                discreet: ['state'],
                range: []
            },
            fields: {
                title: {
                    title: 'Title',
                    weight: 5000
                },
                description: {
                    title: 'Description',
                    weight: 8
                },
                state: {
                    title: 'State',
                    weight: 9
                }
            },
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
                            title: 'Untitled',
                            description: 'No description provided.',
                            thumbnail: 'http://placehold.it/100x100',
                            hidden: false,
                            isVisible: true,
                            dimensions: {
                                discreet: {},
                                range: {}
                            }
                        },
                        opts = angular.extend({}, _defaults, data),
                        self = this;

                    angular.copy(opts, this);

                    if (collection) {
                        angular.forEach(collection.fields, function (value, key) {
                            self[key] = self[key] || (value.placeholder || "");
                        });

                        angular.forEach(collection.dimensions.discreet, function (val) {
                            if (self.edited) {
                                self.dimensions.discreet[val] = self.edited[val];
                            }
                        });

                        angular.forEach(collection.dimensions.range, function (val) {
                            if (self.edited) {
                                self.dimensions.range[val] = self.edited[val];
                            }
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

                    console.log($_api.path + Item.path);

                    $http.get($_api.path + Item.path, config).then(function (response) {
                        console.log(Item.path);
                        console.log(response);
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

                Item.prototype.$getResources = function () {
                    var self = this,
                        promises = [],
                        config = angular.extend({
                            transformRequest: function (data) {
                                self.$spinner = true;
                                return data;
                            }
                        });

                    for (var _resource in collection.resources) {
                        if (collection.resources.hasOwnProperty(_resource)) {
                            var _defer = $q.defer(),
                                resourcePath = collection.resources[_resource].path;

                            $http.get($_api.path + Item.path + '/' + this.id + '/resources' + resourcePath, config).then(function (response) {
                                angular.extend(self, {}, response.data);
                                self.$spinner = false;
                                console.log(response);
                                _defer.resolve(response);

                            }, function (response) {
                                self.$spinner = false;
                                _defer.reject(response);
                            });
                        }

                        promises.push(_defer.promise);
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



/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 3:58 PM
 * File: user.js
 */
angular.module('rescour.user', ['ngCookies'])
    .service('User', ['$http', '$q', '$_api',
        function ($http, $q, $_api) {
            this.profile = {};
            this.billing = {};

            this.get = function () {
                var defer = $q.defer(),
                    self = this,
                    path = $_api.path + '/auth/user/',
                    config = angular.extend({
                    }, $_api.config);

                $http.get(path, config).then(
                    function (response) {
                        self.id = response.data[0].id;
                        angular.copy(response.data[0], self.profile);
                        defer.resolve(self);
                    },
                    function (response) {
                        defer.reject(response);
                    }
                );

                return defer.promise;
            };

            this.saveProfile = function () {
                var defer = $q.defer(),
                    self = this,
                    path = $_api.path + '/auth/user/' + self.id,
                    config = angular.extend({
                        transformRequest: function (data) {
                            return data;
                        }
                    }, $_api.config),
                    body = JSON.stringify(this.profile);

                if (this.id) {
                    $http.put(path, body, config).then(
                        function (response) {
                            defer.resolve(response);
                        },
                        function (response) {
                            self.getProfile();
                            throw new Error("Error updating profile");
                            defer.reject(response);
                        }
                    );
                } else {
                    throw new Error("Could not save profile, id not specified");
                }

                return defer.promise;
            };

            this.addStripe = function (tok) {
                var defer = $q.defer(),
                    self = this,
                    path = $_api.path + '/auth/user/' + self.id + '/payment/',
                    config = angular.extend({
                        transformRequest: function (data) {
                            return data;
                        }
                    }, $_api.config),
                    body = JSON.stringify({
                        card: tok,
                        plan: 'one_license',
                        description: 'One Seat License'
                    });

                $http.put(path, body, config).then(
                    function (response) {
                        defer.resolve(response);
                    },
                    function (response) {
                        defer.reject(response);
                    }
                );

                return defer.promise;
            }

            this.getBilling = function () {
                var defer = $q.defer(),
                    self = this,
                    path = $_api.path + '/auth/user/' + self.id + '/payment/',
                    config = angular.extend({
                        transformRequest: function (data) {
                            return data;
                        }
                    }, $_api.config);

                $http.get(path, config).then(
                    function (response) {
                        angular.copy(response.data, self.billing);
                        defer.resolve(response);
                    },
                    function (response) {
                        defer.reject(response);
                    }
                );

                return defer.promise;
            };

            this.cancelSubscription = function (reason, transformFn) {
                var defer = $q.defer(),
                    path = $_api.path + '/email/',
                    config = angular.extend({
                        transformRequest: transformFn
                    }, $_api.config),
                    body = JSON.stringify({
                        text: reason
                    });

                $http.post(path, body, config).then(
                    function (response) {
                        defer.resolve(response);
                    },
                    function (response) {
                        defer.reject(response);
                    }
                );
                return defer.promise;
            };
        }])
    .service('Users', ['$q', '$http', '$_api',
        function ($q, $http, $_api) {
            this.users = null;

            this.init = function () {
                var self = this,
                    defer = $q.defer();

                this.users = {};

                this.fetch().then(function (users) {
                    for (var i = users.length - 1; i >= 0; i--) {
                        var user = users[i];
                        self.users[user.id] = {
                            name: user.firstName + ' ' + user.lastName,
                            listings: {
                                count: 0,
                                lastActivity: null
                            },
                            news: {
                                count: 0,
                                lastActivity: null
                            }
                        }
                    }
                    defer.resolve(self.users);
                });

                return defer.promise;
            };

            this.generateStats = function (key, models) {
                var self = this;
                for (var i = models.length - 1; i >= 0; i--) {
                    var model = models[i],
                        user = self.users[model._updatedBy],
                        lastUpdated = model._updatedTs;

                    if (user) {
                        user[key].count += 1;
                        if (lastUpdated > user[key].lastActivity) {
                            user[key].lastActivity = lastUpdated;
                        }
                    } else {
                        continue;
                    }
                }

                return self.users;
            };

            // Gets users, create mapping
            this.fetch = function () {
                var items = [],
                    defer = $q.defer(),
                    config = angular.extend({
                        transformRequest: function (data) {
                            return data;
                        }
                    }, $_api.config),
                    batchLimit = 500,
                    rootPath = $_api.path + '/auth/users/';

                (function batchItems(limit, offset) {
                    var path = rootPath + "?limit=" + limit + (offset ? "&offset=" + offset : "");

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
            }

        }]);

/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 3:58 PM
 * File: user.js
 */
angular.module('rescour.services')
    .service('User', function ($http, $q, Environment) {
        this.profile = {};
        this.billing = {};
        this.customFieldDimensions = [];

        this.get = function () {
            var defer = $q.defer(),
                self = this,
                path = Environment.path + '/auth/user/',
                config = _.extend({
                }, Environment.config);

            console.log("hello");
            $http.get(path, config).then(
                function (response) {
                    defer.resolve(response);
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
                path = Environment.path + '/auth/user/' + self.id,
                config = _.extend({}, Environment.config),
                body = JSON.stringify({
                    firstName: self.profile.firstName,
                    lastName: self.profile.lastName,
                    email: self.profile.email,
                    company: self.profile.company,
                    phone: self.profile.phone
                });

            if (this.id) {
                $http.put(path, body, config).then(
                    function (response) {
                        defer.resolve(response);
                    },
                    function (response) {
                        self.get();
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
                path = Environment.path + '/auth/user/' + self.id + '/payment/',
                config = _.extend({}, Environment.config),
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
                path = Environment.path + '/auth/user/' + self.id + '/payment/',
                config = _.extend({}, Environment.config);

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

        this.changePassword = function (creds) {
            var defer = $q.defer(),
                self = this,
                path = Environment.path + '/auth/user/' + self.id + '/password/',
                config = _.extend({}, Environment.config),
                body = JSON.stringify(creds);

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

        this.login = function (creds) {
            var defer = $q.defer(),
                self = this,
                path = Environment.path + '/auth/login/',
                config = _.extend({}, Environment.config),
                body = JSON.stringify(creds);

            $http.post(path, body, config).then(
                function (response) {
                    defer.resolve(response);
                },
                function (response) {
                    defer.reject(response);
                }
            );

            return defer.promise;
        }
    });

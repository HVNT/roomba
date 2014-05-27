/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/13/14
 * Time: 10:54 AM
 * File:
 */


angular.module('rescour.mock', ['rescour.roomba', 'ngMockE2E'])
    .run(function ($httpBackend, $http, $timeout, $log, Utilities) {

        var MDU_LISTINGS_COUNT = 20,
            MDU_COUNT = 1,
            MDU_CONFIG,
            mockMDUListings,
            matchMdus;
        var fakeUser = {
            company: 'Fake Company',
            email: 'bob@fakecompany.com',
            firstName: 'Robert',
            lastName: 'Frost',
            phone: '123-456-6754',
            username: 'bob@fakecompany.com',
            roles: ['staff'],
            id: '1'
        };

        $http.get('/app/config/market.json').then(function (response) {
            MDU_CONFIG = response.data;
            initialize();
        }, function (response) {
            console.log(response);
        });

        function initialize() {
            console.log("Booting this shit up...");
            mockMDUListings = [];
            matchMdus = [];
            for (var j = 0; j < MDU_LISTINGS_COUNT; j++) {
                var mduListing = {
                    mdus: []
                };
                var mduIndex = 0,
                    mdu = {},
                    matchMdu = {};
                angular.forEach(MDU_CONFIG.mdu_listings.fields, function (field) {
                    var mduKey = null;
                    if (field.mock) {
                        switch (field.mock) {
                            case('text-sml'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = Utilities.generateString(1);
                                    matchMdu[mduKey] = Utilities.generateString(1);
                                } else {
                                    mduListing[field.key] = Utilities.generateString(1);
                                }
                                break;
                            case('text-med'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = Utilities.generateString(3);
                                    matchMdu[mduKey] = Utilities.generateString(3);
                                } else {
                                    mduListing[field.key] = Utilities.generateString(3);
                                }
                                break;
                            case('text-lrg'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = Utilities.generateString(8);
                                    matchMdu[mduKey] = Utilities.generateString(8);
                                } else {
                                    mduListing[field.key] = Utilities.generateString(8);
                                }
                                break;
                            case('int-3'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = Utilities.generateNum(1, 100, false);
                                    matchMdu[mduKey] = Utilities.generateNum(1, 100, false);
                                } else {
                                    mduListing[field.key] = Utilities.generateNum(1, 100, false);
                                }
                                break;
                            case('int-4'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = Utilities.generateNum(1000, 2000, false);
                                    matchMdu[mduKey] = Utilities.generateNum(1000, 2000, false);
                                } else {
                                    mduListing[field.key] = Utilities.generateNum(1000, 2000, false);
                                }
                                break;
                            case('int-5'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = Utilities.generateNum(10000, 99999, false);
                                    matchMdu[mduKey] = Utilities.generateNum(10000, 99999, false);
                                } else {
                                    mduListing[field.key] = Utilities.generateNum(10000, 99999, false);
                                }
                                break;
                            case('dollar'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = Utilities.generateNum(5, 50000, true);
                                    matchMdu[mduKey] = Utilities.generateNum(5, 50000, true);
                                } else {
                                    mduListing[field.key] = Utilities.generateNum(5, 50000, true);
                                }
                                break;
                            case('date'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = Utilities.randomTime();
                                    matchMdu[mduKey] = Utilities.randomTime();
                                } else {
                                    mduListing[field.key] = Utilities.randomTime();
                                }
                                break;
                            case('prop-status'):
                                var propStatuses = ["Marketing", "Marketing - Past Due", "Under Contract", "Under LOI", "Sold", "Expired"];
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = propStatuses[Math.floor(Math.random() * propStatuses.length)];
                                    matchMdu[mduKey] = propStatuses[Math.floor(Math.random() * propStatuses.length)];
                                } else {
                                    mduListing[field.key] = propStatuses[Math.floor(Math.random() * propStatuses.length)];
                                }
                                break;
                            case('prop-type'):
                                var propTypes = ["Apartment", "Condo", "Land", "Mobile Homes", "Portfolio"];
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = propTypes[Math.floor(Math.random() * propTypes.length)];
                                    matchMdu[mduKey] = propTypes[Math.floor(Math.random() * propTypes.length)];
                                } else {
                                    mduListing[field.key] = propTypes[Math.floor(Math.random() * propTypes.length)];
                                }
                                break;
                            case('url'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = Utilities.randomUrl(10);
                                    matchMdu[mduKey] = Utilities.randomUrl(10);
                                } else {
                                    mduListing[field.key] = Utilities.randomUrl(10);
                                }
                                break;
                            case('address'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = {};
                                    matchMdu[mduKey] = {};
                                } else {
                                    mduListing[field.key] = {};
                                }
                                //whatever
                                angular.forEach(field.fields, function (addressField) {
                                    mdu[mduKey][addressField.key] = null;
                                    matchMdu[mduKey][addressField.key] = null;
                                });
                                // didnt want to refactor and didnt want to do another nested switch..
                                mdu[mduKey].street1 = Utilities.generateString(3);
                                mdu[mduKey].street2 = Utilities.generateString(3);
                                mdu[mduKey].city = Utilities.generateString(2);
                                mdu[mduKey].state = Utilities.generateString(1);
                                mdu[mduKey].zip = Utilities.generateNum(10000, 99999, false);
                                mdu[mduKey].county = Utilities.generateString(2);
                                mdu[mduKey].latitude = Utilities.generateNum(-90, 90, true);
                                mdu[mduKey].longitude = Utilities.generateNum(-180, 180, true);
                                matchMdu[mduKey].street1 = Utilities.generateString(3);
                                matchMdu[mduKey].street2 = Utilities.generateString(3);
                                matchMdu[mduKey].city = Utilities.generateString(2);
                                matchMdu[mduKey].state = Utilities.generateString(1);
                                matchMdu[mduKey].zip = Utilities.generateNum(10000, 99999, false);
                                matchMdu[mduKey].county = Utilities.generateString(2);
                                matchMdu[mduKey].latitude = Utilities.generateNum(-90, 90, true);
                                matchMdu[mduKey].longitude = Utilities.generateNum(-180, 180, true);
                                break;
                            case('price'):
                                if (field.key.charAt(3) == '.') {
                                    mduKey = field.key.slice(4, field.key.length);
                                    mdu[mduKey] = [Utilities.generateNum(10000, 99999, false),
                                        Utilities.generateNum(10000, 99999, false)];
                                    matchMdu[mduKey] = [Utilities.generateNum(10000, 99999, false),
                                        Utilities.generateNum(10000, 99999, false)];
                                } else {
                                    mduListing[field.key] = [Utilities.generateNum(10000, 99999, false),
                                        Utilities.generateNum(10000, 99999, false)];
                                }
                                break;
                            default:
                                break;
                        }
                    } else {
                        console.log(field.key + "   fuckkkkked");
                    }
                });
                mduListing.mdus.push(mdu);
                mduIndex++;
                matchMdus.push(matchMdu);
                var workflowStates = ["todo", "done", "published"];
                mduListing.workflowState = workflowStates[Math.floor(Math.random() * workflowStates.length)];
                mduListing.id = Utilities.generateNum(100000000, 999999999, false);
                mockMDUListings.push(mduListing);
            }

            $httpBackend.whenGET('/auth/user/').respond([fakeUser]);
            $httpBackend.whenGET('/auth/user/1').respond(fakeUser);
            $httpBackend.whenPUT('/auth/users/user/').respond(function (method, url, data, headers) {
                var _saved = angular.fromJson(data);
                fakeUser = data;
                return [200, {}, {}];
            });

            /* Gets all edited mdu_listing data */
            $httpBackend.whenGET(/\/mdu_listings\/$/).respond(function (method, url, data, headers) {
                return [200,
                    {
                        status: 'N/A',
                        collection: mockMDUListings
                    }, {}];
            });
            /* Returns raw data for an mdu_listing */
            $httpBackend.whenGET(/\/mdu_listings\/[0-9]$/).respond(function (method, url, data, headers) {
                return [200, {
                    status: 'N/A'
                }, {}];
            });
            /* Creates a new mdu_listing and returns ID of new mdu_listing */
            $httpBackend.whenPOST(/\/mdu_listings\/$/).respond(function (method, url, data, headers) {
                return [200, {
                    status: 'N/A',
                    response: {
                        id: Utilities.generateNum(1, 999999999, false)
                    }
                }, {}];
            });
            /* Updates an mdu_listing's data or changes its workflow state */
            $httpBackend.whenPUT(/\/mdu_listings\/[0-9]$/).respond(function (method, url, data, headers) {
                return [200, {
                    status: 'N/A'
                }, {}];
            });
            /* Receives collection of Addresses, returns matching MDUs */
            $httpBackend.whenGET(/\/mdus\/$/).respond(function (method, url, data, headers) {
                var matchingMdus = [];
                // hardcoded this shit sucks i just wanted to move on to other shit and this
                // is the absolute bare minimum i dont have any validation for why its this way
                matchingMdus.push(matchMdus.splice(0,3));
                matchingMdus.push([]);
//                matchingMdus.push(matchMdus.splice(0,1));

                return [200, {
                    status: 'N/A',
                    collection: matchingMdus
                }, {}];
            });

            $httpBackend.whenGET(/auth\//).respond(function (method, url, data, headers) {
                return [200, {}, {}];
            });
            $httpBackend.whenPOST(/auth\//).respond(function (method, url, data, headers) {
                return [200, {}, {}];
            });
            $httpBackend.whenPUT(/auth\//).respond(function (method, url, data, headers) {
                return [200, {}, {}];
            });
        }

        /* Gets all edited mdu_listing data */
        $httpBackend.whenGET(/\/mdu_listings\/$/).respond(function (method, url, data, headers) {
            return [200,
                {
                    status: 'N/A',
                    collection: mockMDUListings
                }, {}];
        });
        /* Returns raw data for an mdu_listing */
        $httpBackend.whenGET(/\/mdu_listings\/[0-9]$/).respond(function (method, url, data, headers) {
            return [200, {
                status: 'N/A'
            }, {}];
        });
        /* Creates a new mdu_listing and returns ID of new mdu_listing */
        $httpBackend.whenPOST(/\/mdu_listings\/$/).respond(function (method, url, data, headers) {
            return [200, {
                status: 'N/A',
                response: {
                    id: Utilities.generateNum(1, 999999999, false)
                }
            }, {}];
        });
        /* Updates an mdu_listing's data or changes its workflow state */
        $httpBackend.whenPUT(/\/mdu_listings\/[0-9]$/).respond(function (method, url, data, headers) {
            return [200, {
                status: 'N/A'
            }, {}];
        });
        /* Receives collection of Addresses, returns matching MDUs */
        // NOTE: production will return long/lat as shit will be geocoded
        $httpBackend.whenGET(/\/mdus\/$/).respond(function (method, url, data, headers) {
            var matchingMdus = [];
            // hardcoded this shit sucks i just wanted to move on to other shit and this
            // is the absolute bare minimum i dont have any validation for why its this way
            matchingMdus.push(matchMdus.splice(0,3));
            matchingMdus.push([]);
            matchingMdus.push(matchMdus.splice(0,1));

            return [200, {
                status: 'N/A',
                collection: matchingMdus
            }, {}];
        });

        $httpBackend.whenGET(/app\/config\//).passThrough();
        $httpBackend.whenGET(/views\//).passThrough();
        $httpBackend.whenGET(/assets\//).passThrough();
        $httpBackend.whenGET(/templates\//).passThrough();

    });

angular.bootstrap(document, ['rescour.mock']);




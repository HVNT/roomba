/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/13/14
 * Time: 10:54 AM
 * File:
 */


angular.module('rescour.mock', ['rescour.roomba', 'ngMockE2E'])
    .value('$collections', {
        mdu_listings: {
            title: 'mdu_listings',
            key: 'mdu_listings',
            tags: ['raw', 'edited', 'published'],
            path: '/mdu_listings/',
            dimensions: {
                discrete: {
                    broker: {
                        title: 'Broker',
                        weight: 10
                    },
                    tags: {
                        title: 'Tags',
                        weight: 10,
                        restrict: ['edited', 'published', 'raw', 'unpublished', 'flagged', 'conflict'],
                        multi: true
                    },
                    status: {
                        title: 'Property Status',
                        weight: 5
                    },
                    state: {
                        title: 'State',
                        nested: 'address',
                        weight: 5
                    }
                },
                range: {
                    numUnits: {
                        title: '# of Units',
                        weight: 5
                    }
                }
            },
            fields: [
                {
                    title: 'Title',
                    weight: 5000,
                    key: 'title',
                    type: 'text'
                },
                {
                    title: 'Comment',
                    weight: '6000',
                    key: 'comment',
                    type: 'textarea'
                },
                {
                    title: 'Page',
                    weight: 2,
                    key: 'page',
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
                    title: 'Flyer',
                    weight: 9,
                    key: 'flyer'
                },
                {
                    title: 'Price',
                    weight: 8,
                    key: 'price'
                },
                {
                    title: 'Marketing URL',
                    weight: 8,
                    key: 'marketingUrl'
                },
                {
                    title: 'Call For Offers',
                    weight: 9,
                    key: 'callForOffers',
                    type: 'date'
                },
                {
                    title: 'Date Posted',
                    weight: 9,
                    key: 'datePosted',
                    type: 'date'
                },
                {
                    title: 'Property Status',
                    weight: 9,
                    key: 'propertyStatus',
                    type: 'typeahead',
                    typeahead: ['Marketing', 'Marketing - Past Due', 'Under Contract', 'Under LOI', 'Sold', 'Expired']
                },
                {
                    title: 'Property Type',
                    weight: 9,
                    key: 'mdu.propertyType',
                    type: 'typeahead',
                    typeahead: ['Apartment', 'Condo', 'Land', 'Mobile Homes', 'Portfolio']
                },
                {
                    title: 'Year Built',
                    weight: 3000,
                    key: 'mdu.yearBuilt',
                    type: 'text'
                },
                {
                    title: 'Address',
                    weight: 0,
                    key: 'mdu.address',
                    fields: [
                        {
                            title: 'Street 1',
                            key: 'street1'
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
                        },
                        {
                            title: 'Latitude',
                            key: 'latitude',
                            readonly: true
                        },
                        {
                            title: 'Longitude',
                            key: 'longitude',
                            readonly: true
                        }
                    ]
                },
                {
                    title: '# Units',
                    weight: 10,
                    key: 'mdu.numUnits'
                },
                {
                    title: 'Acres',
                    weight: 9,
                    key: 'mdu.acres'
                },
                {
                    title: 'County',
                    weight: 1,
                    key: 'mdu.county'
                },
                {
                    title: 'Assessor Url',
                    weight: 9,
                    key: 'mdu.assessorUrl'
                }
            ],
            models: [
                {
                    title: 'Images',
                    path: '/images/',
                    key: 'images',
                    fields: [
                        {
                            key: 'url',
                            title: 'URL'
                        },
                        {
                            key: 'weight',
                            title: 'Weight'
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
                    title: 'Sales History',
                    weight: 9,
                    key: 'mdu.salesHistory',
                    fields: [
                        {
                            key: 'date',
                            title: 'Date'
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
                            key: 'pricePerUnit',
                            title: 'Price / Unit'
                        },
                        {
                            key: 'source',
                            title: 'Source'
                        },
                        {
                            key: 'sourceUrl',
                            title: 'Source Url'
                        }
                    ]
                },
                {
                    title: 'Tax History',
                    weight: 9,
                    key: 'mdu.taxHistory',
                    fields: [
                        {
                            key: 'year',
                            title: 'Year'
                        },
                        {
                            key: 'taxAssessment',
                            title: 'Tax Assessment'
                        },
                        {
                            key: 'propertyTaxes',
                            title: 'Property Taxes'
                        },
                        {
                            key: 'millRate',
                            title: 'Mill Rate'
                        }
                    ]
                },
                {
                    title: 'News',
                    weight: 9,
                    key: 'mdu.news',
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
                            key: 'body',
                            title: 'Body'
                        }
                    ]
                },
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
                                "1 BR / 1 BA", "1 BR / 1.5 BA", "1 BR / 2 BA",
                                "2 BR / 1 BA", "2 BR / 1.5 BA", "2 BR / 2 BA", "2 BR / 2.5 BA", "2 BR / 3 BA",
                                "3 BR / 1 BA", "3 BR / 1.5 BA", "3 BR / 2 BA", "3 BR / 2.5 BA", "3 BR / 3 BA", "3 BR / 3.5 BA", "3 BR / 4 BA",
                                "4 BR / 1 BA", "4 BR / 1.5 BA", "4 BR / 2 BA", "4 BR / 2.5 BA", "4 BR / 3 BA", "4 BR / 3.5 BA", "4 BR / 4 BA",
                                "1 BR / 1 BA TH", "1 BR / 1.5 BA TH",  "1 BR / 2 BA TH",
                                "2 BR / 1 BA TH", "2 BR / 1.5 BA TH", "2 BR / 2 BA TH", "2 BR / 2.5 BA TH", "2 BR / 3 BA TH",
                                "3 BR / 1 BA TH", "3 BR / 1.5 BA TH", "3 BR / 2 BA TH", "3 BR / 2.5 BA TH", "3 BR / 3 BA TH", "3 BR / 3.5 BA TH", "3 BR / 4 BA TH",
                                "4 BR / 1 BA TH", "4 BR / 1.5 BA TH", "4 BR / 2 BA TH", "4 BR / 2.5 BA TH", "4 BR / 3 BA TH", "4 BR / 3.5 BA TH", "4 BR / 4 BA TH",
                                "Average", "Studio", "Efficiency"
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
                        }
                    ]
                }
            ]
        }
    })
// Dummy Calls
    .run(['$httpBackend', '$timeout', 'Utilities', '$collections', function ($httpBackend, $timeout, $log, $collections) {
        $httpBackend.whenGET('/config/market.json').respond(function (method, url, data, headers) {
            return [200, $collections];
        });

        var MDU_LISTINGS_COUNT = 10;

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

        var dummyMDUListings = [];
        for (var j = 0; j < MDU_LISTINGS_COUNT; j++) {
            var mduListing = {
                mdu: {}
            };
            angular.forEach($collections.mdu_listings.fields, function(field) {
                if(field.key && !field.key.search('mdu.')) {
                    mduListing.mdu[field.key.substr(4)] = ''; // respective data gen here
                } else if(field.key.search('mdu.')) {
                    mduListing[field.key] = ''; // respective data gen here
                    if(field.fields) {
                        mduListing.fields = field.fields;
                    }
                }
            });
            mduListing.id = j;
            dummyMDUListings.push(mduListing);
        }

        console.log(dummyMDUListings);

        function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
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
            return [200, {
                status: 'N/A',
                collection: []
            }, {}];
        });
        /* Returns raw data for an mdu_listing */
         $httpBackend.whenGET(/\/mdu_listings\/[0-9]$/).respond(function (method, url, data, headers) {
            return [200, {
                status: 'N/A'
            }, {}];
        });
        /* Updates an mdu_listing's data or changes its workflow state */
        $httpBackend.whenPUT(/\/mdu_listings\/[0-9]$/).respond(function (method, url, data, headers) {
            return [200, {
                status: 'N/A'
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
        $httpBackend.whenGET(/views\//).passThrough();
        $httpBackend.whenGET(/assets\//).passThrough();
        $httpBackend.whenGET(/templates\//).passThrough();

    }]);

angular.bootstrap(document, ['rescour.mock']);




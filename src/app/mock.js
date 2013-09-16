/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 4:27 PM
 * File: /app/mock.js
 */

angular.module('roomba.mock', ['roomba.app', 'ngMockE2E'])
// Dummy Calls
    .run(['$httpBackend', '$timeout', function ($httpBackend, $timeout) {
        $httpBackend.whenGET('/app-config/market.json')
            .respond({
                listings: {
                    title: 'Listings',
                    key: 'listings',
                    tags: ['raw', 'edited', 'published'],
                    path: '/listings/',
                    dimensions: {
                        discreet: {
                            broker: {
                                title: 'Broker',
                                weight: 10
                            },
                            tags: {
                                title: 'Tags',
                                weight: 10,
                                restrict: ['edited', 'published', 'raw']
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
                            title: 'Year Built',
                            weight: 3000,
                            key: 'yearBuilt',
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
                            typeahead: ['Marketing', 'Under Contract', 'Under LOI', 'Sold']
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
                            title: 'Parking Spots',
                            key: 'parking',
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
                },
                news: {
                    title: 'News',
                    key: 'news',
                    tags: [],
                    path: '/news/',
                    dimensions: {
                        discreet: {},
                        range: {}
                    },
                    fields: [
                        {
                            title: 'Title',
                            weight: 5000,
                            key: 'title'
                        },
                        {
                            title: 'Date',
                            weight: 4000,
                            key: 'date',
                            type: 'date'
                        },
                        {
                            title: 'Body',
                            weight: 8,
                            key: 'body',
                            type: 'textarea'
                        },
                        {
                            title: 'Link',
                            weight: 8,
                            key: 'link'
                        },
                        {
                            title: 'Category',
                            weight: 8,
                            key: 'category',
                            type: 'typeahead',
                            typeahead: ['Under Construction', 'Future Development', 'Transactions']
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
                    models: [],
                    resources: []
                }
            });

        var collections = {
                listings: {
                    broker: ['ARA', 'Engler', 'Cushman Wakefield', 'HFF'],
                    state: ['Georgia', 'Tennessee', 'Kentucky', 'Alabama', 'Arkansas', 'Texas'],
                    tags: ['raw', 'staged', 'published']
                },
                articles: {
                    state: ['Georgia', 'Tennessee', 'Kentucky', 'Alabama', 'Arkansas', 'Texas'],
                    tags: ['raw', 'staged', 'published']
                },
                news: {
                    source: ['ABC'],
                    tags: ['raw', 'staged', 'published']
                }
            },
            items = {},
            itemDetails = {},
            idCounter = 0,
            COLLECTION_COUNT = 50000;

        function selectRandom(arr) {
            return arr[parseInt(Math.random() * arr.length, 10)]
        };

        function Item(collectionKey) {
            var self = this,
                _collection = $collections[collectionKey];
            self.id = idCounter.toString();
            self.description = 'This item is pretty sweet.  This is the description';
            self.raw = {};
            self.edited = {};

            angular.forEach(_collection.fields, function (value, key) {
                if (_.contains(_collection.dimensions.discreet, key)) {
                    var _randDiscreet = selectRandom(collections[collectionKey][key]);
                    self.raw[key] = {
                        value: _randDiscreet,
                        status: 0
                    };

                    self.edited[key] = _randDiscreet;
                } else if (_.contains(_collection.dimensions.range, key) && collections[collectionKey][key]) {
                    var _randRange = parseInt((Math.random() * (collections[collectionKey][key].high - collections[collectionKey][key].low)) + collections[collectionKey][key].low, 10);
                    self.raw[key] = {
                        value: _randRange,
                        status: 0
                    };

                    self.edited[key] = _randRange;
                } else {
                    self.raw[key] = {
                        value: key,
                        status: 0
                    };

                    self.edited[key] = key;
                }

            });

            self.tags = [selectRandom(collections[collectionKey].tags)];
            self.raw.title = {
                value: _collection.title + " " + idCounter,
                status: 0
            };
            self.edited.title = _collection.title + " " + idCounter;
            idCounter += 1;
        };

        angular.forEach($collections, function (value, key) {
            items[key] = items[key] || {};
            itemDetails[key] = itemDetails[key] || {};
            for (var i = 0; i < COLLECTION_COUNT; i++) {
                items[key][idCounter] = new Item(key);

                itemDetails[key][idCounter] = {
                    contacts: [
                        {
                            name: 'Contact ' + i * idCounter,
                            email: 'contact@gmail.com',
                            phone: '678-123-1234'
                        },
                        {
                            name: 'Contact ' + i * idCounter + 1,
                            email: 'contact@gmail.com',
                            phone: '678-123-1234'
                        }
                    ],
                    unitMix: [
                        {
                            type: '1 BR/1BA',
                            units: '48',
                            sqft: '605',
                            rent: '729',
                            rentpsqft: '1.20'
                        },
                        {
                            type: '2 BR/1BA',
                            units: '23',
                            sqft: '924',
                            rent: '950',
                            rentpsqft: '1.10'
                        },
                        {
                            type: '2 BR/2BA',
                            units: '220',
                            sqft: '1310',
                            rent: '1280',
                            rentpsqft: '0.90'
                        }
                    ]
                };
            }

            var collectionPath = new RegExp('\/api\/' + value.path.replace('/', '') + '(\/?)$'),
                tagPath = new RegExp('\/api\/' + value.path.replace('/', '') + '\/[0-9]+|[a-z]+(\/?)$'),
                detailsPath = new RegExp('\/api\/' + value.path.replace('/', '') + '\/[a-z]+\/[0-9]+(\/?)$'),
                postPath = new RegExp('\/api\/' + value.path.replace('/', '') + '\/$'),
                resourcesPath = new RegExp('\/api\/' + value.path.replace('/', '') + '\/[a-z]+\/[0-9]+\/resources\/[0-9]+|[a-z]+(\/?)$');

            var contacts = [
                    {
                        edited: {
                            name: 'Alan Pledger',
                            phone: '678-592-1982',
                            email: 'apledger3@gmail.com',
                            broker: 'HFF'
                        },
                        raw: {
                            name: {
                                value: 'Alann Pledger',
                                status: 0
                            },
                            phone: {
                                value: '6785921982',
                                status: 0
                            },
                            email: {
                                value: 'apledger3@gmail',
                                status: 0
                            },
                            broker: {
                                value: 'HFF',
                                status: 0
                            }
                        },
                        id: 'contact0',
                        tags: []
                    },
                    {
                        edited: {
                            name: 'Adam Kitain',
                            phone: '404-123-7531',
                            email: 'adamkitain@gmail.com',
                            broker: 'BB'
                        },
                        raw: {
                            name: {
                                value: 'Adamm Kitain',
                                status: 1
                            },
                            phone: {
                                value: '',
                                status: 1
                            },
                            email: {
                                value: 'akitain@gmail',
                                status: 1
                            },
                            broker: {
                                value: 'BB',
                                status: 2
                            }
                        },
                        id: 'contact1',
                        tags: []
                    },
                    {
                        edited: {
                            name: 'Hunter Brennick',
                            phone: '404-123-7531',
                            email: 'hb@gmail.com',
                            broker: 'BB'
                        },
                        raw: {
                            name: {
                                value: null,
                                status: null
                            },
                            phone: {
                                value: null,
                                status: null
                            },
                            email: {
                                value: null,
                                status: null
                            },
                            broker: {
                                value: null,
                                status: null
                            }
                        },
                        id: 'contact2',
                        tags: []
                    }
                ],
                images = [
                    {
                        edited: {
                            url: 'http://placehold.it/500x500'
                        },
                        raw: {
                            url: {
                                value: 'http://placehold.it/500x500',
                                status: 0
                            }
                        },
                        id: 'image0',
                        tags: []
                    },
                    {
                        edited: {
                            url: 'http://placehold.it/200x200'
                        },
                        raw: {
                            url: {
                                value: 'http://placehold.it/200x200',
                                status: 0

                            }
                        },
                        id: 'image1',
                        tags: []
                    }
                ];

            $httpBackend.whenGET(collectionPath).respond(
                function (method, url, data, headers) {
                    var _key = url.split("/")[2];
                    return [200, angular.extend({}, items[_key]), {}];
                });

            $httpBackend.whenGET(resourcesPath).respond(
                function (method, url, data, headers) {
                    var itemId = url.split("/")[3],
                        resourceType = url.split("/")[5];

                    switch (resourceType) {
                        case 'images':
                            return [200, images, {}];
                            break;
                        case 'contacts':
                            return [200, contacts, {}];
                            break;
                        default:
                            return [400, { error: 'Resource type not recognized' }, {}]
                    }
                });

            $httpBackend.whenGET(tagPath).respond(
                function (method, url, data, headers) {
                    var item_id = url.split("/")[3],
                        _key = url.split("/")[2];
                    if (_.contains(collections[_key].tags, item_id)) {
                        return [200, angular.extend({}, _.filter(items[_key], function (value) {
                            return _.contains(value.tags, item_id);
                        })), {}];
                    } else {
                        return [200, angular.extend({}, items[_key][item_id], itemDetails[_key][item_id]), {}];
                    }
                });

            $httpBackend.whenGET(detailsPath).respond(
                function (method, url, data, headers) {
                    var tag = url.split("/")[3],
                        itemId = url.split("/")[4],
                        _key = url.split("/")[2];

                    if (_.contains(collections[_key].tags, tag)) {
                        return [200, angular.extend({}, items[_key][itemId], itemDetails[_key][itemId]), {}];
                    } else {
                        return [403, {message: 'Invalid Tag'}, {}];
                    }
                });

            $httpBackend.whenPOST(postPath).respond(
                function (method, url, data, headers) {
                    var _newID = idCounter += 1,
                        _key = url.split("/")[2];
                    _item = angular.fromJson(data);

                    _item.id = _newID.toString();
                    items[_key][_newID] = _item;

                    console.log(_item);
                    return [200, {id: _newID}, {}];
                });

        });

//        $httpBackend.whenGET(/\/items(\/?)$/).respond(
//            function (method, url, data, headers) {
//                return [200, items, {}];
//            });
//
//        $httpBackend.whenGET(/\/items\/[0-9]+(\/?)$/).respond(
//            function (method, url, data, headers) {
//                var item_id = url.split("/")[2];
//
//                return [200, itemDetails[item_id], {}];
//            });
//
//        $httpBackend.whenPOST(/\/items\//).respond(
//            function (method, url, data, headers) {
//                var _item = angular.fromJson(data);
//
//                itemDetails[item_id] = _item;
//                return [200, { id: item_id.id }, {}];
//            });
//
//        $httpBackend.whenPUT(/\/items\/[0-9]+\//).respond(
//            function (method, url, data, headers) {
//                var _item = angular.fromJson(data),
//                    item_id = url.split("/")[2];
//
//                itemDetails[item_id] = _item;
//                return [200, { id: item_id.id }, {}];
//            });
//
//        $httpBackend.when('DELETE', /\/properties\/[0-9]+/).respond(
//            function (method, url, data, headers) {
//                var item_id = url.split("/")[2];
//                delete items[item_id];
//                return [200, {}, {}];
//            });

        $httpBackend.whenGET(/views\//).passThrough();
        $httpBackend.whenGET(/partials\//).passThrough();
        $httpBackend.whenGET(/template\//).passThrough();
    }])
;

angular.bootstrap(document, ['roomba.mock']);




angular.module('rescour.app')
    .controller('MarketCtrl',
    function ($scope, $timeout, $location, User, $modal, MDUMarket, SavedSearch, NewsMarket, MarketModals, $state, MarketState, $log, Hidden, News, $rootScope, ConvertToCSV, $filter) {
                $scope.user = User;
        $scope.items = MDUMarket.visibleItems;
        $scope.dimensions = MDUMarket.getDimensions();
        $scope.searchText = {};
        $rootScope.$on('noteAdded', function (event, propertyId) {
            MDUMarket.items[propertyId].isNote = true;
        });

        $scope.toggleFilterCollapsed = function () {
            MarketState.filterCollapsed = !MarketState.filterCollapsed;
            $timeout(function () {
                $scope.$broadcast('window-resized');
            }, 300);
        };

        $scope.toggleListCollapsed = function () {
            MarketState.listCollapsed = !MarketState.listCollapsed;
            $timeout(function () {
                $scope.$broadcast('window-resized');
            }, 300);
        };

        $scope.globalReset = function () {
            $scope.$broadcast('GlobalReset');
        };

        if (!NewsMarket.initialized) {
            News.query().then(function (results) {
                NewsMarket.initialize(News.dimensions, results);
                $scope.newsDimensions = NewsMarket.getDimensions();
                $log.debug('Resolved NewsMarket', NewsMarket);
            });
        } else {
            $scope.newsDimensions = NewsMarket.getDimensions();
            $log.debug('Resolved Cached NewsMarket', NewsMarket);
        }

        $scope.MarketState = MarketState;
        $scope.selectedSearch = null;
        $scope.savedSearches = [];

        SavedSearch.query().then(function (savedSearches) {
            $scope.savedSearches = savedSearches;
        });

        function sortBy() {
            if ($scope.sortPower.predicate === this.key) {
                $scope.sortPower.reverse = !$scope.sortPower.reverse;
            } else {
                $scope.sortPower.reverse = false;
                $scope.sortPower.predicate = this.key;
                $scope.setPower($scope.sortPower, this.key);
            }

            $scope.items = MDUMarket.sortVisibleItems($scope.sortPower.predicate, $scope.sortPower.reverse);
        };

        function showSubset() {
            MDUMarket.subset = this.key;
            $scope.render();
            $scope.$broadcast('UpdateMap');
            $scope.setPower($scope.subsetPower, this.key);
        };

        $scope.sortIcon = function () {
            return $scope.sortPower.reverse ? 'fa fa-sort-amount-asc' : 'fa fa-sort-amount-desc';
        };

        $scope.openCustomFieldDimensionsModal = function () {
            $modal.open(MarketModals.customFieldDimensions);
        };

        $scope.sortPower = {
            title: 'Date Posted',
            predicate: MDUMarket.sortBy.predicate,
            reverse: MDUMarket.sortBy.reverse,
            options: [
                {
                    action: sortBy,
                    title: 'Date Posted',
                    key: 'datePosted'
                },
                {
                    action: sortBy,
                    title: 'Call for Offers',
                    key: 'callForOffers'
                },
                {
                    action: sortBy,
                    title: 'Year Built',
                    key: 'yearBuilt'
                },
                {
                    action: sortBy,
                    title: 'Number of Units',
                    key: 'numberUnits'
                }
            ]
        };

        $scope.subsetPower = {
            title: 'All',
            icon: 'fa fa-list',
            options: [
                {
                    icon: 'fa fa-list',
                    title: 'All',
                    key: 'all',
                    action: showSubset,
                    isSelected: true
                },
                {
                    icon: 'fa fa-star',
                    title: 'Favorites',
                    key: 'isFavorite',
                    action: showSubset
                },
                {
                    icon: 'fa fa-ban',
                    title: 'Hidden',
                    key: 'isHidden',
                    action: showSubset
                },
                {
                    icon: 'fa fa-comments',
                    title: 'Comments',
                    key: 'isNote',
                    action: showSubset
                }
            ]
        };

        $scope.getCustomField = function (mdu, customFieldDimension) {
            return mdu.getCustomField(customFieldDimension);
        };

        $scope.saveCustomField = function (mdu, customFieldDimension) {
            mdu.getCustomField(customFieldDimension).save();
        };

        $scope.setPower = function (powers, key) {
            angular.forEach(powers.options, function (option) {
                if (option.key == key) {
                    option.isSelected = true;
                    powers.title = option.title;
                    powers.icon = option.icon;
                } else {
                    option.isSelected = false;
                }
            });

            return key;
        };

        $scope.setZoomLevel = function (zoom) {
            MarketState.map.zoom = zoom;
        };

        $scope.savedSearchModal = angular.extend({
            resolve: {
                dimensions: function () {
                    return MDUMarket.dimensions;
                }
            }
        }, MarketModals.savedSearch);

        $scope.toggleNewsCategory = function (e, category) {
            e.stopPropagation();
            NewsMarket.toggleDiscrete($scope.newsDimensions.discrete.category, category);
            $scope.$broadcast('UpdateMap');
        };

        $scope.setNewsAge = function (option, low, high) {
            angular.forEach($scope.newsAgePower.options, function (value) {
                value.isSelected = false;
            });
            option.isSelected = true;

            $scope.newsAgePower.title = option.title;
            $scope.$broadcast('UpdateMap');
        };

        function setNewsAge() {
            NewsMarket.applyRange('age', 0, this.key == 'all' ? null : this.key);
            $scope.$broadcast('UpdateMap');
            MarketState.newsAge = $scope.setPower($scope.newsAgePower, this.key);
        }

        $scope.newsAgePower = {
            title: 'Date',
            options: [
                {
                    title: 'All Time',
                    key: 'all',
                    action: setNewsAge
                },
                {
                    title: 'Last 30 Days',
                    key: '30',
                    action: setNewsAge
                },
                {
                    title: 'Last 90 Days',
                    key: '90',
                    action: setNewsAge
                },
                {
                    title: 'Last 180 Days',
                    key: '180',
                    action: setNewsAge
                },
                {
                    title: 'Last Year',
                    key: '365',
                    action: setNewsAge
                }
            ]
        };

        function setTiles() {
            MarketState.map.tiles = this.key;
            $scope.$broadcast('Tiles.' + MarketState.map.tiles);
            MarketState.map.tiles = $scope.setPower($scope.tilesPower, this.key);
        }

        $scope.tilesPower = {
            icon: 'fa fa-globe',
            options: [
                {
                    title: 'Roadmap',
                    icon: 'fa fa-globe',
                    key: 'ROADMAP',
                    action: setTiles
                },
                {
                    title: 'Satellite',
                    icon: 'fa fa-globe',
                    key: 'SATELLITE',
                    action: setTiles
                },
                {
                    title: 'Terrain',
                    icon: 'fa fa-globe',
                    key: 'TERRAIN',
                    action: setTiles
                },
                {
                    title: 'Hybrid',
                    icon: 'fa fa-globe',
                    key: 'HYBRID',
                    action: setTiles
                }
            ]
        };

        $scope.toggleNews = function () {
            if (!MarketState.map.isNewsDisabled()) {
                $scope.$broadcast('DisplayNews');
            }
        };

        $scope.convertNewsToCSV = function () {
            var reportConfig = [
                {
                    key: 'date',
                    title: 'Date',
                    method: function (item) {
                        if (item.date) {
                            return $filter('date')(item.date, 'shortDate');
                        } else {
                            return ''
                        }
                    }
                },
                {
                    key: 'title',
                    title: 'Title'
                },
                {
                    key: 'category',
                    title: 'Category'
                },
                {
                    key: 'street1',
                    accessor: 'address',
                    title: 'Street'
                },
                {
                    key: 'city',
                    accessor: 'address',
                    title: 'City'
                },
                {
                    key: 'state',
                    accessor: 'address',
                    title: 'State'
                },
                {
                    key: 'zip',
                    accessor: 'address',
                    title: 'Zip'
                },
                {
                    key: 'source',
                    title: 'Source'
                },
                {
                    key: 'url',
                    title: 'URL'
                }
            ];

            var str = ConvertToCSV(NewsMarket.visibleItems, reportConfig);
            window.document.location = 'data:text/csv;charset=utf-8,' + encodeURI(str);
        };

        $scope.openDetails = function (item, pane) {
            pane = pane || 'details';
            $state.go('^.details.pane', { itemId: item.id, pane: pane });
        };

        $scope.render = function () {
            $scope.items = MDUMarket.apply();
            MDUMarket.predict();
        };

        $scope.centerMap = function (item) {
            $scope.$broadcast('CenterMap', item);
        };

        $scope.filter = function (discrete, discreteValue) {
            $scope.searchText = {};
            $scope.items = MDUMarket.toggleDiscrete(discrete, discreteValue).apply();
            MDUMarket.predict();
            $scope.$broadcast('UpdateMap');
            $scope.dimensions.modified = true;
        };

        $scope.toggleNA = function (range) {
            range.excludeNA = !range.excludeNA;
            $scope.render();
            $scope.$broadcast('UpdateMap');
        };

        $scope.load = function (search) {
            MDUMarket.load(search);
            $scope.render();
            $scope.$broadcast('UpdateMap');
            $scope.dimensions.modified = false;
            $scope.$broadcast('RangesDefined');
        };

        $scope.openMDUDetails = function (item, pane) {
            $state.go('market.mdu.list.details.pane', {itemId: item.id, pane: pane})
        };

        $scope.toggleFavorite = function (item) {
            item.toggleFavorite();
        };

        $scope.toggleHidden = function (item) {
            item.toggleHidden();
        };

        (function initializePowers() {
            $scope.setPower($scope.subsetPower, MDUMarket.subset || 'all');
            $scope.setPower($scope.sortPower, MDUMarket.sortBy.predicate);
            $scope.setPower($scope.newsAgePower, MarketState.newsAge || 'all');
            $scope.setPower($scope.tilesPower, MarketState.map.tiles || 'ROADMAP');
        })()
    })
    .controller('FilterCtrl',
    function ($scope, SavedSearch, $modal) {

        $scope.$on('GlobalReset', function () {
            $scope.loadSearch();
        });

        $scope.isNotHidden = function (range) {
            return !range.hidden;
        };

        $scope.orderByWeight = function () {
            return function (object) {
                return object.weight;
            };
        };

        $scope.openSaveModal = function () {
            // If its a new search open the $modalInstance
            if ($scope.dimensions.modified) {
                if (!$scope.selectedSearch) {
                    $modal.open($scope.savedSearchModal)
                        .result.then(function (result) {
                            result ? (result.action === 'save' ? $scope.saveSearch(result.settings) : null) : null;
                        });
                } else {
                    $scope.saveSearch();
                }
            }
        };

        $scope.saveSearch = function () {
            if (!$scope.dimensions.id) {
                // If no id, then it is a new search
                $modal.open($scope.savedSearchModal)
                    .result.then(function (settings) {
                        if (settings) {
                            // Creating in $modalInstance cb so dimensions will have finished being edited
                            $scope.dimensions = angular.extend($scope.dimensions, settings)
                            var _search = new SavedSearch($scope.dimensions);
                            _search.$save().then(function (response) {
                                $scope.dimensions.id = response.id;
                                $scope.selectedSearch = _search;
                                $scope.selectedSearch.isSelected = true;
                                $scope.dimensions.modified = false;
                                $scope.savedSearches.push(_search);
                            });
                        }
                    });
            } else {
                // If there is an id, need to update
                var _search = new SavedSearch($scope.dimensions);
                _search.$save().then(function (response) {
                    var _old = _.findWhere($scope.savedSearches, {id: $scope.dimensions.id})
                    // Since we do not requery, need to update local saved search collection
                    $scope.savedSearches = _.map($scope.savedSearches, function (val) {
                        return val.id === _old.id ? _search : val;
                    });
                    $scope.selectedSearch = _search;
                    $scope.selectedSearch.isSelected = true;
                    $scope.dimensions.modified = false;
                }, function (response) {
                    $scope.savedSearches = SavedSearch.query();
                    throw new Error("Could not save search: " + response.error);
                });
            }
        };

        $scope.refreshSearch = function (e) {
            e.stopPropagation();

            if ($scope.selectedSearch) {
                $scope.loadSearch(_.find($scope.savedSearches, function (saved) {
                    return saved.id === $scope.dimensions.id;
                }));
            } else {
                $scope.loadSearch();
            }
        };

        $scope.loadSearch = function (search) {
            if ($scope.selectedSearch) {
                $scope.selectedSearch.isSelected = false;
            }
            search = search || {
                title: 'Untitled Search'
            };
            $scope.load(search);
            $scope.selectedSearch = search;
            $scope.selectedSearch.isSelected = true;
        };

        $scope.deleteSearch = function (search, e) {
            e.stopPropagation();
            search.$delete().then(function (response) {
                $scope.savedSearches = _.reject($scope.savedSearches, function (val) {
                    return angular.equals(val, search);
                });
                if ($scope.dimensions.id === search.id) {
                    $scope.dimensions.id = undefined;
                    $scope.dimensions.title = 'Untitled Search';
                }
            });
        };

    })
    .controller('ListCtrl',
    function ($scope, $q, $modal, MarketModals, $state) {
        $scope.sortBy = {
            predicate: '',
            reverse: false
        };

        $scope.closeDetails = function () {
            $state.go('market.mdu.list.map');
        }

        $scope.panTo = function (item) {
            $scope.centerMap(item);
        };

        $scope.orderNA = function () {
            return function (object) {
                var _attr = object.getAttribute($scope.sortBy.predicate);
                if (_attr && _attr !== 'NA') {
                    return -_attr;
                } else if (_attr === 'NA') {
                    return 9999 * ($scope.sortBy.reverse ? -1 : 1);
                } else {
                    return 0;
                }
            };
        };
    })
    .controller('SavedSearchModalCtrl',
    function ($scope, $modalInstance, dimensions) {
        $scope.dimensions = dimensions;
        $scope.searchSettings = {};
        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.save = function () {
            $modalInstance.close($scope.searchSettings);
        };
    })
    .controller('CarouselModalCtrl',
    function ($scope, $modalInstance, images) {
        $scope.images = images;
        $scope.close = function () {
            $modalInstance.close();
        };
    })
    .controller('MDUDetailsCtrl',
    function ($scope, $http, Environment, $timeout, $location, Finance, MDUMarket, $stateParams, $log, $modal, MarketModals, User, Message) {

        $scope.activeMDU = MDUMarket.items[$stateParams.itemId];
        $scope.activeMDU
            .fetch()
            .then(function (mdu) {
                $scope.imageRows = _.groupBy(mdu.images, function (val, index) {
                    return parseInt(index / 4)
                });
                $log.debug("Loading Details, Active MDU: ", $scope.activeMDU);
            });
        $scope.imageRows = [];
        $scope.newComment = {};
        $scope.newMessage = {};
        $scope.contactAlerts = [];

        $scope.addComment = function (comment) {
            if ($scope.newComment.text) {
                var oldText = $scope.newComment.text;
                $scope.activeMDU
                    .addComment(comment)
                    .then(function (response) {

                    }, function (response) {
                        $scope.newComment.text = oldText;
                    });
                $scope.newComment.text = '';
            }
        };

        $scope.isMyComment = function (comment) {
            return comment.userEmail === User.profile.email;
        };

        $scope.openCarouselModal = function (images, activeImage) {
            angular.forEach(images, function (value, key) {
                value.isActive = false;
                value.url = value.url || $scope.activeMDU.imagePath + value.id;
            });
            if (activeImage) {
                activeImage.isActive = true;
            }
            $scope.carouselModal = $modal.open(_.extend({
                resolve: {
                    images: function () {
                        return images;
                    }
                }
            }, MarketModals.carousel));
        };

        $scope.recipientsHeader = function () {
            var header = _.map(
                _.filter($scope.activeMDU.contacts, function (val) {
                    return val.isSelected
                }),
                function (val) {
                    return val.name
                }).join(' and ');
            return header + (header ? ',' : '');
        };

        $scope.getRentPerSqFt = function (mix) {
            if (mix.rent && mix.sqft) {
                return mix.rent / mix.sqft;
            } else {
                return "";
            }
        };

        $scope.sendEmail = function (message) {
            var recipients = [];

            angular.forEach($scope.activeMDU.contacts, function (value, key) {
                if (value.isSelected) {
                    recipients.push(value.email);
                }
            });

            if (recipients.length > 0 && message.text) {
                $scope.contactAlerts = [
                    { type: 'info', msg: 'Sending..' }
                ];

                Message.send({
                    to: recipients.join(','),
                    subject: $scope.activeMDU.title + " via REscour.com",
                    text: message.text
                }).then(
                    function () {
                        $scope.newMessage.text = "";
                        $scope.contactAlerts = [
                            { type: 'success', msg: 'Message sent!' }
                        ];
                    },
                    function () {
                        $scope.contactAlerts = [
                            { type: 'danger', msg: 'Message failed to send.' }
                        ];
                    }
                );
            } else {
                $scope.contactAlerts = $scope.contactAlerts = [
                    { type: 'danger', msg: 'Please select recipients and provide a message.' }
                ];
            }
        };
    })
    .controller('CustomFieldDimensionsModalCtrl',
    function ($scope, $modalInstance, User, CustomFieldDimension) {
        $scope.user = User;
        $scope.newCustomFieldDimensions = [];
        $scope.newCustomFieldDimension = {};

        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.addCustomFieldDimension = function () {
            $scope.newCustomFieldDimensions.push(new CustomFieldDimension({ editable: true }));
        };

        $scope.saveCustomFieldDimension = function (customFieldDimension) {
            if (!customFieldDimension.id) {
                customFieldDimension.save().then(function () {
                    customFieldDimension.editable = false;
                    User.customFieldDimensions.push(customFieldDimension);
                    $scope.newCustomFieldDimensions = _.without($scope.newCustomFieldDimensions, customFieldDimension);

                });
            } else {
                customFieldDimension.save().then(function () {
                    customFieldDimension.editable = false;
                });
            }
        };

        $scope.promptRemove = function (customFieldDimension) {
            customFieldDimension.removePrompt = true;
        };

        $scope.closePrompt = function (customFieldDimension) {
            customFieldDimension.removePrompt = false;
        };

        $scope.removeCustomFieldDimension = function (customFieldDimension) {
            User.removeCustomFieldDimension(customFieldDimension);
        };

        $scope.removeNewCustomFieldDimension = function (customFieldDimension) {
            $scope.newCustomFieldDimensions = _.without($scope.newCustomFieldDimensions, customFieldDimension);

        };
    })
    .controller('ReportCtrl',
    function ($scope, $state, User, $filter, ConvertToCSV) {
        $scope.filteredItems = [];
        $scope.convertToCSV = function () {
            var reportConfig = [
                {
                    key: 'datePosted',
                    title: 'Date Posted',
                    method: function (item) {
                        return $filter('date')(item.datePosted, 'shortDate');
                    }
                },
                {
                    key: 'broker',
                    title: 'Broker'
                },
                {
                    key: 'title',
                    title: 'Title'
                },
                {
                    key: 'numberUnits',
                    title: 'Units'
                },
                {
                    key: 'propertyType',
                    title: 'Property Type'
                },
                {
                    key: 'acres',
                    title: 'Acres'
                },
                {
                    key: 'yearBuilt',
                    title: 'Year Built'
                },
                {
                    key: 'callForOffers',
                    title: 'Call For Offers',
                    method: function (item) {
                        return item.callForOffers ? $filter('date')(item.callForOffers, 'shortDate') : '';
                    }
                },
                {
                    key: 'city',
                    accessor: 'address',
                    title: 'City'
                },
                {
                    key: 'state',
                    accessor: 'address',
                    title: 'State'
                },
                {
                    key: 'zip',
                    accessor: 'address',
                    title: 'Zip'
                },
                {
                    key: 'tourDates',
                    title: 'Tour Dates',
                    fields: ['date'],
                    fieldsFormat: {
                        date: function (field) {
                            return $filter('date')(field, 'shortDate');
                        }
                    }
                },
                {
                    key: 'propertyStatus',
                    title: 'Status'
                },
                {
                    key: 'comments',
                    title: 'Comments',
                    fields: ['userEmail', 'text'],
                    separator: ' - '
                }
            ];

            angular.forEach(User.customFieldDimensions, function (value, key) {
                reportConfig.push({
                    key: 'customFields',
                    title: value.title,
                    method: function (item) {
                        return item.getCustomField(value).title;
                    }
                });
            });
            var str = ConvertToCSV($scope.filteredItems, reportConfig);
            window.document.location = 'data:text/csv;charset=utf-8,' + encodeURI(str);
        };

        $scope.closeDetails = function () {
            $state.go('market.mdu.report.grid');
        };
    })
    .controller('RentMetricsCtrl',
    function ($scope, RentMetrics, RentMetricsMarket, $log) {
        $scope.rentComps = [];
        $scope.rentMetrics = RentMetrics;
        $scope.rentMetricsMarket = RentMetricsMarket;
        $scope.rentMetricsDimensions = {};
        $scope.selectedTypes = {};

        RentMetrics.query($scope.activeMDU).then(function (response) {
            RentMetricsMarket.initialize(RentMetrics.dimensions, response);
            $log.debug("Resolved RentMetricsMarket", RentMetricsMarket);
            $scope.rentComps = RentMetricsMarket.visibleItems;
            $scope.rentMetricsDimensions = RentMetricsMarket.getDimensions();
        });

        $scope.filter = function (discrete, discreteValue) {
            if (discrete && discreteValue) {
                RentMetricsMarket.toggleDiscrete(discrete, discreteValue);
                $scope.selectedTypes[discreteValue.title] = discreteValue.isSelected;
            }
            $scope.rentComps = RentMetricsMarket.apply();
            $scope.rentMetrics.calcAverages($scope.rentComps);
            RentMetricsMarket.predict();
        };
    });
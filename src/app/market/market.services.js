angular.module('rescour.app')
    .factory('StatesPolygon', function (MDUMarket, $http, $q) {
        var statesJson, statesKeys;

        return {
            initialize: function () {
                var defer = $q.defer();

                $http.get('/assets/polygon/states.json').then(function (response) {
                    statesKeys = _.keys(MDUMarket.dimensions.discrete.state.values);
                    statesJson = response.data;
                    statesJson.features = _.reject(statesJson.features, function (feat) {
                        return !_.contains(statesKeys, feat.properties.name)
                    });
                    defer.resolve();
                });

                return defer.promise;
            },
            get: function () {
                var statesDiscreteValues = MDUMarket.dimensions.discrete.state.values;

                angular.forEach(statesJson.features, function (feat) {
                    var _stateName = feat.properties.name;
                    feat.properties.density = typeof statesDiscreteValues[_stateName].predict != 'string' ? statesDiscreteValues[_stateName].predict : 0;
                });

                return statesJson;
            }
        }
    })
    .factory('ConvertToCSV', function ($log) {
        return function (items, config) {
            var str = '';

            (function setHeaders() {
                var line = '';
                for (var i = 0; i < config.length; i++) {
                    var reportFieldConfig = config[i];
                    if (line != '') line += ','

                    line += reportFieldConfig.title;
                }
                str += line + '\r\n';
            })();

            (function setFields() {
                for (var i = 0; i < items.length; i++) {
                    var line = '',
                        item = items[i];

                    for (var j = 0; j < config.length; j++) {
                        var reportFieldConfig = config[j],
                            itemField = reportFieldConfig.accessor ? item[reportFieldConfig.accessor][reportFieldConfig.key] : item[reportFieldConfig.key];
                        if (line != '') line += ','

                        if (reportFieldConfig.method) {
                            try {
                                line += '"' + (reportFieldConfig.method(item) || '') + '"';
                            } catch (e) {
                                $log.info('Could not call method on ' + reportFieldConfig.key);
                            }
                        } else if (_.isArray(itemField)) {
                            var reportArrayLine = '';

                            try {
                                for (var k = 0; k < itemField.length; k++) {
                                    var reportArrayObj = itemField[k],
                                        reportArrayFields = reportFieldConfig.fields || _.keys(reportArrayObj),
                                        objLineArray = [];

                                    if (reportArrayLine != '') reportArrayLine += ', ';
                                    angular.forEach(reportArrayFields, function (fieldKey) {
                                        if (reportFieldConfig.fieldsFormat && reportFieldConfig.fieldsFormat.hasOwnProperty(fieldKey)) {
                                            objLineArray.push(reportFieldConfig.fieldsFormat[fieldKey](reportArrayObj[fieldKey]));
                                        } else {
                                            objLineArray.push(reportArrayObj[fieldKey]);
                                        }
                                    });

                                    reportArrayLine += objLineArray.join(reportFieldConfig.separator || ' - ');
                                }

                                line += ('"' + reportArrayLine + '"');
                            }
                            catch (e) {
                            }
                        } else {
                            line += '"' + (itemField || '') + '"';
                        }
                    }

                    str += line + '\r\n';
                }
            })();

            return str;
        }
    })
    .factory('MarketModals', function () {
            var modals = {};

        modals.savedSearch = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            dialogFade: true,
            backdropFade: true,
            templateUrl: '/app/market/templates/market.modals.saved-search.html?v=' + Date.now(),
            controller: 'SavedSearchModalCtrl'
        };

        modals.carousel = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            dialogFade: true,
            backdropFade: true,
            templateUrl: '/app/market/templates/market.modals.carousel.html?v=' + Date.now().feedback,
            controller: 'CarouselModalCtrl'
        };

        modals.customFieldDimensions = {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            dialogFade: true,
            backdropFade: true,
            templateUrl: '/app/market/templates/market.modals.custom-field-dimensions.html?v=' + Date.now().feedback,
            controller: 'CustomFieldDimensionsModalCtrl'
        };

        return modals;
    })
    .factory('MarketState', function (NewsMarket) {
        return {
            map: {
                newsThreshold: 10,
                zoom: 5,
                center: [32.0667, -90.3000],
                isNewsDisabled: function () {
                    return (this.zoom < this.newsThreshold) || !NewsMarket.initialized;
                },
                tiles: 'ROADMAP'
            },
            powers: {},
            collapsed: false
        }
    });
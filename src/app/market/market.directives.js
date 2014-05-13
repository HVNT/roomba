angular.module('rescour.app')
    .directive('slider', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                function setupSlider() {
                    $(element).slider({
                        range: true,
                        min: 0,
                        max: 100,
                        // Calculate percentages based off what the low selected and high selected are
                        values: [
                            (((scope.range.lowSelected - scope.range.low) / (scope.range.high - scope.range.low)) * 100),
                            (((scope.range.highSelected - scope.range.low) / (scope.range.high - scope.range.low)) * 100)
                        ],
                        step: 1,
                        slide: function (event, ui) {
                            scope.$apply(function () {
                                scope.range.lowSelected = (((ui.values[0] / 100) * (scope.range.high - scope.range.low)) + scope.range.low);
                                scope.range.highSelected = (((ui.values[1] / 100) * (scope.range.high - scope.range.low)) + scope.range.low);
                            });
                        },
                        stop: function (event, ui) {
                            scope.$apply(function () {
                                scope.filter();
                            });

                            // WHY THE FUCK DO I NEED TO CALL THIS TWICE??
                            scope.$apply();
                        }
                    });
                }

                scope.$on('RangesDefined', function () {
                    setupSlider();
                });

                setupSlider();
            }
        };
    })
    .directive('disableAnimation',
    function ($animate) {
        return {
            link: function (scope, element, attrs) {
                $animate.enabled(false, element);
            }
        };
    })
    .directive('savedSearchInput',
    function ($timeout, $document, $parse) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var modelIgnore = 'Untitled Search',
                    modelPrevious = modelIgnore,
                    prevAttributeTitle;

                function checkEmpty() {
                    if (!modelCtrl.$viewValue) {
                        modelCtrl.$viewValue = modelPrevious;
                        modelCtrl.$render();
                    }
                }

                element.bind('focus', function (e) {
                    scope.$apply(function () {
                        prevAttributeTitle = scope.dimensions.title;
                        if (modelCtrl.$viewValue === modelIgnore) {
                            modelPrevious = modelCtrl.$viewValue;
                            modelCtrl.$viewValue = '';
                            modelCtrl.$render();
                        }

                        element.bind('keydown', function (e) {
                            if (e.which === 13 || e.which === 9) {
                                element.blur();
                            }
                        });
                    });
                });

                element.bind('blur', function (e) {
                    scope.$apply(function () {
                        if (prevAttributeTitle !== scope.dimensions.title) {
                            scope.dimensions.modified = true;
                        }
                        checkEmpty();
                    });
                });

                $timeout(checkEmpty, 0);
            }
        };
    })
    .directive('map',
    function ($compile, $location, MDUMarket, StatesPolygon, NewsMarket, $filter, $state, MarketState, $rootScope) {
        return {
            restrict: "A",
            transclude: true,
            template: '<div class="map"></div>',
            link: function (scope, element, attrs, ctrl) {
                function getColor(d) {
                    return d > 1000 ? '#800026' :
                        d > 500 ? '#BD0026' :
                            d > 200 ? '#E31A1C' :
                                d > 100 ? '#FC4E2A' :
                                    d > 50 ? '#FD8D3C' :
                                        d > 25 ? '#FEB24C' :
                                            d > 0 ? '#FED976' :
                                                '#999';
                }

                function style(feature) {
                    return {
                        fillColor: getColor(feature.properties.density),
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.6
                    };
                }

                var defaultLatLng = new L.LatLng(32.0667, -90.3000),
                    defaultZoom = 5,
                    $el = element.find(".map")[0],
                    markers = new L.MarkerClusterGroup({disableClusteringAtZoom: 10, spiderfyOnMaxZoom: false, spiderfyDistanceMultiplier: 0.1}),
                    isPopupOpen = false,
                    activeMarker, activePopup, map;

                map = new L.Map($el, {center: (MarketState.map.center || defaultLatLng), zoom: (MarketState.map.zoom || defaultZoom), zoomControl: false, attributionControl: false});

                var RescourIcon = L.Icon.extend({
                    options: {
                        shadowUrl: '/assets/img/marker-shadow.png',
                        iconSize: [25, 45],
                        iconAnchor: [12, 45],
                        popupAnchor: [0, -45],
                        shadowSize: [41, 41]
                    }
                });

                var icons = {
                    'success': new RescourIcon({
                        iconUrl: '/assets/img/marker-icon-green.png'
                    }),
                    'warning': new RescourIcon({
                        iconUrl: '/assets/img/marker-icon-orange.png'
                    }),
                    'danger': new RescourIcon({
                        iconUrl: '/assets/img/marker-icon-red.png'
                    }),
                    'inverse': new RescourIcon({
                        iconUrl: '/assets/img/marker-icon-black.png'
                    })
                };

                scope.$on('Tiles.SATELLITE', function () {
                    map.removeLayer(googleLayer);
                    googleLayer = new L.Google('SATELLITE');
                    map.addLayer(googleLayer);
                });

                scope.$on('Tiles.ROADMAP', function () {
                    map.removeLayer(googleLayer);
                    googleLayer = new L.Google('ROADMAP');
                    map.addLayer(googleLayer);
                });

                scope.$on('Tiles.TERRAIN', function () {
                    map.removeLayer(googleLayer);
                    googleLayer = new L.Google('TERRAIN');
                    map.addLayer(googleLayer);
                });

                scope.$on('Tiles.HYBRID', function () {
                    map.removeLayer(googleLayer);
                    googleLayer = new L.Google('HYBRID');
                    map.addLayer(googleLayer);
                });

                var googleLayer = new L.Google(MarketState.map.tiles);

                map.addLayer(googleLayer);
                map.addControl(new L.Control.Zoom({ position: 'topright' }));

                var info = L.control({position: 'topleft'});

                info.onAdd = function (map) {
                    this.isVisible = true;
                    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                    this.update();
                    return this._div;
                };

                info.onRemove = function (map) {
                    this.isVisible = false;
                };

                // method that we will use to update the control based on feature properties passed
                info.update = function (props) {
                    this._div.innerHTML = props ?
                        '<h5>' + props.name + ' Listings: ' + props.density + '</h5>' :
                        '<h5> Select a State </h5>'

                };

                var resetControl = L.control({position: 'topleft'});

                resetControl.onAdd = function (map) {
                    this.isVisible = true;
                    this._div = L.DomUtil.create('div', 'info reset-view'); // create a div with a class "info"

                    var stop = L.DomEvent.stopPropagation;

                    function resetView() {
                        map.setView(defaultLatLng, defaultZoom);
                    }

                    L.DomEvent
                        .on(this._div, 'click', stop)
                        .on(this._div, 'mousedown', stop)
                        .on(this._div, 'dblclick', stop)
                        .on(this._div, 'click', L.DomEvent.preventDefault)
                        .on(this._div, 'click', resetView, this);

                    this.update();
                    return this._div;
                };

                scope.$on('GlobalReset', function() {
                    map.setView(defaultLatLng, defaultZoom);
                });

                scope.$watch(function () {
                    return map.getZoom();
                }, function (newVal) {
                    MarketState.map.zoom = newVal;
                });

                resetControl.onRemove = function (map) {
                    this.isVisible = false;
                };

                // method that we will use to update the control based on feature properties passed
                resetControl.update = function (props) {
                    this._div.innerHTML = '<h5> Reset View </h5>'

                };

                var legend = L.control({position: 'bottomleft'});

                legend.onAdd = function (map) {
                    var div = L.DomUtil.create('div', 'info legend'),
                        grades = [1, 25, 50, 100, 200, 500, 1000],
                        labels = [];

                    this.isVisible = true;
                    // loop through our density intervals and generate a label with a colored square for each interval
                    for (var i = 0; i < grades.length; i++) {
                        div.innerHTML +=
                            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                    }

                    return div;
                };

                legend.onRemove = function (map) {
                    this.isVisible = false;
                };
                var newsLayerGroup = L.layerGroup().addTo(map),
                    newsIcon = L.icon({
                        iconUrl: '/assets/img/rss1.png',
                        iconSize: [25, 25],
                        iconAnchor: [12, 25],
                        popupAnchor: [0, -25]
                    });

                var geoLayer;

                function initGeoJsonLayer() {
                    clearMDULayers();
                    clearNewsLayers();
                    MDUMarket.includeNA('latitude').includeNA('longitude');
                    resetBounds();

                    function highlightFeature(e) {
                        var layer = e.target;

                        layer.setStyle({
                            weight: 5,
                            color: '#666',
                            dashArray: '3',
                            fillOpacity: 0.9
                        });

                        if (!L.Browser.ie && !L.Browser.opera) {
                            layer.bringToFront();
                        }

                        info.update(layer.feature.properties);
                    }

                    function resetHighlight(e) {
                        geoLayer.resetStyle(e.target);
                        info.update();
                    }

                    function zoomToFeature(e) {
                        map.fitBounds(e.target.getBounds());
                    }

                    function onEachFeature(feature, layer) {
                        layer.on({
                            mouseover: highlightFeature,
                            mouseout: resetHighlight,
                            click: zoomToFeature
                        });
                    }

                    geoLayer = L.geoJson(StatesPolygon.get(), {style: style, onEachFeature: onEachFeature});
                    geoLayer.addTo(map);
                    info.addTo(map);
                    legend.addTo(map);
                }

                scope.showDetails = function (item) {
                    $state.go('market.mdu.list.details.pane', {itemId: item.id, pane: 'details'});
                };

                scope.showPictures = function (item) {
                    $state.go('market.mdu.list.details.pane', {itemId: item.id, pane: 'pictures'});
                };

                function mduPopupTpl(item) {
                    var $scope = scope.$new();
                    $scope.hoveredItem = item;

                    var MDUPopupElement = angular.element("<div>\n    <div class=\"popup-striped-container popup-header btn-bg--{{ hoveredItem.getStatus() }}\"\n         ng-click=\"showDetails(hoveredItem)\">\n        <h4> {{ hoveredItem.title }} </h4>\n    </div>\n    <div class=\"popup-main-container clearfix\">\n        <div class=\"media\">\n            <div class=\"media__img preview\" ng-click=\"showPictures(hoveredItem)\">\n                <div class=\"preview__mask\"><i class=\"fa fa-search\"></i></i></div>\n                <img class=\"preview__img preview__img--thumb\" ng-src=\"{{ hoveredItem.thumbnail }}\" alt=\"\"></div>\n            <ul class=\"media__bd\">\n                <li><strong>{{ hoveredItem.numberUnits }}</strong> Units</li>\n                <li>Built in <strong>{{ hoveredItem.yearBuilt }}</strong></li>\n                <li><strong>{{ hoveredItem.broker }}</strong></li>\n                <li><strong>{{ hoveredItem.address.city }}, {{ hoveredItem.address.state }}</strong></li>\n            </ul>\n        </div>\n        \n    </div>\n    <div class=\"popup-striped-container popup-footer\"><p>\n        {{hoveredItem.address.street1}}</p>\n    </div>\n</div>");

                    return $compile(MDUPopupElement)($scope);
                }

                function openPopup(item, templateFn) {
                    var checkNearPopup = function (e) {
                        function isNear(element, distance, event) {

                            var left = element.offset().left - distance,
                                top = element.offset().top - distance,
                                right = left + element.width() + distance,
                                bottom = top + element.height() + 4 * distance,
                                x = event.pageX,
                                y = event.pageY;

                            return ( x > left && x < right && y > top && y < bottom );
                        };

                        if (activeMarker && activePopup) {
                            if (isNear(activePopup, 50, e.originalEvent)) {
                                activeMarker.pristine = false;
                            } else if (!activeMarker.pristine) {
                                closeActivePopup();
                                map.off('mousemove', checkNearPopup);
                            }
                        }
                    };

                    scope.item = item;
                    activePopup = templateFn(item);
                    activeMarker = item.marker.bindPopup(activePopup[0], {closeButton: false, minWidth: 325});
                    map.on('mousemove', checkNearPopup);

                    return item.marker.openPopup();
                }

                function initMarkers() {
                    angular.forEach(MDUMarket.items, function (item) {
                        if (item.location) {
                            item.marker = new L.Marker(new L.LatLng(item.location[0], item.location[1]), { title: item.title, icon: icons[item.getStatus()] });

                            item.marker.on("click", function (e) {
                                scope.$apply(function () {
                                    scope.showDetails(item);
                                });
                            });

                            // Bind mouseover popup
                            item.marker.on('mouseover', function (e) {
                                openPopup(item, mduPopupTpl);
                            });
                        }
                    });
                }

                function clearMDULayers() {
                    markers.clearLayers();

                    if (geoLayer) {
                        map.removeLayer(geoLayer);
                    }
                    if (info.isVisible) {
                        info.removeFrom(map);
                    }
                    if (legend.isVisible) {
                        legend.removeFrom(map);
                    }

                    if (resetControl.isVisible) {
                        resetControl.removeFrom(map);
                    }
                }

                function clearNewsLayers() {
                    newsLayerGroup.clearLayers();
                    MarketState.map.isNewsToggled = false;
                }

                function applyBounds(marketplace) {
                    var bounds = map.getBounds(),
                        latHighBound = bounds._northEast.lat,
                        lngHighBound = bounds._northEast.lng,
                        latLowBound = bounds._southWest.lat,
                        lngLowBound = bounds._southWest.lng;

                    marketplace
                        .applyRange('latitude', latLowBound, latHighBound)
                        .applyRange('longitude', lngLowBound, lngHighBound)
                        .excludeNA('latitude').excludeNA('longitude');
                }

                function resetBounds() {
                    var _lat = MDUMarket.dimensions.range.latitude,
                        _lng = MDUMarket.dimensions.range.longitude;

                    _lat.highSelected = _lat.high;
                    _lng.highSelected = _lng.high;
                    _lat.lowSelected = _lat.low;
                    _lng.lowSelected = _lng.low;

                    scope.render();
                }

                function renderMarkerCluster() {
                    for (var i = scope.items.length - 1; i >= 0; i--) {
                        var _item = scope.items[i];
                        if (_item.isVisible && _item.location) {
                            markers.addLayer(_item.marker);
                        }
                    }
                    map.addLayer(markers);
                }

                function renderMDUsFromBounds() {
                    clearMDULayers();
                    resetControl.addTo(map);
                    applyBounds(MDUMarket);
                    scope.render();
                    renderMarkerCluster();
                }

                function renderMap(e) {
//                    googleLayer._update();
                    var currentZoomLevel = map.getZoom();
                    if (currentZoomLevel < 6) {
                        initGeoJsonLayer();
                    } else {
                        if (currentZoomLevel < 10 && MarketState.map.isNewsToggled) {
                            clearNewsLayers();
                        } else if (MarketState.map.isNewsToggled) {
                            renderNews();
                        }
                        renderMDUsFromBounds();
                    }
                }

                function moveEventHandler(e) {
                    if (!isPopupOpen) {
                        scope.$apply(renderMap);
                    }
                }

                function closeActivePopup() {
                    if (activeMarker) {
                        activeMarker.closePopup();
                        activeMarker = null;
                        activePopup = null;
                    }
                }

                map.on('dragend', moveEventHandler);
                map.on('zoomend', moveEventHandler);
                map.on('popupopen', function () {
                    isPopupOpen = true;
                });

                map.on('popupclose', function () {
                    isPopupOpen = false;
                });

                map.on('dragstart', function () {
                    closeActivePopup();
                });

                map.on('zoomstart', function () {
                    closeActivePopup();
                });

                scope.$on('UpdateMap', renderMap);

                scope.$on('window-resized', function () {
                    map.invalidateSize();
                });

                scope.$on('CenterMap', function (event, item) {
                    if (item.marker) {

                        if (map.getZoom() < 6) {
                            renderMDUsFromBounds();
                        }

                        markers.zoomToShowLayer(item.marker, function () {
                            openPopup(item, mduPopupTpl);
                            activeMarker.pristine = true;
                        });
                    }
                });

                function newsPopupTemplate(item) {
                    var popupTempl = "<div class=\"news-popup-header\"><a target=\"_blank\" href=\"" + item.url + "\">" + "<h5>" + item.title + "</h5>" +
                        "</a><span>Posted on " + $filter('date')(item.date) + "<span></div>"

                    var popupElement = $compile(popupTempl)(scope);

                    return popupElement;
                }

                function addNewsMarkers(visibleNews) {
                    newsLayerGroup.clearLayers();

                    angular.forEach(visibleNews, function (news) {
                        news.marker = new L.Marker(new L.LatLng(news.latitude, news.longitude), { title: news.title, icon: newsIcon });
                        news.marker.on('mouseover', function (e) {
                            openPopup(news, newsPopupTemplate);
                        });

                        news.marker.on('click', function (e) {
                            openPopup(news, newsPopupTemplate);
                        });
                        newsLayerGroup.addLayer(news.marker);
                    });

                }

                function renderNews() {
                    clearNewsLayers();
                    applyBounds(NewsMarket);
                    addNewsMarkers(NewsMarket.apply());
                    NewsMarket.predict();
                    MarketState.map.isNewsToggled = true;
                }

                scope.$on('DisplayNews', function (e) {
                    if (!MarketState.map.isNewsToggled) {
                        renderNews();
                    } else {
                        clearNewsLayers();
                    }
                });

                initMarkers();
                renderMap();

                scope.$on('$destroy', function (event) {
                    MarketState.map.center = map.getCenter();
                    MarketState.map.zoom = map.getZoom();
                })
            }
        };
    });
/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 4:05 PM
 * File: /core/utility/utility.js
 */

angular.module('rescour.utility', [])
    .filter('limitVisible', ['$document', function ($document) {
        return function (input, limit, exceptions) {
            var visibleItems = [];
            _.each(input, function (item) {
                if (item.isVisible) {
                    visibleItems.push(item);
                }
            });
            return visibleItems;
        };
    }])
    .filter('ellipsis', function () {
        return function (input, limit, exceptions) {
            if (input !== 'No description provided' && input.length > limit) {
                return input.substr(0, limit) + "...";
            } else {
                return input;
            }
        };
    })
    .filter('percentage', function () {
        return function (input, limit, exceptions) {
            var num = parseFloat(input);
            return num.toFixed(3) + " %";
        };
    })
    .directive("passwordVerify", function () {
        return {
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {

                scope.$watch(function () {
                    return scope.$eval(attrs.passwordVerify);
                }, function (newVal) {
                    ctrl.$viewValue = "";
                    ctrl.$modelValue = "";
                    ctrl.$render();
                    ctrl.$setValidity("passwordMatch", false);
                });

                ctrl.$parsers.unshift(function (viewValue) {
                    var origin = scope.$eval(attrs.passwordVerify);
                    if (viewValue === origin) {
                        ctrl.$setValidity('passwordMatch', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('passwordMatch', false);
                        return undefined;
                    }
                });
            }
        };
    })
    .directive('passwordValidate', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {

                    scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? 'valid' : undefined);
                    scope.pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? 'valid' : undefined;
                    scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

                    if (scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber) {
                        ctrl.$setValidity('passwordValid', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('passwordValid', false);
                        return undefined;
                    }
                });
            }
        };
    })
    .directive('ngBlur', ['$parse', function ($parse) {
        return function (scope, element, attr) {
            var fn = $parse(attr['ngBlur']);
            element.bind('blur', function (event) {
                scope.$apply(function () {
                    fn(scope, {$event: event, $element: element});
                });
            });
        };
    }])
    .directive('autoSave', ['$parse', '$timeout', function ($parse, $timeout) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attr) {
                var fn = $parse(attr['autoSave']);
                element.bind('blur', function (event) {
                    scope.$apply(function () {
                        fn(scope, {$event: event});
                    });
                });
                scope.$on('autoSaveSuccess', function () {
                    element.addClass('auto-save-success');
                    $timeout(
                        function () {
                            element.removeClass('auto-save-success');
                        },
                        400
                    );
                });
                element.addClass('auto-save');
            }
        };
    }])
    .directive('fadeAfter', ['$timeout', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                if (parseInt(attrs.fadeAfter, 10)) {
                    $timeout(function () {
                        element.fadeOut(700);
                    }, attrs.fadeAfter);
                }
            }
        };
    }])
    .directive('fade', function () {
        return function (scope, element, attr) {
            scope.$watch(attr.fade, function (value) {
                !!value ? element.fadeIn(700) : element.fadeOut(700);
            });
        };
    })
    .directive('fadeIn', function () {
        return function (scope, element, attr) {
            scope.$watch(attr.fadeIn, function (value) {
                !!value ? element.fadeIn(500) : element.hide();
            });
        };
    })
    .directive('chunk', ['$timeout', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                var raw = element[0],
                    currentSlice,
                    chunkSize = parseInt(attrs.chunkSize, 10) || 10;

                function initChunk() {
                    scope.visibleItems = scope.$eval(attrs.chunk);
                    // If a filter is provided, apply filter to set and return
                    currentSlice = chunkSize;
                    scope.chunk = scope.visibleItems.slice(0, chunkSize);
                }

                element.bind('scroll', function () {
                    // Check if within bottom of scrollable div
                    if ((raw.scrollTop + raw.offsetHeight) >= raw.scrollHeight) {
                        // increase chunkSize and re-filter
                        scope.$apply(function () {
                            // take next limit
                            scope.chunk = scope.chunk.concat(scope.visibleItems.slice(currentSlice, currentSlice += chunkSize));
                        });
                    }
                });

                scope.$watch(function (newScope) {
                    if (!angular.equals(scope.$eval(attrs.chunk), newScope.visibleItems)) {
                        raw.scrollTop = 0;
                        initChunk();
                    }
                });
            }
        };
    }])
    .directive("formatInput", ['$filter', '$timeout', '$parse', function ($filter, $timeout, $parse) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                // view -> model
                elm.bind('blur', function () {
                    scope.$apply(function () {
                        applyFilter(attrs.formatInput);
                    });
                });

                function applyFilter(formatInput) {
                    formatInput = formatInput || attrs.formatInput;
                    if (ctrl.$modelValue) {
                        ctrl.$viewValue = $filter(formatInput)(ctrl.$modelValue);
                        ctrl.$render();
                    } else {
                        ctrl.$viewValue = undefined;
                        ctrl.$render();
                    }
                }

                ctrl.$parsers.push(function (viewVal) {
                    return viewVal.replace(/\,/g, '');
                });

                elm.bind('focus', function () {
                    scope.$apply(function () {
                        ctrl.$viewValue = ctrl.$modelValue;
                        ctrl.$render();
                    });
                });

                attrs.$observe('formatInput', function (val) {
                    if (val) {
                        ctrl.$viewValue = $filter(val)(ctrl.$modelValue);
                        ctrl.$render();
                    }
                });

                // load init value from DOM
                $timeout(function () {
                    applyFilter(attrs.formatInput);
                }, 0);
            }
        };
    }])
    .directive('scrollContainer', ['$window', '$document', '$timeout',
        function ($window, $document, $timeout) {
            return {
                restrict: 'C',
                link: function (scope, element, attrs) {
                    function calcElementHeight(e) {
                        // find siblings
                        var _siblings = $(e).siblings(),
                            _siblingsHeight = 0,
                            _windowHeight = $window.innerHeight,
                            _headerHeight = $document.find('header')[0].clientHeight;
                        ;

                        for (var i = 0; i < _siblings.length; i++) {
                            _siblingsHeight += $(_siblings[i]).height();
                        }

                        return (_windowHeight - _siblingsHeight - _headerHeight) + 'px';
                    }

                    angular.element($window).bind('resize', _.debounce(function () {
                        element.css({'height': calcElementHeight(element)});
                    }, 300));

                    $timeout(function () {
                        element.css({'height': calcElementHeight(element)});
                    }, 0);
                }
            };
        }])
    .directive('inputDropdown', ['$document',
        function ($document) {
            return {
                restrict: 'C',
                link: function (scope, element, attrs) {
                    var ddBtn = element.find('.input-dropdown-btn');
                    var ddMenu = element.find('.input-dropdown-menu');

                    scope.$on('destroyDropdowns', close);

                    function open(e) {
                        if (e) {
                            e.stopPropagation();
                            e.preventDefault();
                        }

                        console.log("hi");
                        scope.$broadcast('destroyDropdowns');
                        scope.$broadcast('destroyTooltips');

                        if (!scope.isOpen) {
                            scope.$apply(function () {
                                ddMenu.show();
                                scope.isOpen = true;
                                $document.bind('click', close);
                                ddBtn.unbind('click', open);
                            });
                        } else {
                            close();
                        }
                    }

                    function close(e) {
                        scope.$apply(function () {
                            if (scope.isOpen) {
                                ddMenu.hide();
                                scope.isOpen = false;
                                $document.unbind('click', close);
                                ddBtn.bind('click', open);
                            }
                        });
                    }

                    ddBtn.bind('click', open);
                }
            };
        }]);
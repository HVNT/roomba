angular.module('rescour.filters')
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
    .filter('roundingPercentage', function () {
        return function (input, bound) {
            var num = parseFloat(input);
            return num.toFixed(bound) + " %";
        };
    })
    .filter('checkBounds', function () {
        return function (input, limit, e) {
            return input == limit ? input + "+" : input;
        }
    })
    .filter('filterBy', function () {
        return function (items, category, text) {
            var newItems = [];

            if (items && text) {
                var textRegEx = new RegExp(text, 'i');
                for (var i = items.length - 1; i >= 0; i--) {
                    var _item = items[i];

                    if (_item[category].match(textRegEx)) {
                        newItems.push(_item);
                    }
                }

            } else if (items) {
                for (var i = 0; i < items.length; i++) {
                    var obj = items[i];
                    newItems.push(obj);
                }
            }

            return newItems;
        }
    })
    .filter('capitalize', function() {
        return function(input, scope) {
            if (input!=null)
                input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
        }
    })
    .filter('integer', function () {
        return function (n) {
            return parseInt(n, 10);
        };
    });

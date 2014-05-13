/**
* Created with WebStorm.
* User: hunt
* Date: 5/7/14
* Time: 4:23 PM
* File:
*/
angular.module('rescour.animations')
    /* REPEATER ANIMATIONS */
    .animation('.ani-repeater--simple-fade', function () {
        return {
            enter : function(element, done) {
                jQuery(element).css({
                    opacity:0
                });
                jQuery(element).animate({
                    opacity:1
                }, done);
            },
            leave : function(element, done) {
                jQuery(element).css({
                    opacity:1
                });
                jQuery(element).animate({
                    opacity:0
                }, done);
            },
            move : function(element, done) {
                jQuery(element).css({
                    opacity:0.5
                });
                jQuery(element).animate({
                    opacity:1
                }, done);
            }
        };
    })
    .animation('.ani-repeater--slider-offset-fade', function () {
        return {
            enter : function(element, done) {
                jQuery(element).css({
                    left:-50,
                    opacity:0
                });
                jQuery(element).animate({
                    left:0,
                    opacity:1
                }, done);
            },
            leave : function(element, done) {
                jQuery(element).css({
                    left:0,
                    opacity:1
                });
                jQuery(element).animate({
                    left:50,
                    opacity:0
                }, done);
            },
            move : function(element, done) {
                jQuery(element).css({
                    opacity:0.5
                });
                jQuery(element).animate({
                    opacity:1
                }, done);
            }
        };
    })
    /* ACCORDION ANIMATIONS */
    .animation('.ani-accordion', function () {
        return {
            enter : function(element, done) {
                jQuery(element).css({
                    height: 0,
                    margin: 0,
                    opacity:0
                });
                jQuery(element).animate({
                    height: '100%',
                    paddingLeft: 17,
                    paddingRight: 17,
                    opacity:1
                }, done);
            },
            leave : function(element, done) {
                jQuery(element).css({
                    height: '100%',
                    paddingLeft: 17,
                    paddingRight: 17,
                    opacity:1
                });
                jQuery(element).animate({
                    height: 0,
                    margin: 0,
                    opacity:0
                }, done);
            },
            move : function(element, done) {
                jQuery(element).css({
                    opacity:0.5
                });
                jQuery(element).animate({
                    opacity:1
                }, done);
            }
        };
    });


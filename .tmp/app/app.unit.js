/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 8/28/13
 * Time: 9:08 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

describe('roomba.app', function() {

    beforeEach(function() {
        module('roomba.app');
    });

    it('should provide a $collection value', inject(function($collections) {
        expect($collections.listings.title).toBe('Listings');
    }));
});
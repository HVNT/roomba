/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/13/14
 * Time: 10:54 AM
 * File:
 */


angular.module('rescour.mock', ['rescour.roomba', 'ngMockE2E'])
// Dummy Calls
    .run(['$httpBackend', '$timeout', 'Utilities', function ($httpBackend, $timeout, Utilities, $log) {

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




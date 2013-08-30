'use strict';
require(
    {
        shim: {
            'app/app': {
                deps: [
                    'components/angular/angular',
                    'components/underscore/underscore',
                    'components/angular-ui-bootstrap-bower/ui-bootstrap',
                    'components/jquery-ui/jquery-ui',
                    'components/jquery/jquery',
                    'core/auth/auth',
                    'core/user/user',
                    'core/utility/utility',
                    'core/spinner/spinner',
                    'core/browser-detect/browser-detect',
                    'core/marketplace/marketplace',
                
                    'core/config/local'
                
                ]
            },
            'components/jquery-ui/jquery-ui': {
                deps: ['components/jquery/jquery']
            },
            'components/angular-ui-bootstrap-bower/ui-bootstrap': {
                deps: ['components/angular/angular']
            },
            'app/market/market': {
                deps: ['app/app']
            },
            'app/login/login': {
                deps: ['app/app']
            },
            'app/bootstrap': {
                deps: ['app/app']
            }
            
            ,'app/mock': {
                deps: [
                    'components/angular-mocks/angular-mocks',
                    'app/app'
                ]
            }
            
        }
    },
    [
        'require',
        'components/jquery-ui/jquery-ui',
        'components/angular-ui-bootstrap-bower/ui-bootstrap',
        'components/angular/angular',
        'app/market/market',
        'app/login/login'
    ]
    
    ,function (require) {
            return require(['app/mock']);
        }
    
);


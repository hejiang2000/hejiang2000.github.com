angular.module('app.config', ['ionic'])

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('buttom');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

        /* 设置 Ajax 请求头
        $httpProvider.defaults.headers.common = {
            "X-Requested-With": "XMLHttpRequest"
        };
        */
        $stateProvider
            .state('signin', {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                cache: false,
                controller: 'SignInCtrl'
            })

            .state('tabs', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tabs.home', {
                url: '/home',
                views: {
                    'tabs-home': {
                        templateUrl: 'templates/tab-home.html',
                        cache: false,
                        controller: 'TodayCtrl'
                    }
                }
            })
            .state('tabs.flight', {
                url: '/flight',
                views: {
                    'tabs-flight': {
                        templateUrl: 'templates/tab-flight.html',
                        cache: false,
                        controller: 'FlightCtrl'
                    }
                }
            })

            .state('tabs.Search', {
                url: '/Search',
                views: {
                    'tabs-home': {
                        templateUrl: 'templates/tab-Search.html',
                        cache: false,
                        controller: 'SearchCtrl'
                    }
                }
            })
            .state('home-detail', {
                url: '/chats/:MessageId',
                templateUrl: 'templates/chat-detail.html',
                cache: false,
                controller: 'ChatDetailCtrl'
            })

            .state('tabs.bridge', {
                url: '/bridge',
                views: {
                    'tabs-bridge': {
                        templateUrl: 'templates/tab-bridge.html',
                        cache: false,
                        controller: 'BridgeCtrl'
                    }
                }
            })
            .state('tabs.changespassword', {
                url: '/change-password',
                views: {
                    'password-tab': {
                        templateUrl: 'templates/change-password.html',
                        cache: false,
                        controller: 'MineCtrl'
                    }
                }
            })

        $urlRouterProvider.otherwise('/sign-in');

    })

angular.module('dengjiqiao', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'htmlModule'])

    .run(function ($ionicPlatform, $location, $rootScope, $ionicHistory, $ionicPopup, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            // enable background mode
            if (window.cordova && window.cordova.plugins && cordova.plugins.backgroundMode) {

                cordova.plugins.backgroundMode.enable();

                // disable webview optimization and enable media play
                cordova.plugins.backgroundMode.on('activate', function () {
                    cordova.plugins.backgroundMode.disableWebViewOptimizations();
                });

                // set default info
                cordova.plugins.backgroundMode.setDefaults({
                    title: "登机桥手持端正在后台运行",
                    text: "请点击这里打开操作界面",
                    icon: 'icon', // this will look for icon.png in platforms/android/res/drawable|mipmap
                    color: 'F14F4D', // hex format like 'F14F4D'
                    resume: true,
                    hidden: false,
                    bigText: true
                });
            }
        });

        $ionicPlatform.registerBackButtonAction(function (e) {
            console.log("按下了android返回键");
            console.log("path:" + $location.path());
            console.log($rootScope.im_cancel);
            e.preventDefault();

            function showConfirm() {
                var confirmPopup = $ionicPopup.confirm({
                    title: '<strong>退出应用?</strong>',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    } else {
                        // Don't close
                    }
                });
            }

            // Is there a page to go back to?
            if ($location.path() == '/sign-in') {
                showConfirm();
            } else if ($ionicHistory.backView() && $rootScope.im_cancel != true) {
                showConfirm();
            } else if ($rootScope.im_cancel != true) {
                // This is the last page: Show confirmation popup
                showConfirm();
            } else if ($location.path() == '/tab/home' && $rootScope.im_cancel == true) {
                console.log("二维码过程中按下了android返回键");
                $rootScope.im_cancel = false;
                console.log($rootScope.im_cancel);
            }

            return false;
        }, 101);
    })

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

    .controller('SignInCtrl', function ($scope, $state, $http, $timeout, $ionicPopup, apiContext) {
        $scope.user = {};
        var title = "操作员登录";
        var message = null;
        $scope.signIn = function (user) {
            $http.post(apiContext + "/html/system/login/index.html", user, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                console.info("user loggedin.", user, response);
                $state.go('tabs.home');
            }, function (response) {
                console.error("user failed to login", user, response);
                if ((response.status && response.status == '401') || response.status && response.status == '500') {
                    message = "输入的帐户名或者密码有误";
                } else {
                    message = "链接服务器异常";
                }
                $ionicPopup.alert({
                    title: title,
                    template: message
                });
            });
        };
    })

    .controller('MineCtrl', function ($ionicPopup, $state, $scope, $http, $cordovaProgress, locals, apiContext) {
        $scope.$on('$ionicView.enter', function () {
            $http.get(apiContext + "/api/bb/cn/changename").then(function (rs) {
                $scope.chats = rs.data.data[0][0];
            });
        });

        $scope.doaquit = function (rs) {

            var confirmPopup = $ionicPopup.confirm({
                title: '退出',
                template: '是否退出'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $http.post(apiContext + "/logout").success(function (rs) {
                        console.log(rs);
                    });

                    $state.go('signin');
                } else {
                    console.log('You are not sure');
                }
            });
        }

        // 检查更新
        $scope.checkUpdate = function () {
            $cordovaProgress.showBar(true, 100000, "正在更新...");
            window.chcp && window.chcp.fetchUpdate(function (error, data) {
                $cordovaProgress.hide();

                var title = "软件更新";
                var message = null;

                if (error) {
                    message = "检查更新失败。错误码：" + error.code + "（" + error.description + "）";
                    if (error.code == chcp.error.NOTHING_TO_UPDATE) {
                        message = "当前已经是最新版本。";
                    }

                } else {
                    message = "已更新到最新版本。";
                }

                $ionicPopup.alert({
                    title: title,
                    template: message
                });
            });
        }
    })

    .controller('TodayCtrl', function ($scope, $rootScope, $state, Chats, $http, locals, $ionicPopup, $timeout, $cordovaBarcodeScanner, apiContext, $cordovaVibration) {
        function update() {
            $http.get(apiContext + "/api/bb/home/duty").then(function (rs) {
                console.log(rs);
                $scope.chats = rs.data.data[0];
            });

            $http.get(apiContext + "/api/bb/home/message/list").then(function (rs) {


                $scope.texts = rs.data.data[0];
                $scope.x = {};

                for (x in rs.data.data[0]) {
                    if (rs.data.data[0][x].NeedSound == 1) {
                        srcFile = '/android_asset/www/media/music.mp3';
                        var my_media = new Media(srcFile, function () {
                                console.log("playAudio():Audio Success");
                            },
                            function (err) {
                                console.log("playAudio():Audio Error: " + err);
                            }
                        );

                        my_media.play();
                        console.log(rs.data.data[0][x]);
                        $cordovaVibration.vibrate(5000);

                    }

                }
                $rootScope.messages = $scope.texts;
            });

            timer = $timeout(update, 2000);
        }

        function cancelTimer($event) {
            timer && $timeout.cancel(timer);
        }

        update();

        var timer = null;
        $scope.$on("$destroy", cancelTimer);


        $scope.popupMessageOpthins = function (chat) {
            console.log(chat);
            var optionsPopup = $ionicPopup.confirm({
                /*templateUrl: "templates/popup.html",*/
                title: '确认信息',
                subTitle: "您已经到达" + chat.Bridge_Code + "号登机口,点击OK进行扫码认证",
                scope: $scope,
            });
            optionsPopup.then(function (res) {
                console.log(chat);
                if (res) {
                    console.log(chat);
                    $cordovaBarcodeScanner.scan().then(function (imageData) {
                        if (imageData.text == chat.Bridge_Code && imageData.cancelled == false) {
                            alert(imageData.text + '号登机桥已进行到位确认');
                            $http.post(apiContext + "/api/bb/home/message/reach", {
                                ID: chat.ID,
                                status: 1,
                                data: imageData.text
                            }).success(function () {
                                update();
                                alert("扫码成功");
                            }).error(function () {
                                update();
                                alert("扫码失败请再次扫描");
                            });
                        } else if (imageData.text != chat.Bridge_Code && imageData.cancelled == false) {
                            alert('请到达正确登机口');
                        } else if (imageData.cancelled == true) {
                            $rootScope.im_cancel = imageData.cancelled;
                        }
                        console.log("Barcode Format -> " + imageData.format);
                        console.log("Cancelled -> " + imageData.cancelled);
                    }, function (error) {
                        console.log("An error happened -> " + error);
                    });

                } else {
                    console.log('Cancel');
                }
            });

        };
    })

    .controller('BridgeCtrl', function ($scope, $rootScope, Chats, $http, locals, $ionicPopup, $timeout, $cordovaBarcodeScanner, apiContext) {
        $http.get(apiContext + "/api/bb/bridge/fightbridge").then(function (rs) {
            $scope.chats = rs.data.data[0];
            console.log(rs);
        });

        $scope.doRefresh = function () {
            $http.get(apiContext + "/api/bb/bridge/fightbridge").then(function (rs) {
                    $scope.chats = rs.data.data[0];
                    console.log(rs);
                })
                .finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $rootScope, $state, $cordovaVibration, $http, $stateParams, locals, Chats, $timeout, apiContext) {
        /*    $cordovaVibration.vibrate(100);*/
        angular.forEach($rootScope.messages, function (item) {
            if (item.ID == $stateParams.MessageId) {
                $scope.chat = item;
                return false;
            }
        });

        $scope.ok = function (status) {
            $http.post(apiContext + "/api/bb/home/message/edit", {
                ID: $stateParams.MessageId,
                status: status
            }).then(function () {
                // do nothing
            });

            $state.go('tabs.home');

        };

        $timeout(function () {
            $state.go('tabs.home'); //由于某种原因5秒后关闭弹出
        }, 5000);
    })
/*
    .controller('DashCtrl', function ($scope, Chats) {
        $scope.bridges = Chats.bridge();
        console.log(Chats.bridge());
    })
*/

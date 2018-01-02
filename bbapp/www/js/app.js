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

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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
                        controller: 'MainTabCtrl'
                    }
                }
            })
            .state('tabs.flight', {
                url: '/flight',
                views: {
                    'tabs-flight': {
                        templateUrl: 'templates/tab-flight.html',
                        cache: false,
                        controller: 'ChatFlightCtrl'
                    }
                }
            })

            .state('tabs.Search', {
                url: '/Search',
                views: {
                    'tabs-home': {
                        templateUrl: 'templates/tab-Search.html',
                        cache: false,
                        controller: 'ChatSearchCtrl'
                    }
                }
            })
            .state('home-detail', {
                url: '/chats/:MessageId',
                templateUrl: 'templates/chat-detail.html',
                cache: false,
                controller: 'MessageDetailCtrl'
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
                        controller: 'AboutTabCtrl'
                    }
                }
            })

        $urlRouterProvider.otherwise('/sign-in');

    })

    .controller('SignInCtrl', function ($scope, $ionicPopup, $state, $http, $timeout, apiContext) {
        
        $scope.user = {};

        $scope.signIn = function (user) {
            $http.post(apiContext + "/html/system/login/index.html", user, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                console.log(user);
                console.log(response);
                $state.go('tabs.home');
            }, function (response) {
                if ((response.status && response.status == '401') || response.status && response.status == '500') {
                    $ionicPopup.alert({
                        title: "登录失败",
                        template: "输入的帐户名或者密码有问题"
                    });
                } else {
                    $ionicPopup.alert({
                        title: "登录失败",
                        template: "链接服务器异常"
                    });
                    console.log(user);
                    console.log(response);
                    console.log('shibai');

                }
            });
        };
        
    })

    .controller('AboutTabCtrl', function ($ionicPopup, $state, $scope, $http, locals, apiContext) {
        
        console.log("tuichu");
        
        $scope.$on('$ionicView.enter', function () {
            $http.get(apiContext + "/api/bb/cn/changename").then(function (rs) {
				if (!rs.data.data)
					return;
                console.log("tuichu");
                console.log(rs);
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
        };

    })

    .controller('MainTabCtrl', function ($scope, $ionicPopup, $rootScope, $state, Chats, $http, locals, $ionicPopup, $timeout, $cordovaBarcodeScanner, apiContext, $cordovaVibration) {
        // 播放控制
        var media_repeat = false;
        
        // 打开 mp3 文件
        var media_file = '/android_asset/www/media/music.mp3';
        var media_handle = new Media(media_file, function () {
                console.log("playAudio():Audio Success");
            },
            function (err) {
                console.log("playAudio():Audio Error: " + err);
            },
            function (status) {
                // 如果 media_repeat 为真，持续播放Alarm
                if (status == 4 && media_repeat) {
                    media_handle && media_handle.play();
                }
            }
        );

        // 开始播放操作
        $rootScope.startAlarm = function(repeat) {
            media_repeat = repeat;
            media_handle && media_handle.start();
            $cordovaVibration.vibrate(5000);
        };

        // 停止播放操作
        $rootScope.stopAlarm = function() {
            media_repeat = false;
            media_handle && media_handle.stop();
        };

        var update_timer = null;

        // 获取更新数据
        function update() {
            
            // 获取今日工作列表
            $http.get(apiContext + "/api/bb/home/duty").then(function (rs) {
				if (!rs.data.data)
					return;
				
                // update chats list
                console.log(rs);
                $scope.chats = rs.data.data[0];
            });
            
            // 获取消息列表
            $http.get(apiContext + "/api/bb/home/message/list").then(function (rs) {
				if (!rs.data.data)
					return;
				
                // update message list
                $scope.texts = rs.data.data[0];
                $rootScope.messages = $scope.texts;
                
                // check if need sound
                var play_alarm = false, play_again = false;
                for (var x in rs.data.data[0]) {
                    if (rs.data.data[0][x].NeedSound) {
                        play_alarm = true;
                        play_again = (rs.data.data[0][x].AlertType == 3 || rs.data.data[0][x].AlertType == 9);
                    }
                }
                play_alarm && $rootScope.startAlarm(play_again);
            });

            // 定时更新
            update_timer = $timeout(update, 2000);
        }

        // 取消更新定时器
        $scope.$on("$destroy", function($event) {
            update_timer && $timeout.cancel(update_timer);
            media_handle && media_handle.release();
        });

        // 启动更新
        update();


        $scope.popupMessageOpthins = function (chat) {
            // 用户操作，停止报警
            $rootScope.stopAlarm();

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
                            $ionicPopup.alert({
                                title: "到位确认",
                                template: imageData.text + '号登机桥已进行到位确认'
                            });
                            $http.post(apiContext + "/api/bb/home/message/reach", {
                                ID: chat.ID,
                                status: 1,
                                data: imageData.text
                            }).success(function () {
                                update();
                                $ionicPopup.alert({
                                    title: "到位确认",
                                    template: "扫码成功"
                                });
                            }).error(function () {
                                update();
                                $ionicPopup.alert({
                                    title: "到位确认",
                                    template: "扫码失败请再次扫描"
                                });
                            });
                        } else if (imageData.text != chat.Bridge_Code && imageData.cancelled == false) {
                            $ionicPopup.alert({
                                title: "到位确认",
                                template: '请到达正确登机口'
                            });
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

    .controller('MessageDetailCtrl', function ($scope, $rootScope, $state, $cordovaVibration, $http, $stateParams, locals, Chats, $timeout, apiContext) {
        // 每次进入 View 都执行
        $scope.$on('$ionicView.enter', function () {
            // 用户操作，停止报警
            $rootScope.stopAlarm();
        });                    
                    
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

    .controller('DashCtrl', function ($scope, Chats) {
        
        $scope.bridges = Chats.bridge();
        console.log(Chats.bridge());
    
    })

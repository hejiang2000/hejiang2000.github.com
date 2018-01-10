angular.module('app.init', ['ionic'])

    .run(function ($ionicPlatform, $location, $rootScope, $ionicHistory, $ionicPopup, $state) {

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins) {
                window.cordova.plugins.Keyboard && cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                window.cordova.plugins.Keyboard && cordova.plugins.Keyboard.disableScroll(true);
                window.cordova.plugins.autoStart && cordova.plugins.autoStart.disable();

                // enable background mode
                if (window.cordova.plugins.backgroundMode) {
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
                    })
                }
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

angular.module('controllers.mine', ['ionic', 'app.services', 'ngCordova'])

    .controller('MineCtrl', function ($ionicPopup, $state, $scope, $rootScope, $timeout, 
        $http, $cordovaProgress, $cordovaBarcodeScanner, locals, apiContext, bell) {

        $scope.doaquit = function (rs) {
            var confirmPopup = $ionicPopup.confirm({
                title: '退出',
                template: '是否退出'
            }).then(function (res) {
                if (res) {
                    // 取消定时更新
                    $rootScope.polling = false;

                    // 退出登录
                    $http.post(apiContext + "/logout").success(function (rs) {
                        // 跳转登录页面
                        $state.go('signin');
                    });
                } else {
                    console.log('You are not sure');
                }
            })
        }

        // 检查更新
        $scope.checkUpdate = function () {
            $cordovaProgress.showBar(false, 100000, "正在更新...");
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
                })
            })
        }

        // 测试震动
        $scope.testVibrate = function () {
            bell.vibrate();
        }

        // 测试播放音乐
        $scope.testPlayMusic = function () {
            bell.ring(false);
        }

        // 测试扫码
        $scope.testScanBarcode = function () {
            $cordovaBarcodeScanner.scan();
        }

        // 测试语音
        $scope.testTTS = function () {
            var message = "H U 7 6 7 2 航班，将于15分钟后到达，请做好接机准备。";
            window.xunfeiListenSpeaking && xunfeiListenSpeaking.startSpeak(function () {
                // speaking done
            }, function (err) {
                // speaking error
                console.error("Fail to speak: ", err);
            }, message);
        }

        $scope.$on('$ionicView.enter', function () {
            $http.get(apiContext + "/api/bb/cn/changename").then(function (rs) {
                $scope.chats = rs.data.data[0][0];
            })

            chcp.getVersionInfo(function(err, data) {
                $scope.version = data;
            })
        })

    })

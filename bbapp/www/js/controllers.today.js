angular.module('controllers.signin', ['ionic', 'app.services', 'ngCordova'])

    .controller('TodayCtrl', function ($scope, $rootScope, $q, $state, Chats, $http,
        locals, $ionicPopup, $timeout, $cordovaBarcodeScanner, apiContext, bell) {
        var timer;

        function update() {
            var d1 = $q.defer(),
                d2 = $q.defer();

            $http.get(apiContext + "/api/bb/home/duty").then(function (rs) {
                $scope.chats = rs.data.data[0];
            }).finally(function () {
                d1.resolve();
            });

            $http.get(apiContext + "/api/bb/home/message/list").then(function (rs) {
                $scope.texts = rs.data.data[0];
                $rootScope.messages = $scope.texts;

                var needSound = false,
                    infinite = false;
                for (x in $scope.texts) {
                    var item = $scope.texts[x];
                    (item.NeedSound == 1) && (item.AlertStatus == 0) && (needSound = true);
                    (item.AlertType == 3 || item.AlertType == 10) && (item.AlertStatus == 0) && (infinite = true);
                }

                if (needSound) {
                    bell.ring(infinite);
                    bell.vibrate();
                }
            }).finally(function () {
                d2.resolve();
            });

            $q.all([d1.promise, d2.promise]).then(function () {
                $rootScope.polling && timer == null && (timer = $timeout(function () {
                    timer = null;
                    update();
                }, 2000));
            });
        }

        $scope.popupMessageOpthins = function (chat) {
            // stop bell first
            bell.stop();

            console.log(chat);
            var optionsPopup = $ionicPopup.confirm({
                /*templateUrl: "templates/popup.html",*/
                title: '确认信息',
                subTitle: "您已经到达" + chat.Bridge_Code + "号登机口,点击OK进行扫码认证",
                scope: $scope
            }).then(function (res) {
                if (!res) {
                    return
                }

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
                })
            })
        }

        $scope.$on("$destroy", function ($event) {
            timer && $timeout.cancel(timer);

            $rootScope.polling = false;
            timer = null;
        })

        $scope.$on('$ionicView.enter', function () {
            if (!$rootScope.polling) {
                $rootScope.polling = true;
                timer = null;

                update();
            }
        })

    })

    .controller('ChatDetailCtrl', function ($scope, $rootScope, $state, $http, $stateParams, locals, Chats, $timeout, apiContext, bell) {
        $scope.ok = function (status) {
            $http.post(apiContext + "/api/bb/home/message/edit", {
                ID: $stateParams.MessageId,
                status: status
            }).then(function () {
                $state.go('tabs.home');
            });
        }

        $scope.$on('$ionicView.enter', function () {
            bell.stop();

            angular.forEach($rootScope.messages, function (item) {
                if (item.ID == $stateParams.MessageId) {
                    $scope.chat = item;
                    return false;
                }
            });
    
            $timeout(function () {
                $state.go('tabs.home'); //由于某种原因5秒后关闭弹出
            }, 10000);
        })
    })
    
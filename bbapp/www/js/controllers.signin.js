angular.module('controllers.signin', ['ionic', 'app.services'])

    .controller('SignInCtrl', function ($scope, $state, $http, $timeout, $ionicPopup, apiContext, locals) {
        var title = "操作员登录";
        var message = null;
        
        $scope.signIn = function (user) {
            user.name && (user.username = user.username.toLowerCase());
            $http.post(apiContext + "/html/system/login/index.html", user, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                // 检查是否已登录
                $http.get(apiContext + "/api/bb/cn/changename", {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest"
                    }
                }).then(function (rs) {
                    locals.setObject("user", user);
                    $state.go('tabs.home');
                });
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
                })
            })
        }

        $scope.$on('$ionicView.enter', function () {
            // 检查是否已登录
            $http.get(apiContext + "/favicon.ico").then(function() {
                $http.get(apiContext + "/api/bb/cn/changename", {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest"
                    }
                }).then(function (rs) {
                    $state.go('tabs.home');
                })
            })
            
            $scope.user = locals.getObject("user");
            if ($scope.user.username && $scope.user.password) {
                $scope.signIn($scope.user);
            }
        })
    })

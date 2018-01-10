angular.module('controllers.bridge', ['ionic', 'app.services', 'ngCordova'])

    .controller('BridgeCtrl', function ($scope, $rootScope, Chats, $http, locals,
        $ionicPopup, $timeout, $cordovaBarcodeScanner, apiContext) {
        $scope.$on('$ionicView.enter', function () {
            $http.get(apiContext + "/api/bb/bridge/fightbridge").then(function (rs) {
                $scope.chats = rs.data.data[0];
                console.log(rs);
            });
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

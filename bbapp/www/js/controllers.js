angular.module('starter.controllers', [])

    /*
    .controller('DashCtrl', function ($scope) {})
    .controller('ChatsCtrl', function($scope, Chats) {
      $scope.chats = Chats.all();
      $scope.remove = function(chat) {
        Chats.remove(chat);
      };
    })
    */

    .controller('SearchCtrl', function ($scope, $http, apiContext) {

        $scope.search = function (searchName) {
            $http.post(apiContext + "/api/bb/search/se", {
                data: searchName
            }).success(function (rs) {
                $scope.chats = rs.data[0];
            });
        }
    })


    .controller('FlightCtrl', function ($scope, $rootScope, $http, $timeout, apiContext) {
        var timer = null;
        
        function update() {
            $http.get(apiContext + "/api/bb/home/depflight").then(function (rs) {
                $scope.chats = rs.data.data[0];
            }).finally(function () {
                timer == null && (timer = $timeout(function() {
                    timer = null;
                    update();
                }, 5000))
            })
        }

        $scope.$on('$ionicView.enter', function () {
            timer == null && update();
        });

        $scope.$on("$ionicView.leave", function ($event) {
            timer && $timeout.cancel(timer);
            timer = null;
        });
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });

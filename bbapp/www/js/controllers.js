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
        function update() {
            $http.get(apiContext + "/api/bb/home/depflight").then(function (rs) {
                console.log(rs);
                $scope.chats = rs.data.data[0];
            }).finally(function() {
                if ($rootScope.polling) {
                    timer = $timeout(update, 5000);
                }
            })
        }

        var timer = null;

        $scope.$on("$destroy", function($event) {
            timer && $timeout.cancel(timer);
            timer = null;
        });

        $scope.$on('$ionicView.enter', function () {
            if (!$rootScope.polling || !timer) {
                $rootScope.polling = true;
                update();
            }
        });

    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });

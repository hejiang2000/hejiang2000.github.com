angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

  .controller('ChatSearchCtrl', function($scope,$http,apiContext) {

	  $scope.search=function(searchName){
		  $http.post(apiContext+"/api/bb/search/se", {data:searchName}).success(function(rs) {
		  $scope.chats = rs.data[0];
		 });
	  }
  })


  .controller('ChatFlightCtrl', function($scope,$http,$timeout,apiContext) {
      function update(){
        $http.get(apiContext + "/api/bb/home/depflight").then(function (rs) {
          console.log(rs);
          $scope.chats = rs.data.data[0];
        })
        timer = $timeout(update, 5000);
      }

      function cancelTimer($event) {
        timer && $timeout.cancel(timer);
      }

      update();

      var timer = null;
      $scope.$on("$destroy", cancelTimer);

  })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});



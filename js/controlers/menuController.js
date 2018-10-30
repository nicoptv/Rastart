'use strict';

app
   .controller('menuCtrl', function($scope, $ionicSideMenuDelegate, $translate, $state,loginUser) {
      $scope.session = loginUser.getAuth();
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
      $scope.changeLanguage = function (key) {
         $translate.use(key);
         $state.go($state.current, {}, {reload: true});
  };
})

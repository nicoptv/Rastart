'use strict';

app.controller("LoginUser",function ($scope,loginUser) {
        loginUser.getAuthId();
        $scope.session = loginUser.getAuth();
        $scope.login = function(user) {
            
            loginUser.login(user);
            $scope.session = loginUser.getAuth();
        }

});

app.controller("Logout",function ($scope,Logout,loginUser) {

    $scope.logout = function() {
            Logout.logout();
            $scope.session = loginUser.getAuth();
    }

});


app.controller("createUser", function($scope, createUser){
        $scope.createUser = function(user){
            createUser.createUser(user);
        }
});

app.controller("LoginFacebook", function($scope, LoginFacebook){
    $scope.loginFB = function(){
        LoginFacebook.loginFB();
    }
});

app.controller("favUser",function($scope){
    $scope.setFav = function(){
    }
    
    $scope.getFav = function(){
        
    }
});

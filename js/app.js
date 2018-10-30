'use strict';

var app = angular.module('rastart', ['ionic', 'ngCordova', 'pascalprecht.translate','ionic-native-transitions', 'ngStorage','firebase'])
.run(function($ionicPlatform, $location, $cordovaStatusbar, $rootScope, $state, $ionicPopup) {
   $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
       if (error === "AUTH_REQUIRED") {

           var alertPopup = $ionicPopup.alert({
           title: 'Problème',
           template: 'Identification nécessaire'
         });
         alertPopup;
         $state.go("menu.login");
       }
     });

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);

      window.plugins.nativepagetransitions.globalOptions.duration = 500;
      window.plugins.nativepagetransitions.globalOptions.iosdelay = 2;
      window.plugins.nativepagetransitions.globalOptions.androiddelay = 2;
      window.plugins.nativepagetransitions.globalOptions.winphonedelay = 0;
      window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 8;
      // these are used for slide left/right only currently
      window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
      window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;
    }
    $location.path('/menu/home');
  });
});
app.config(function($ionicNativeTransitionsProvider){
    $ionicNativeTransitionsProvider.setDefaultTransition({
        type: 'fade',
    });
});
app.config(function($ionicNativeTransitionsProvider){
    $ionicNativeTransitionsProvider.setDefaultBackTransition({
        type: 'fade',
    });
});
app.service('Navigation', function($state) {
  //directly binding events to this context
  this.goNative = function(view, data, direction) {
    $state.go(view, data);
    window.plugins.nativepagetransitions.slide({
        "direction": direction
      },
      function(msg) {
        console.log("success: " + msg)
      }, // called when the animation has finished
      function(msg) {
        alert("error: " + msg)
      } // called in case you pass in weird values
    );
  };
});

app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://rastarttest.firebaseio.com");
  return $firebaseAuth(ref);
}
]);

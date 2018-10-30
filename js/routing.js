'use strict';

app.config(function($stateProvider, $ionicConfigProvider){

   /********************** Transition **********************/

      $ionicConfigProvider.views.transition('none');

      // $ionicNativeTransitionsProvider.setDefaultOptions({
      //    duration: 4000, // in milliseconds (ms), default 400,
      //    slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
      //    iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
      //    androiddelay: -1, // same as above but for Android, default -1
      //    winphonedelay: -1, // same as above but for Windows Phone, default -1,
      //    fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
      //    fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
      //    triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
      //    backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
      // });
      // $ionicNativeTransitionsProvider.setDefaultTransition({
      //    "type"          : "flip",
      //    "direction"     : "up", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
      //    "duration"      :  500, // in milliseconds (ms), default 400
      // });
      // $ionicNativeTransitionsProvider.setDefaultBackTransition({
      //    "type"          : "fade",
      //    "duration"      :  500, // in milliseconds (ms), default 400
      // });

   $stateProvider
      /********************** Menu **********************/

         .state('menu', {
         url: '/menu',
         abstract: true,
         templateUrl: 'js/menu/menu.html',
         controller: 'menuCtrl'
      })

      /********************** game **********************/
         .state('menu.game', {
         cache : false,
         url: '/game',
            views: {
              'menuContent': {
                templateUrl: 'js/views/game/game.html',
                controller: 'gameCtrl'
              }
           }
         })

      /********************** Acceuil **********************/
      .state('menu.homepage', {
         cache : false,
         url: '/home',
         views: {
           'menuContent': {
             templateUrl: 'js/views/homePage/index.html',
             controller: 'homepageIndex'
           }
        }
      })
      .state('menu.login', {
         cache : false,
         url: '/login',
         views: {
           'menuContent': {
             templateUrl: 'js/views/homePage/login.html',
             controller: 'LoginUser'
           }
        }
      })

       .state('menu.subscribe', {
           cache : false,
           url: '/subscribe',
           views: {
               'menuContent': {
                   templateUrl: 'js/views/homePage/subscribe.html',
                   controller: 'createUser'
               }
           }
       })
      /********************** Programation **********************/
      .state('menu.artisteList', {
         cache : false,
         url: '/artistes',
         views: {
           'menuContent': {
             templateUrl: 'js/views/prog/list.html',
             controller: 'artisteList'
           }
        }
      })
      .state('menu.artisteList2', {
         cache : false,
         url: '/artistes2',
         views: {
           'menuContent': {
             templateUrl: 'js/views/prog/list.html',
             controller: 'artisteList2'
           }
        }
      })
      .state('menu.artisteList3', {
         cache : false,
         url: '/artistes3',
         views: {
           'menuContent': {
             templateUrl: 'js/views/prog/list.html',
             controller: 'artisteList3'
           }
        }
      })
      .state('menu.artisteOne', {
         cache : false,
         url: '/artiste/:id',
         views: {
           'menuContent': {
             templateUrl: 'js/views/prog/one.html',
             controller: 'artisteOne'
           }
        }
      })
      /********************** Camping **********************/
      .state('menu.camping', {
         cache : false,
         url: '/camping',
         views: {
           'menuContent': {
             templateUrl: 'js/views/camping/index.html',
             controller: 'campingCtrl'
           }
        }
      })
      .state('menu.campingOne', {
         cache : false,
         url: '/camping/:id',
         views: {
           'menuContent': {
             templateUrl: 'js/views/camping/one.html',
             controller: 'campingOne'
           }
        }
      })

      /********************** Move **********************/
      .state('menu.move', {
         cache : false,
         url: '/move',
         views: {
           'menuContent': {
             templateUrl: 'js/views/move/index.html',
             controller: 'moveCtrl'
           }
        }
      })
      .state('menu.foundCovoit', {
         cache : false,
         url: '/foundCovoit',
         views: {
           'menuContent': {
             templateUrl: 'js/views/move/foundCovoit.html',
             controller: 'foundCovoitCtrl',
              resolve: {
                  "currentAuth": ["Auth", function(Auth) {
                      return Auth.$requireAuth();
                  }]
              }
           }
        }
      })
      .state('menu.train', {
         cache : false,
         url: '/train',
         views: {
           'menuContent': {
             templateUrl: 'js/views/move/train.html',
             controller: 'trainCtrl'
           }
        }
      })
      /********************** Prévention **********************/
      .state('menu.prevention', {
         cache : false,
         url: '/prevention',
         views: {
           'menuContent': {
             templateUrl: 'js/views/prevention/prevention.html',
             controller: 'preventionCtrl'
           }
        }
      })
      /********************** Infos **********************/
      .state('menu.infosIndex', {
         cache : false,
         url: '/infos',
         views: {
           'menuContent': {
             templateUrl: 'js/views/infos/index.html',
             controller: 'indexInfoCtrl'
           }
        }
      })
      .state('menu.festival', {
         cache : false,
         url: '/festival',
         views: {
           'menuContent': {
             templateUrl: 'js/views/infos/festival.html',
             controller: 'festivalCtrl'
           }
        }
      })
      .state('menu.contact', {
         cache : false,
         url: '/contact',
         views: {
           'menuContent': {
             templateUrl: 'js/views/infos/contact.html',
             controller: 'contactCtrl'
           }
        }
      })
      .state('menu.partners', {
         cache : false,
         url: '/partners',
         views: {
           'menuContent': {
             templateUrl: 'js/views/infos/partners.html',
             controller: 'partnersCtrl'
           }
        }
      })
      .state('menu.us', {
         cache : false,
         url: '/us',
         views: {
           'menuContent': {
             templateUrl: 'js/views/infos/us.html',
             controller: 'usCtrl'
           }
        }
      })
      /********************** Geolocalisation **********************/
      .state('menu.map', {
         cache : false,
         url: '/map',
         views: {
           'menuContent': {
             templateUrl: 'js/views/Map/index.html',
             controller: 'MapCtrl'
           }
        }
      })
});

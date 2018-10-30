'use strict';

app
    .controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      var pts1=new google.maps.LatLng(49.180227, -0.224698);
      var pts2=new google.maps.LatLng(49.179924, -0.224718);
      var pts3=new google.maps.LatLng(49.179855, -0.224997);
      var pts4=new google.maps.LatLng(49.179894, -0.225008);
      var pts5=new google.maps.LatLng(49.179830, -0.225256);
      var pts6=new google.maps.LatLng(49.179791, -0.225228);
      var pts7=new google.maps.LatLng(49.179745, -0.225361);
      var pts8=new google.maps.LatLng(49.179416, -0.225155);
      var pts9=new google.maps.LatLng(49.179514, -0.224682);
      var pts10=new google.maps.LatLng(49.179249, -0.224409);
      var pts11=new google.maps.LatLng(49.179316, -0.224064);
      var pts12=new google.maps.LatLng(49.180046, -0.223898);
      var pts13=new google.maps.LatLng(49.180339, -0.223997);
      var pts14=new google.maps.LatLng(49.180324, -0.224068);
      var pts15=new google.maps.LatLng(49.180129, -0.223998);
      var pts16=new google.maps.LatLng(49.180060, -0.224430);
      var pts17=new google.maps.LatLng(49.180075, -0.224603);
      var pts18=new google.maps.LatLng(49.180229, -0.224611);
      // var pts19=new google.maps.LatLng(49.180238,-0.225166);
      function initialize() {
        var myLatlng = new google.maps.LatLng(49.179710, -0.224642);
        var toilets = new google.maps.LatLng(49.179899, -0.224783);
        var soundSystem = new google.maps.LatLng(49.179846, -0.225158);
        var bar = new google.maps.LatLng(49.179496, -0.224770);
        var sceneA = new google.maps.LatLng(49.179289, -0.224200);
        var sceneB = new google.maps.LatLng(49.180039, -0.223934);
        var food = new google.maps.LatLng(49.179782, -0.224603);

        var mapOptions = {
          center: myLatlng,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.HYBRID
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var contentBar = "<div><a ng-click='clickTest()'>BAR</a></div>";
        var compiled = $compile(contentString)($scope);
        var compiledBar = $compile(contentBar)($scope);


        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });
        var infowindowBar = new google.maps.InfoWindow({
          content: compiledBar[4]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
        });
        var toilets = new google.maps.Marker({
          position: toilets,
          map: map,
        });
        var soundSystem = new google.maps.Marker({
          position: soundSystem,
          map: map,
        });
        var bar = new google.maps.Marker({
          position: bar,
          map: map,
        });
        var sceneA = new google.maps.Marker({
          position: sceneA,
          map: map,
        });
        var sceneB = new google.maps.Marker({
          position: sceneB,
          map: map,
        });
        var food = new google.maps.Marker({
          position: food,
          map: map,
        });
        var myTrip=[pts1,pts2,pts3,pts4,pts5,pts6,pts7,pts8,pts9,pts10,pts11,pts12,pts13,pts14,pts15,pts16,pts17,pts18];
        var flightPath=new google.maps.Polygon({
          path:myTrip,
          strokeColor:"#0000FF",
          strokeOpacity:0.8,
          strokeWeight:2,
          fillColor:"#0000FF",
          fillOpacity:0.4
          });

flightPath.setMap(map);

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      ionic.Platform.ready(initialize);
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };

      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };

    });

'use strict';

app.service('covoitGestion', function($firebaseArray,$ionicPopup,$state){
    var ref = new Firebase("https://rastarttest.firebaseio.com/covoit");

    this.createCovoit = function(covoit)
    {
        ref.push().set(covoit);
        var alertPopup = $ionicPopup.alert({
            title: 'Succes',
            template: 'Annonce postée'
        });
        $state.go('menu.move');
    }


    this.getCovoit = function(){
        return $firebaseArray(ref);
    }

    this.delCovoit = function(id_annonce){
      var ref = new Firebase("https://rastarttest.firebaseio.com/covoitMessage/" + id_annonce);
      ref.remove();
      ref = new Firebase("https://rastarttest.firebaseio.com/covoit/" + id_annonce);
      ref.remove();
    }

    this.takeCovoit = function(){

    }

})
;

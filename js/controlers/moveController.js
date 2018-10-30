'use strict';

 app
    .controller('moveCtrl', function($scope, $state, Navigation){
   })
    .controller('foundCovoitCtrl', function($scope, covoitGestion,loginUser,$ionicPopup,messageCovoit){

      console.log("test");
      console.log(covoitGestion.getCovoit());
        $scope.covoits = covoitGestion.getCovoit();
        $scope.covoits.$loaded()
            .then(function(){
                angular.forEach($scope.covoits.reverse(), function(covoit) {
                    var data = loginUser.getDataById(covoit.uid);
                    data.$loaded()
                        .then(function(){
                            covoit.auteur = data.nom + " " + data.prenom;
                            covoit.photo = data.photo;
                        });
                })
            });

        $scope.getMessage = function(id_annonce){
           $scope.messages = messageCovoit.getMessage(id_annonce);
           $scope.messages.$loaded()
               .then(function(){
                   angular.forEach($scope.messages, function(message) {
                       var data = loginUser.getDataById(message.id_user);
                       data.$loaded()
                           .then(function(){
                               message.auteur = data.nom + " " + data.prenom;
                               message.photo = data.photo;
                           });
                   })
               });
        }

        $scope.delMessage = function(id_auteur,id_message,id_annonce){
                var uid = loginUser.getAuthId();
                if(id_auteur == uid)
                {
                    var confirmPopup = $ionicPopup.confirm({
                      title: 'Confirmer',
                      template: 'Êtes vous sur de vouloir supprimer ce message ?'
                    });

                    confirmPopup.then(function(res) {
                      if(res) {
                        message.delMessage(id_auteur,id_message,id_annonce);
                      }
                    });
                }
                else
                {
                  var alertPopup = $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Vous ne pouvez pas supprimer ce message'
                  });

                  alertPopup.then(function(res) {
                    });
                }
             }

        $scope.sendMessage = function(id_annonce){
            $scope.data = {};
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.message">',
                title: 'Répondre à l\'annonce',
                subTitle: 'Ecrire votre texte ici:',
                scope: $scope,
                buttons: [
                    { text: 'Annuler' },
                    {
                        text: '<b>Confimer</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.message) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.message;
                            }
                        }
                    }
                ]
            });

            myPopup.then(function(res) {
                console.log('Texte !  ', res);
                if(res!=undefined)
                {
                    console.log("OK BRO !!!!!")
                    messageCovoit.addMessage(res,id_annonce,loginUser.getAuthId());
                }
            });
        }

        $scope.createCovoit = function(covoit){
           console.log("test");
            covoit.uid = loginUser.getAuthId();
            covoitGestion.createCovoit(covoit);
        }

        $scope.delAnnonce = function(id_auteur,id_annonce){
          var uid = loginUser.getAuthId();
          console.log(id_auteur+"/"+uid+"/"+id_annonce);
          if(id_auteur == uid)
          {
              var confirmPopup = $ionicPopup.confirm({
                title: 'Confirmer',
                template: 'Êtes vous sur de vouloir supprimer cette annonce ?'
              });

              confirmPopup.then(function(res) {
                if(res) {
                  covoitGestion.delCovoit(id_annonce);
                }
              });
          }
          else
          {
            var alertPopup = $ionicPopup.alert({
              title: 'Erreur',
              template: 'Vous ne pouvez pas supprimer cette annonce'
            });

            alertPopup.then(function(res) {
              });
          }
        }

        $scope.delMessage = function(id_auteur,id_message,id_annonce){
          var uid = loginUser.getAuthId();
          if(id_auteur == uid)
          {
              var confirmPopup = $ionicPopup.confirm({
                title: 'Confirmer',
                template: 'Êtes vous sur de vouloir supprimer ce message ?'
              });

              confirmPopup.then(function(res) {
                if(res) {
                  messageCovoit.delMessage(id_annonce,id_message);
                }
              });
          }
          else
          {
            var alertPopup = $ionicPopup.alert({
              title: 'Erreur',
              template: 'Vous ne pouvez pas supprimer ce message'
            });

            alertPopup.then(function(res) {
              });
          }
        }
   })
   //  .controller('offerCovoitCtrl', function($scope, $state, Navigation){
   // })
    .controller('trainCtrl', function($scope, $state, Navigation){
   })
   //  .controller('busCtrl', function($scope, $state, Navigation){
   // })
   //  .controller('navetteCtrl', function($scope, $state, Navigation){
   // })
;

'use strict';



app.service('messageCovoit',function ($firebaseArray) {


        this.addMessage = function(message,id_annonce,id_auteur){
            var ref = new Firebase("https://rastarttest.firebaseio.com/covoitMessage/" + id_annonce);
            ref.push({'id_user':id_auteur,'message':message});
        }

        this.getMessage = function(id_annonce){
        var ref = new Firebase("https://rastarttest.firebaseio.com/covoitMessage/" + id_annonce);
        return $firebaseArray(ref);
        }

        this.delMessage = function(id_annonce,id_message){
          var ref = new Firebase("https://rastarttest.firebaseio.com/covoitMessage/" + id_annonce + "/" + id_message);
          ref.remove();
        }

});

'use strict';

app.service('loginUser', function($firebaseAuth,$state,$ionicPopup,$firebaseArray, $firebaseObject) {
    var ref = new Firebase("https://rastarttest.firebaseio.com/");

    this.login = function (user) {
        ref.authWithPassword({
            "email": user.email,
            "password": user.password
        }, function(error, authData) {
            if (error) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Echec',
                    template: 'Problème d\'identification, vérifier vos informations'
                });

                alertPopup;
            } else {
                $state.go('menu.homepage');
            }
        });
    }

    this.getAuthId = function () {
        var authData = ref.getAuth();
        if(authData)
        {
            return authData.uid;
        }
    }

    this.getDataAuth = function(){
        return ref.getAuth();
    }

    this.getAuth = function () {
        if(ref.getAuth() !== null)
        {
            console.log(ref.getAuth());
            return true;
        }
        else
        {
            console.log(ref.getAuth());
            return null;
        }
    }

    this.getDataById = function($uid){
        var refData = new Firebase("https://rastarttest.firebaseio.com/users/"+$uid);
        return $firebaseObject(refData);

    }

});

app.service('createUser', function($firebaseAuth,$ionicPopup,loginUser) {
    var ref = new Firebase("https://rastarttest.firebaseio.com/users");

    this.createUser = function (user) {
        ref.createUser({
            email: user.email,
            password: user.password
        },function(error,userData){
            if (error) {
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        var alertPopup = $ionicPopup.alert({
                            title: 'Erreur',
                            template: 'Problème de création de compte, l\'email est déjà utilisé'
                        });

                        alertPopup;
                        break;
                    case "INVALID_EMAIL":
                        var alertPopup = $ionicPopup.alert({
                            title: 'Erreur',
                            template: 'L\'adresse email utilisé n\'est pas valide'
                        });

                        alertPopup;
                        break;
                    default:
                        var alertPopup = $ionicPopup.alert({
                            title: 'Erreur',
                            template: 'Erreur à la création du compte'
                        });

                        alertPopup;
                }
            }
            else {
                var refUser = ref.child(userData.uid);
                loginUser.login(user);
                user.password = null;
                refUser.set(user);
                var alertPopup = $ionicPopup.alert({
                    title: 'Succès',
                    template: 'Création faite avec succès'
                });

                alertPopup;
                loginUser.login(user);
            }
        });
        console.log(user);
    }

    this.createUserFB = function(user){
        var test = loginUser.getDataById(user.uid);
        if(test.$value == null)
        {
            var data = {};
            data.nom = user.facebook.cachedUserProfile.last_name;
            data.prenom = user.facebook.cachedUserProfile.first_name;
            data.genre = user.facebook.cachedUserProfile.gender;
            data.photo = user.facebook.profileImageURL;
            data.lienFB = user.facebook.cachedUserProfile.link;
            var refUser = ref.child(user.uid);
            refUser.set(data);
        }
    }
});

app.service('Logout', function($firebaseAuth,$ionicPopup,$state) {
    var ref = new Firebase("https://rastarttest.firebaseio.com/users");

    this.logout = function () {
        ref.unauth();
        var alertPopup = $ionicPopup.alert({
            title: 'Déconnexion',
            template: 'Déconnexion faite avec succés'
        });

        alertPopup;
        $state.go('menu.homepage');
}
});

app.service('LoginFacebook', function($state,createUser) {
    var ref = new Firebase("https://rastarttest.firebaseio.com/users");

    this.loginFB = function () {
        ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                // the access token will allow us to make Open Graph API calls
                console.log(authData);
                createUser.createUserFB(authData);
                $state.go('menu.homepage');
            }
        }, {
            scope: "email,user_likes" // the permissions requested
        });

    };

});


app.service('favUser', function($state,$firebaseArray,loginUser) {
    var ref = new Firebase("https://rastarttest.firebaseio.com/userFav");

    this.setFav = function () {
        var id = loginUser.getAuthId();
        //ref.child(id)
    };

    this.getFav = function () {
        var id = loginUser.getAuthId();
        //ref.child()
    };

});

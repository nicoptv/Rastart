'use strict';

 app.controller('gameCtrl', function($scope, $state, $localStorage){

      //Load Screen
      var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');
      var score;
      if($localStorage.highscore == undefined)
      {
        $localStorage.highscore = 0;
      }
// ****************************************************************** //
// ************************* Menu principal du Jeu ****************** //
// ****************************************************************** //
      var menu = {
        preload: function() { // Load Elements
            game.stage.backgroundColor = '#71c5cf';
            game.load.image('begin', 'assets/win.jpg');
            game.load.image('startButton', 'assets/jump1.png');
        },
        create: function(){ // Show Elements
          this.gameOver = this.game.add.sprite(0, 0, 'begin');
          this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
          this.startButton.anchor.setTo(0.5,0.5);
          game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        },
        startClick: function() { // onClick startButton
          game.state.add('main', mainState);
          this.game.state.start('main');
        }
      };

      // ****************************************************************** //
      // ************************* Page Loose du Jeu ************************ //
      // ****************************************************************** //

      var loose = {
        preload: function() { // Load Elements
            if($localStorage.highscore < score)
            {
              $localStorage.highscore = score;
            }
            game.stage.backgroundColor = '#71c5cf';
            game.load.image('loose', 'assets/loose.jpg');
            game.load.audio('dead', 'assets/mort.mp3');
            game.load.image('startButton', 'assets/jump1.png');

        },
        create: function(){ // Show Elements
          this.gameOver = this.game.add.sprite(0, 0, 'loose');
          this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
          this.startButton.anchor.setTo(0.5,0.5);
          this.music = game.add.audio('dead');
          this.music.loop = false;
          this.music.volume = 1;
          this.music.play();
          this.labelScore = this.game.add.text(20,415, "0", { font: "30px Arial", fill: "#000000" });
          this.labelScore.text = "Votre score:" + score;
          this.labelHighscore = this.game.add.text(20,445, $localStorage.highscore, { font: "30px Arial", fill: "#000000" });
          this.labelHighscore.text = "Meilleur score:" + $localStorage.highscore;
        },
        startClick: function() { // onClick pageWin
          // start button click handler
          // start the 'play' state
          this.music.stop();
          game.state.add('main', mainState);
          this.game.state.start('main');
        }
      };


// ****************************************************************** //
// ******************************* Jeu ****************************** //
// ****************************************************************** //
      var mainState = {

          preload: function() {
              game.stage.backgroundColor = '#71c5cf';

              game.load.image('bird', 'assets/bird.png');
              game.load.image('pipe', 'assets/pipe.png');
              game.load.image('gameOver', 'assets/win.jpg');


              // Load the jump sound
              game.load.audio('jump', 'assets/jump.wav');
              game.load.audio('music', 'assets/music.mp3');
          },


          create: function() {
              var music;

              game.physics.startSystem(Phaser.Physics.ARCADE);

              this.pipes = game.add.group();
              this.pipes.enableBody = true;
              this.pipes.createMultiple(20, 'pipe');
              this.timer = this.game.time.events.loop(1600, this.addRowOfPipes, this);

              this.bird = this.game.add.sprite(100, 245, 'bird');
              game.physics.arcade.enable(this.bird);
              this.bird.body.gravity.y = 1000;

              // New anchor position
              this.bird.anchor.setTo(-0.2, 0.5);

              music = game.add.audio('music');

               if(this.music == null) {
                  this.music = game.add.audio('music');
                  this.music.loop = true;
                  this.music.volume = 1;
                  this.music.play();
               }
               else if (this.music.isPlaying == false) {
                  this.music.play();
               }



              game.input.onDown.add(this.jump, this);

              score = -1;
              this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

              // Add the jump sound
              this.jumpSound = this.game.add.audio('jump');
          },

          update: function() {
              if (this.bird.inWorld == false) {
                 this.music.stop();
                 game.state.add('main', loose);
                 game.state.start('main');
              }

              game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

              // Slowly rotate the bird downward, up to a certain point.
              if (this.bird.angle < 10)
                  this.bird.angle += 1;
          },

          jump: function() {
              // If the bird is dead, he can't jump
              if (this.bird.alive == false)
                  return;

              this.bird.body.velocity.y = -350;

              // Jump animation
              game.add.tween(this.bird).to({angle: -20}, 100).start();

              // Play sound
              this.jumpSound.play();
          },

          hitPipe: function() {
              // If the bird has already hit a pipe, we have nothing to do
              if (this.bird.alive == false)
                  return;

              // Set the alive property of the bird to false
              this.bird.alive = false;

              // Prevent new pipes from appearing
              this.game.time.events.remove(this.timer);

              // Go through all the pipes, and stop their movement
              this.pipes.forEachAlive(function(p){
                  p.body.velocity.x = 0;
              }, this);
          },

          restartGame: function() {
            this.music.stop();
            game.state.add('main', menu);
            game.state.start('main');
          },

          addOnePipe: function(x, y) {
              var pipe = this.pipes.getFirstDead();
              pipe.reset(x, y);
              pipe.body.velocity.x = -200;
              pipe.checkWorldBounds = true;
              pipe.outOfBoundsKill = true;
          },

          addRowOfPipes: function() {
              var hole = Math.floor(Math.random()*2)+1;
              for (var i = 0; i < 4; i++)
                  if (i != hole)
                    this.addOnePipe(400, i*150);
              score += 1;
              this.labelScore.text = score;
          },
      };

      game.state.add('main', menu); // Chargement du menu
      game.state.start('main');     // Lancement du menu
});

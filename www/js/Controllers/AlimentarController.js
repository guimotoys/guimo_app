app.controller('AlimentarController',function($scope,$rootScope,$ionicPlatform,$ionicPopup,$timeout){

  $ionicPlatform.ready(function(){
    /** INICIA VARIAVEIS GLOBAIS $rootScope e $scope PARA ALTERAR VIEW */
    $scope.feeding = false;
    $scope.foodSelected = "";
    $scope.sick = false;
    var screen = $rootScope.screen;

    /** RECEBE $rootScope.teste, DE GuimoController LINHA 22 */
    if($rootScope.teste != null){
      $scope.foodSelected = $rootScope.teste;
    }

    $scope.feed = function(food,foodName,sound){
      $scope.foodSelected = foodName;
      screen = $rootScope.screen;
      /** DO NOT FEED IF THE GUIMO IS FULL **/ 
        /**FEEDS IF I HAVE HUNGRY **/
         /** CALCULATE THE LUCK TO DECREASE LIFE **/
         var lucky = Math.floor(Math.random()*100)+1;
         var amt_feed =  20 //Math.floor(Math.random()*5)+1;
         
         if($rootScope.connected ){

           /** VARIABLES OF AUDIO FILES */
           var media = null;
           var belch = new Media('/android_asset/www/sound_effects/belch2.mp3');

           /** SEND FOOD TO GUIMO */
           bluetoothSerial.write(food);
           if(sound != null){
             media = new Media("/android_asset/www/sound_effects/"+sound+".mp3",function(){
             console.log('mediaSuccess')
            },function(err){
              console.log(err)
            });
           
           /** TONE FIRST SOUND AFTER 1.1 SECONDS */
            $timeout(function(){
              media.play();
            },1400);

            /** TONE FIRST SOUND AFTER 2.2 SECONDS  */
            $timeout(function(){
              if(sound == "Bite3"){
                media.play();
              }
            },2500);

            if(sound == "Slurp7"){
              $timeout(function(){
                belch.play();
              },2900);
            }
           }
           
          /** CHANGES screen for NORMAL AND FREE AUDIO FILES **/ 
          $timeout(function(){
            bluetoothSerial.write(screen);
            if(media instanceof Media){
              media.release();
            }

            if( belch instanceof Media){
              belch.release();
            }
          },3500);

         }

         if($rootScope.hunger >= 100){
           $ionicPopup.alert({
            title:'Guimo diz:',
            template: "Ei, não estou com fome... que tal se fossemos brincar?"
          });
         }

         /** IF FOOD STAY > THAT 100, DOES NOT LET UP */
         if($rootScope.hunger + amt_feed >= 100){
           $rootScope.hunger = 100;
         }else{
           $rootScope.hunger += amt_feed;
         }

         /**IF THE LUCK IS BETWEEN 40 TO 60, DIMINISH HEATH **/
         if(lucky >= 35 && lucky <= 80){
            /** IF HEALTH > 25, LOSE 2 OF LIFE **/
            if($rootScope.health > 25){
                $rootScope.health -= amt_feed;

            }else if($rootScope.health > 1 && $rootScope.health <= 25){

              $ionicPopup.alert({
                  title:'Guimo diz:',
                  template: 'Esses '+foodName+'s não me cairam bem.... =/'
              });

              /** IF I'M SICK TO CHANGE VALUE OF VARIABLE */
              if(!$scope.sick){
                $scope.sick = true;
                //Arrow to variable to say that the app already knows that guimo is sick;
                 
                console.log("entrou guimoDoente");
                bluetoothSerial.write('doente\n');
                 
              }
                $rootScope.health -= 1;
            }
         }
       
    }

    /** GIVE REMEDY TO GUIMO */
    $scope.medkit = function(){
      /** CALCULATION% OF HEALING from 25 to 100 */
      var heal = Math.floor(Math.random()*75)+25;
      var templ = "";

      if($rootScope.health < 100){
        /** IF YOU CURE + THAT 100% */
        if($rootScope.health + heal > 100){
          $rootScope.health = 100;
          templ = "Ahhh esse remédio me curou totalmente, estou pronto para brincar denovo!!";

        }else{
          $rootScope.health += heal;
          templ = "Legal, esse remédio curou "+heal+" pontos de minha vida!";
        }

        if($rootScope.connected){
          bluetoothSerial.write('remedio\n');
        }

        /*$ionicPopup.alert({
            title:'Guimo diz:',
            template: templ
        });*/

        /** IF HEALTH TO BE > 30, GO BACK NORMAL */
        if($rootScope.health >= 30){
          $scope.sick = false;
          if($rootScope.connected){
            $timeout(function(){bluetoothSerial.write('padrao\n');},3500);
          }
        }
      }
    }

  });

});

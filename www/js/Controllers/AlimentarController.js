app.controller('AlimentarController',function($scope,$rootScope,$ionicPlatform,$ionicPopup,$timeout){

  $ionicPlatform.ready(function(){
    /** INICIA VARIAVEIS GLOBAIS $rootScope e $scope PARA ALTERAR VIEW */
    $scope.feeding = false;
    $scope.foodSelected = "";
    $scope.sick = false;
    var tela = $rootScope.tela;

    /** RECEBE $rootScope.teste, DE GuimoController LINHA 22 */
    if($rootScope.teste != null){
      $scope.foodSelected = $rootScope.teste;
    }

    $scope.feed = function(food,foodName,sound){
      $scope.foodSelected = foodName;
      tela = $rootScope.tela;
      /** NÃO ALIMENTA SE O GUIMO ESTIVER CHEIO **/ 
        /**ALIMENTA SE TIVER COM FOME **/
         /**CALCULA A SORTE DE DIMINUIR A VIDA **/
         var lucky = Math.floor(Math.random()*100)+1;
         var amt_feed =  20 //Math.floor(Math.random()*5)+1;
         
         if($rootScope.connected ){

           /** VARIAVEIS DE ARQUIVOS DE ÁUDIO */
           var media = null;
           var belch = new Media('/android_asset/www/sound_effects/belch2.mp3');
           //console.log('entrou Alimentar'+food);

           /** ENVIA ALIMENTO PARA GUIMO */
           bluetoothSerial.write(food);
           if(sound != null){
             media = new Media("/android_asset/www/sound_effects/"+sound+".mp3",function(){
             console.log('mediaSuccess')
            },function(err){
              console.log(err)
            });
           
           /** TOCA PRIMEIRO SOM APÓS 1.1 SEGUNDOS */
            $timeout(function(){
              media.play();
            },1400);

            /** TOCA SEGUNDO SOM APÓS 2.2 SEGUNDOS  */
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
           
          /** TROCA TELA PARA NORMAL E LIBERA ARQUIVOS DE AUDIO **/ 
          $timeout(function(){
            bluetoothSerial.write(tela);
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

         /** SE ALIMENTAÇÃO FICAR > QUE 100 NÃO DEIXA SUBIR */
         if($rootScope.hunger + amt_feed >= 100){
           $rootScope.hunger = 100;
         }else{
           $rootScope.hunger += amt_feed;
         }

         /**SE A SORTE FOR ENTRE 40 a 60, DIMINUI SAUDE**/
         if(lucky >= 35 && lucky <= 80){
            /** SE SAUDE > 25, PERDE 2 de VIDA **/
            if($rootScope.health > 25){
                $rootScope.health -= amt_feed;

            }else if($rootScope.health > 1 && $rootScope.health <= 25){

              $ionicPopup.alert({
                  title:'Guimo diz:',
                  template: 'Esses '+foodName+'s não me cairam bem.... =/'
              });

              /** SE GUIMO FICAR DOENTE ALTERAR VALOR DE VARIAVEL */
              if(!$scope.sick){
                $scope.sick = true;
                //Seta a variavel para dizer que o app já sabe que o guimo tá doente;
                 
                console.log("entrou guimoDoente");
                bluetoothSerial.write('doente\n');
                 
              }
                $rootScope.health -= 1;
            }
         }
       
    }

    /** DAR REMÉDIO PARA O GUIMO */
    $scope.medkit = function(){
      /** CALCULA % DE CURA de 25 A 100 */
      var heal = Math.floor(Math.random()*75)+25;
      var templ = "";

      if($rootScope.health < 100){
        /** SE CURAR + QUE 100% */
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

        /** SE A SAUDE FICAR > QUE 30, VOLTA PRO NORMAL */
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

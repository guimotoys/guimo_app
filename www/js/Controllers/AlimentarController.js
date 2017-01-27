app.controller('AlimentarController',function($scope,$rootScope,$ionicPlatform,$ionicPopup,$timeout){

  $ionicPlatform.ready(function(){
    $scope.feeding = false;
    $scope.foodSelected = "";
    $scope.sick = false;
    var telaFood = "padrao\n";


    $scope.feed = function(food,foodName){
      $scope.foodSelected = foodName;
      /** NÃO ALIMENTA SE O GUIMO ESTIVER CHEIO **/
      if($rootScope.hunger >= 100){
        $ionicPopup.alert({
            title:'Guimo diz:',
            template: "Ei, não estou com fome... que tal se fossemos brincar?"
        });
      }else {
        /**ALIMENTA SE TIVER COM FOME **/
         /**CALCULA A SORTE DE DIMINUIR A VIDA **/
         var lucky = Math.floor(Math.random()*100)+1;
         var amt_feed = Math.floor(Math.random()*5)+1;
         
         if($rootScope.connected ){
           console.log('entrou Alimentar'+food);
           bluetoothSerial.write(food);
           if($rootScope.hunger < 10){
             telaFood = "fome\n";
           }

           //bluetoothSerial.write(telaFood);
           //$timeout(function(){bluetoothSerial.write(telaFood)},3500);

         }

         /** SE GUIMO COM SAUDE > 25, VOLTA PRA TELA PADRÃO APÓS 3500 ms, SE NÃO, VAI PARA DOENTE**/
         if($rootScope.health > 25){
           if($rootScope.connected){
             $timeout(function(){
               bluetoothSerial.write('padrao\n');
             },3500);
           }
         }else{
           if($rootScope.connected){
             $timeout(function(){
               bluetoothSerial.write('doente\n');
             },3500);
           }
         }

         if($rootScope.hunger + amt_feed > 100){
           $rootScope.hunger = 100;
         }else{
           $rootScope.hunger += amt_feed;
         }

         /**SE A SORTE FOR ENTRE 40 a 60, DIMINUI SAUDE**/
         if(lucky >= 40 && lucky <= 80){
            /** SE SAUDE > 25, PERDE 2 de VIDA **/
            if($rootScope.health > 25){
                $rootScope.health -= amt_feed;

            }else if($rootScope.health > 1 && $rootScope.health <= 25){

              $ionicPopup.alert({
                  title:'Guimo diz:',
                  template: 'Esses '+foodName+'s não me cairam bem.... =/'
              });

              if(!$scope.sick){
                $scope.sick = true;
                //Seta a variavel para dizer que o app já sabe que o guimo tá doente;
                 if($rootScope.connected){
                   console.log("entrou guimoDoente");
                   bluetoothSerial.write('doente\n');
                 }
              }
                $rootScope.health -= 1;
            }
         }

       }
    }

    $scope.medkit = function(){
      var heal = Math.floor(Math.random()*95)+5;
      var templ = "";
      if($rootScope.health < 100){
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

        $ionicPopup.alert({
            title:'Guimo diz:',
            template: templ
        });

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

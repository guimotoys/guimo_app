app.controller('AlimentarController',function($scope,$rootScope,$ionicPlatform,$ionicPopup){

  $ionicPlatform.ready(function(){
    $scope.feeding = false;
    $scope.foodSelected = "";
    $scope.sick = false;


    $scope.feed = function(food,foodName){

      if($rootScope.hunger >= 100){
        $ionicPopup.alert({
            title:'Guimo diz:',
            template: "Ei, não estou com fome... que tal se fossemos brincar?"
        });
      }

       if($rootScope.hunger < 100){
         var lucky = Math.floor(Math.random()*100)+1;
         var amt_feed = Math.floor(Math.random()*5)+1;

         if($rootScope.connected ){
           console.log('entrou Alimentar '+food);
           bluetoothSerial.write(food+'\n');
         }

         if(lucky >= 40 && lucky <= 60){
            if($rootScope.health > 25){
                $rootScope.health -= 2;

            }else if($rootScope.health > 1 && $rootScope.health <= 25){

              if(!$scope.sick){
                $scope.sick = true;
                //Seta a variavel para dizer que o app já sabe que o guimo tá doente;
                 if($rootScope.connected){
                   console.log("entrou guimoDoente");
                   blutoothSerial.write('guimoDoente\n');
                 }
              }

              $ionicPopup.alert({
                  title:'Guimo diz:',
                  template: 'Esses '+foodName+'s não me cairam bem.... =/'
              });

                $rootScope.health -= 1;
            }
         }


         if($rootScope.hunger + amt_feed > 100){
           $rootScope.hunger = 100;
         }else{
           $rootScope.hunger += amt_feed;
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
          bluetoothSerial.write('guimoRemedio\n');
        }

        $ionicPopup.alert({
            title:'Guimo diz:',
            template: templ
        });

        if($rootScope.health >= 45){
          $scope.sick = false;
        }

      }
    }

  });

});

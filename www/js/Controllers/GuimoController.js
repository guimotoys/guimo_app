app.controller('GuimoController',function($scope,$rootScope,$ionicPlatform,$ionicPopup,$interval){
  $scope.energia = 10;
  $rootScope.health = 100;
  $rootScope.hunger = 100;

  $ionicPlatform.ready(function(){

    if(window.cordova){
      $rootScope.connected = false;

      bluetoothSerial.isEnabled(function(){
        },function(){
          bluetoothSerial.enable();
      });

      bluetoothSerial.isConnected(function(){
          $rootScope.$apply(function(){$rootScope.connected = true})
        },function(){
      });
    }

    $interval(function(){
      $rootScope.hunger -= 1;

      if($rootScope.hunger < 10){
        $ionicPopup.alert({
            title:'Guimo diz:',
            template: "Estou com fome, que tal se nós fossemos comer algo?"
        });
      }

    },10000)


  });
});

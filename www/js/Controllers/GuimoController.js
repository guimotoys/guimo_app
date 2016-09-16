app.controller('GuimoController',function($scope,$rootScope,$ionicPlatform){
  $scope.energia = 10;
  
  $ionicPlatform.ready(function(){

    $rootScope.connected = false;

    bluetoothSerial.isEnabled(function(){
      },function(){
        bluetoothSerial.enable();
    });

    bluetoothSerial.isConnected(function(){
        $rootScope.$apply(function(){$rootScope.connected = true})
      },function(){
    });

  });
});

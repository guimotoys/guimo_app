app.controller('GuimoController',function($scope,$rootScope,$ionicPlatform){

  $ionicPlatform.ready(function(){
    $scope.energia = 10;
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

app.controller('GuimoController',function($scope,$rootScope,$ionicPlatform,$ionicHistory){
  $scope.energia = 10;

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
  });
});

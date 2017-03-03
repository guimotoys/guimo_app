app.controller('TelasController',function($scope,$rootScope,$ionicPlatform,$ionicHistory,$timeout){


    $ionicPlatform.ready(function(){

      if(window.cordova){
        $scope.changeScreen = function(tela){
            bluetoothSerial.write(tela);
        }
      }

    });
});

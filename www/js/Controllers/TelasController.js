app.controller('TelasController',function($scope,$rootScope,$ionicPlatform,$ionicHistory,$timeout){


    $ionicPlatform.ready(function(){

      if(window.cordova){
        $scope.trocaTela = function(tela){
            bluetoothSerial.write(tela);  
        }
      }

    });
});


//0 1 2 3 4
//5 6 7 8 9
//10 11 12 13 14

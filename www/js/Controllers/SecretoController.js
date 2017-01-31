app.controller('SecretoController',function($scope,$rootScope,$ionicPlatform,$timeout){

    $ionicPlatform.ready(function(){

        $scope.changeValue = function(value){
            if(value == "food"){
                $rootScope.hunger = 100;
                console.log($rootScope.hunger);
            }

            if(value == "health"){
                $rootScope.health = 100;
            }

            if(value == "fome"){
                $rootScope.hunger = 12;
            }

            if(value == "doente"){
                $rootScope.health = 20;
            }

            if(value == "tela"){
                if(window.cordova){
                    bluetoothSerial.write("padrao\n");
                }
            }
        }
    });

});
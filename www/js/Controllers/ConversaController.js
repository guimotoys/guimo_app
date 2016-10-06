app.controller('ConversaController',function($scope,$rootScope,$ionicPlatform,$ionicHistory,$timeout){
  $scope.awsers = ['Um','Dois','Três','Quatro','Cinco','Seis','Sete','Oito','Nove','Dez','Onze','Doze','Treze','Quatorze','Quinze'];
  $ionicPlatform.ready(function(){
    $scope.awser = '';
    $scope.awsering = false;
    $scope.awsered = false;


    $scope.conversar = function(min,max){
      $scope.awsering = true;
      //Enviar Comando Bluetooth Aqui //

      $timeout(function(){
        $scope.awsering = false;
        $scope.awsered = true;
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        $scope.awser = $scope.awsers[rand];

      },3000);
    }


  });
});


//0 1 2 3 4
//5 6 7 8 9
//10 11 12 13 14

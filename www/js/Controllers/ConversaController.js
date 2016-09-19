app.controller('ConversaController',function($scope,$rootScope,$ionicPlatform,$ionicHistory,$timeout){
  $scope.respostas = ['Um','Dois','Três','Quatro','Cinco','Seis','Sete','Oito','Nove','Dez','Onze','Doze','Treze','Quatorze'];
  $ionicPlatform.ready(function(){
    $scope.resposta = '';
    $scope.respondendo = false;
    if(window.cordova){

    }

    $scope.conversar = function(min,max){
      $scope.respondendo = true;
      $timeout(function(){
        $scope.respondendo = false;
        var rand = Math.floor(Math.random() * (max - min + 1)) + min;
        $scope.resposta = $scope.respostas[rand];
        console.log(rand);
      },3000);
    }


  });
});


//0 1 2 3 4
//5 6 7 8 9
//10 11 12 13 14

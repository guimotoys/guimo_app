app.controller('ConversaController',function($scope,$rootScope,$ionicPlatform,$ionicHistory,$timeout){
 // $scope.awsers = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen'];
  $ionicPlatform.ready(function(){
    $scope.awser = '';
    $scope.awsering = false;
    $scope.awsered = false;


    $scope.talk = function(min,max){
      $scope.awsering = true;
      //Enviar Comando Bluetooth Aqui //
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;
      var str = rand+"\n";
      if($rootScope.connected){
        console.log(str);
        bluetoothSerial.write(str);
      }

      $timeout(function(){
        $scope.awsering = false;
        $scope.awsered = true;
       // $scope.awser = $scope.awsers[rand];
        if($rootScope.connected){
          console.log($rootScope.screen);         
          bluetoothSerial.write($rootScope.screen);
        }
      },5000);

    }


  });
});


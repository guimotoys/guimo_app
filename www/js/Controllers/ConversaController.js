app.controller('ConversaController',function($scope,$rootScope,$ionicPlatform,$ionicHistory){

  $ionicPlatform.ready(function(){
    $scope.voltar = function(){
      console.log("voltar");
      $ionicHistory.goBack();
      console.log($ionicHistory.backView());

    }

  });
});

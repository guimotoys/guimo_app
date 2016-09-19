app.controller('MenuController',function($scope,$rootScope,$ionicPlatform){
    $ionicPlatform.ready(function(){
      if(window.cordova) {

      }
      $scope.alerta = function(cod){
        alert(cod);
        console.log(cod);
      }
    });
});

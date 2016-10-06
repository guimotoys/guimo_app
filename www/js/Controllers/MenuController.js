app.controller('MenuController',function($scope,$rootScope,$ionicPlatform){
    $ionicPlatform.ready(function(){
      if(window.cordova) {
        screen.lockOrientation('portrait');
        window.addEventListener('resize', onresize, false);
      }
      $scope.alerta = function(cod){
        alert(cod);
        console.log(cod);
      }
    });
});

app.controller('MenuController',function($scope,$rootScope,$ionicPlatform,$http,$ionicPopup,$state,$ionicLoading){
    $ionicPlatform.ready(function(){
      var contClicks = 0;
      $scope.position = null;
      $scope.forecasts = [];
      if(window.cordova) {
        screen.lockOrientation('portrait');
        if(navigator.connection.type != "none" || navigator.connection.type != "unknown" );
        {

        }
        window.addEventListener('resize', onresize, false);
      }

      $scope.menuSecreto = function(qtd){
        contClicks++;
        if(contClicks >= qtd){
          contClicks = 0;
          $state.go('secreto');
        }
      }

      $scope.alerta = function(cod){
        alert(cod);
        console.log(cod);
      }
    });
});

app.controller('MenuController',function($scope,$rootScope,$ionicPlatform,$http,$ionicPopup,$state,$ionicLoading){
    $ionicPlatform.ready(function(){
      var contClicks = 0;
      $scope.position = null;
      $scope.forecasts = [];
      if(window.cordova) {
        screen.lockOrientation('portrait');
        if(navigator.connection.type != "none" || navigator.connection.type != "unknown" );
        {
          //console.log(navigator.connection.type);
          //navigator.geolocation.getCurrentPosition(geoSuccess,geoError);
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

      function geoSuccess(position){
        //console.log("lat: "+position.coords.latitude+" long: "+position.coords.longitude);
        $http.get("http://guimonodered.mybluemix.net/tempo?lang=pt-BR&lat="+position.coords.latitude+"&long="+position.coords.longitude)
             .then(function(response){
                $scope.forecasts = response.data;
                var dateTime = new Date($scope.forecasts[0].fcst_valid_local);
                console.log($scope.forecasts);
             });
      }

      function geoError(error){
        console.log(error.message);
      }
    });
});

app.controller('MenuController',function($scope,$rootScope,$ionicPlatform,$http){
    $ionicPlatform.ready(function(){
      $scope.position = null;
      $scope.forecasts = [];
      if(window.cordova) {
        screen.lockOrientation('portrait');
        window.addEventListener('resize', onresize, false);
      }

      navigator.geolocation.getCurrentPosition(geoSuccess,geoError);

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
                console.log(dateTime);
                console.log($scope.forecasts);
             });
      }

      function geoError(error){
        console.log(error.message);
      }
    });
});

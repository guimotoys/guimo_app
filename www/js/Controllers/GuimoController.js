app.controller('GuimoController',function($scope,$rootScope,$ionicPlatform,$ionicPopup,$interval,$state){
  $scope.energia = 10;
  $rootScope.health = 100;
  $rootScope.hunger = 100;
  $scope.device = '';

  $ionicPlatform.ready(function(){

    $rootScope.back = function(st){
        $state.go(st);
    }

    if(window.cordova){
      $rootScope.connected = false;

      /*INSCREVE PARA RECEBER DADOS DO BT **/
      bluetoothSerial.subscribe('\n', function(data){
        console.log(data);
      });

      /*SE BT NAO TIVER LIGADO, PEDE PARA LIGAR **/
      bluetoothSerial.isEnabled(function(){
        },function(){
          bluetoothSerial.enable();
      });

      /*SE BT JÁ TIVER CONECTADO, NÃO MOSTRA OPÇÃO DE CONECTAR */
      bluetoothSerial.isConnected(function(){
          $rootScope.$apply(function(){$rootScope.connected = true});
        },function(){
          $rootScope.$apply(function(){$rootScope.connected = false});
      });

      /**CONECTAR NO BT DO GUIMO **/
      $scope.conectarBt = function(device_name){

        /* LISTA DEVICES PAREADOS **/
        bluetoothSerial.list(function(devices){

          /** PROCURA PELO DEVICE DE NOME GUIMO **/
          devices.forEach(function(device) {
              if(device.name == device_name){
                $scope.$apply(function(){$scope.device = device;});
              }
          });

          /** CONECTA NO DEVICE GUIMO **/
          bluetoothSerial.connect($scope.device.address,function(){
              $rootScope.connected = true;
          },function(err){
            console.log(err);
            $rootScope.connected = false;
          });
        });

      }

    }

    $interval(function(){
      $rootScope.hunger -= 1;
      if($rootScope.hunger < 10){
        $ionicPopup.alert({
            title:'Guimo diz:',
            template: "Estou com fome, que tal se nós fossemos comer algo?"
        });
      }

    },10000);


  });

  $ionicPlatform.registerBackButtonAction(function(){
    $state.go('menu');
  },100);
});

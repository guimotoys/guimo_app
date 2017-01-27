app.controller('GuimoController',function($scope,$rootScope,$ionicPlatform,$ionicPopup,$interval,$state){
  $scope.energia = 10;
  $rootScope.health = 100;
  $rootScope.hunger = 100;
  $scope.device = '';
  $scope.connecting = false;
  var fomeInterval = null;

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

      /**CONECTAR NO BT DO GUIMO **/
      $scope.conectarBt = function(device_name){
        $scope.connecting = true;
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
              $scope.connecting = false;
              $rootScope.connected = true;

              fomeInterval = $interval(function(){
                                  $rootScope.hunger -= 1;
                                  if($rootScope.hunger < 10){

                                    if($rootScope.connected){
                                      console.log('entrou guimoFome');
                                      bluetoothSerial.write('fome\n');
                                    }

                                    $ionicPopup.alert({
                                        title:'Guimo diz:',
                                        template: "Estou com fome, que tal se nós fossemos comer algo?"
                                    });
                                  }

                                },2500);

          },function(err){
            $scope.connecting = false;
            console.log(err);
            $rootScope.connected = false;
          });
        });

      }

      /*SE BT JÁ TIVER CONECTADO, NÃO MOSTRA OPÇÃO DE CONECTAR */
      bluetoothSerial.isConnected(function(){
          $rootScope.$apply(function(){$rootScope.connected = true});
        },function(){
          $rootScope.$apply(function(){$rootScope.connected = false});

          if(fomeInterval != null){
            $interval.cancel(fomeInterval);
          }  
      });

    }

    /*if($rootScope.connected){
        $interval(function(){
          $rootScope.hunger -= 1;
          if($rootScope.hunger < 10){

            if($rootScope.connected){
              console.log('entrou guimoFome');
              bluetoothSerial.write('fome\n');
            }

            $ionicPopup.alert({
                title:'Guimo diz:',
                template: "Estou com fome, que tal se nós fossemos comer algo?"
            });
          }

        },2500);
    }*/
    

  });

  $ionicPlatform.registerBackButtonAction(function(){
    $state.go('menu');
  },100);
});

app.controller('GuimoController',function($scope,$rootScope,$ionicPlatform,$ionicPopup,$interval,$state, $ionicLoading){
  $scope.energia = 10;
  $rootScope.health = 100;
  $rootScope.hunger = 100;
  $rootScope.tela = "padrao\n";
  $scope.device = '';
  $rootScope.connected = false;
  $scope.connecting = false;
  $rootScope.teste = null;
  var functionsInterval = null;

  $ionicPlatform.ready(function(){
    
    $rootScope.back = function(st){
        $state.go(st);
    }

    if(window.cordova){

      /*INSCREVE PARA RECEBER DADOS DO BT **/
      bluetoothSerial.subscribe('\n', function(data){
       // $rootScope.teste = "Teste " + data;
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
              aumentarFome();

              functionsInterval = $interval(function(){
                if($rootScope.hunger <= 10 && $rootScope.health >= 26){
                  if($rootScope.tela != "fome\n"){
                    console.log('entrou guimoFome');  
                    $rootScope.tela = "fome\n";
                    bluetoothSerial.write('fome\n');
                  }
                }

                if($rootScope.hunger < 10 && $rootScope.health < 26){
                  if($rootScope.tela != "doente\n" ){
                    $rootScope.tela = "doente\n";
                    bluetoothSerial.write("doente\n");
                  }
                }

                if($rootScope.hunger > 10 && $rootScope.health >= 26){
                  if($rootScope.tela != "padrao\n"){
                    console.log('entrou semFome');
                    $rootScope.tela = "padrao\n";
                    bluetoothSerial.write("padrao\n")
                  }
                }

                if($rootScope.health >= 26 && $rootScoope.hunger <= 10){
                  if($rootScope.tela != "fome\n"){
                    $rootScope.tela = "fome\n";
                    bluetoothSerial.write('fome\n');
                  }
                }

                if($rootScope.health < 26 && $rootScope.hunger > 10){
                  if($rootScope.tela != "doente"){
                    $rootScope.tela = "doente\n";
                    bluetoothSerial.write('doente\n');
                  }
                }

            },2600);

          },function(err){
            $scope.$apply(function(){
              $scope.connecting = false;
            }) 
            //console.log(err);
            $rootScope.$apply(function(){
              $rootScope.connected = false;
            });
            
            console.log($scope.connecting, $rootScope.connected);
          });
        });

      }

      /*SE BT JÁ TIVER CONECTADO, NÃO MOSTRA OPÇÃO DE CONECTAR */
      bluetoothSerial.isConnected(function(){
          $rootScope.$apply(function(){$rootScope.connected = true});
        },function(){
          $rootScope.$apply(
            function(){
            $rootScope.connected = false;
            if(functionsInterval != null){
              $interval.cancel(functionsInterval);
              functionsInterval = null;
            }
          });
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
    
    function aumentarFome(){
      $interval(function(){
        if($rootScope.hunger > 1 ){
          $rootScope.hunger -= 2;
        }
      },2600);
    }

  });

  $ionicPlatform.registerBackButtonAction(function(){
    $state.go('menu');
  },100);
});

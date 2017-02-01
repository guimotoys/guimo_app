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
       //console.log(data);
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
              
              $scope.$apply(function(){
                $scope.connecting = false;
              });

              $rootScope.$apply(function(){
                $rootScope.connected = true;
              });       

              /*SE BT JÁ TIVER CONECTADO, NÃO MOSTRA OPÇÃO DE CONECTAR */
              bluetoothSerial.isConnected(function(){
                  aumentarFome();

                  checkGuimoStatus();
                  $rootScope.$apply(function(){$rootScope.connected = true});
                },function(){
                  $rootScope.$apply(
                    function(){
                    $rootScope.connected = false;
                  });
              });

          },function(err){
            $scope.$apply(function(){
              $scope.connecting = false;
            }); 
             console.log("Nao Conectou: ", err);
              $rootScope.$apply(function(){
              $rootScope.connected = false;
            });
            
          });
        });

      }

    }
    
    function aumentarFome(){
      $interval(function(){
        if($rootScope.hunger > 1 ){
          $rootScope.hunger -= 2;
        }
      },2600);
    }

    function checkGuimoStatus(){
      console.log('entrou CheckStatus');
      $interval(function(){
                if($rootScope.hunger <= 10 && $rootScope.health >= 26){
                  if($rootScope.tela != "fome\n"){
                    console.log('entrou comFome');  
                    $rootScope.tela = "fome\n";
                    bluetoothSerial.write('fome\n');
                  }
                }

                if($rootScope.hunger < 10 && $rootScope.health < 26){
                  if($rootScope.tela != "doente\n" ){
                    console.log("entrou comFome&Doente");
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

                if($rootScope.health >= 26 && $rootScope.hunger <= 10){
                  if($rootScope.tela != "fome\n"){
                    console.log("Entrou sóFome");
                    $rootScope.tela = "fome\n";
                    bluetoothSerial.write('fome\n');
                  }
                }

                if($rootScope.health < 26 && $rootScope.hunger > 10){
                  if($rootScope.tela != "doente"){
                    console.log("entrou sóDoente");
                    $rootScope.tela = "doente\n";
                    bluetoothSerial.write('doente\n');
                  }
                }

            },2600);
    }

  });

  $ionicPlatform.registerBackButtonAction(function(){
    $state.go('menu');
  },100);
});

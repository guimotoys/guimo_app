app.controller('GuimoController',function($scope,$rootScope,$ionicPlatform,$ionicPopup,$interval,$state, $ionicLoading){
  $scope.energia = 10;
  $rootScope.health = 100;
  $rootScope.hunger = 100;
  $rootScope.screen = "padrao\n";
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

      /*ENTER TO RECEIVE BT DATA **/
      bluetoothSerial.subscribe('\n', function(data){
       // $rootScope.teste = "Teste " + data;
       
      });

      /*IF BT HAS NOT TURNED ON, REQUEST TO CONNECT **/
      bluetoothSerial.isEnabled(function(){
        },function(){
          bluetoothSerial.enable();
      });

      /**CONNECT IN THE GUIMO BT **/
      $scope.connectBt = function(device_name){
        $scope.connecting = true;
        /* LIST PAIRED DEVICES **/
        bluetoothSerial.list(function(devices){

          /** LOOKING FOR THE DEVICE OF GUIMO NAME **/
          devices.forEach(function(device) {
              if(device.name == device_name){
                $scope.$apply(function(){$scope.device = device;});
              }
          });

          /** CONNECT ON DEVICE GUIMO **/
          bluetoothSerial.connect($scope.device.address,function(){
              
              $scope.$apply(function(){
                $scope.connecting = false;
              });

              $rootScope.$apply(function(){
                $rootScope.connected = true;
              });       

              /*IF BT HAS ALREADY CONNECTED, IT DOES NOT SHOW OPTION TO CONNECT */
              bluetoothSerial.isConnected(function(){
                  increateHunger();

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
             console.log("Not Connected:  ", err);
              $rootScope.$apply(function(){
              $rootScope.connected = false;
            });
            
          });
        });

      }

    }
    
    function increateHunger(){
      $interval(function(){
        if($rootScope.hunger > 1 ){
          $rootScope.hunger -= 2;
        }
      },2600);
    }

    function checkGuimoStatus(){
      console.log('entered CheckStatus');
      $interval(function(){
                if($rootScope.hunger <= 10 && $rootScope.health >= 26){
                  if($rootScope.screen != "fome\n"){
                    console.log('enter in Fome');  
                    $rootScope.screen = "fome\n";
                    bluetoothSerial.write('fome\n');
                  }
                }

                if($rootScope.hunger < 10 && $rootScope.health < 26){
                  if($rootScope.screen != "doente\n" ){
                    console.log("enter in Hunger&Sick");
                    $rootScope.screen = "doente\n";
                    bluetoothSerial.write("doente\n");
                  }
                }

                if($rootScope.hunger > 10 && $rootScope.health >= 26){
                  if($rootScope.screen != "padrao\n"){
                    console.log('enter no Hunger');
                    $rootScope.screen = "padrao\n";
                    bluetoothSerial.write("padrao\n")
                  }
                }

                if($rootScope.health >= 26 && $rootScope.hunger <= 10){
                  if($rootScope.screen != "fome\n"){
                    console.log("enter only hunger");
                    $rootScope.screen = "fome\n";
                    bluetoothSerial.write('fome\n');
                  }
                }

                if($rootScope.health < 26 && $rootScope.hunger > 10){
                  if($rootScope.screen != "doente"){
                    console.log("enter only Sick");
                    $rootScope.screen = "doente\n";
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

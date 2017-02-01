app.controller('BlocklyController',function($scope,$rootScope,$ionicPlatform,$timeout,$interval){
  $scope.codes;

  $ionicPlatform.ready(function(){
      /** RESIZE EVENT TO LANDSCAPE SCREEN */
      window.addEventListener('resize', onresize, false);

      /** BLOCKLY CONFIG DIVS */
      var blocklyArea = document.getElementById('blocklyArea');
      var blocklyDiv = document.getElementById('blocklyDiv');
      var workspace = Blockly.inject(blocklyDiv, {toolbox: document.getElementById('toolbox')});

      /** RESIZE SCREEN TO BLOCKLY */
      var onresize = function(e) {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        var element = blocklyArea;
        var x = 0;
        var y = 0;
        do {
          x += element.offsetLeft;
          y += element.offsetTop;
          element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
      };

      /** RUN BLOCKLY BLOCKS CODE */
      $scope.runCode = function(){
          //PEGA O WORKSPACE e CODIGO DO BLOCKLY
          var workspace = document.getElementById('BlocklyDiv');
          var code = Blockly.JavaScript.workspaceToCode(workspace);
          //CONFIGURA CODIGO RECEBIDO
          $scope.codes = code.split(",");
          $scope.codes.splice(-1,1);
          //console.log($scope.codes);
          var i = 0;
          var tam = $scope.codes.length - 1;
          var repeatQtd = parseInt($scope.codes[tam]);
          

          /** SE NAO FOR NaN (Not A Number) ENTÃO é REPEAT BLOCK */
          if(!isNaN(repeatQtd)){
              // console.log($scope.codes);
             if($rootScope.connected){

                  /** INTERVALO INICIAL, QTD DE REPETIÇÕES*/
                  $interval(function(){
                    var k = 0;
                     
                     /** INTERVALO DE DENTRO, ENVIAR DADOS DENTRO DO ARRAY DE CODES */
                    $interval(function(){
                       var realcode = $scope.codes[k].split("  ");
                       var realCodeTam = realcode.length;
                       for(var m = 0; m < realCodeTam; m++){
                         if(realcode[m] != ""){
                          bluetoothSerial.write(realcode[m]);
                          console.log(realcode[m]);
                         }
                       }
                      k++;
                    },350,tam);

                  },750,repeatQtd)
                                   
              }
          }

          
          if(isNaN(repeatQtd)){
            $interval(function(){
              if($rootScope.connected){
                //console.log($scope.codes[i]);
                bluetoothSerial.write($scope.codes[i]);
              }
              i++;
            },210,tam+1);
          }

        };

      if(window.cordova){
        screen.lockOrientation('landscape');

      }

  });

});

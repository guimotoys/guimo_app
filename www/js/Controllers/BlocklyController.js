app.controller('BlocklyController',function($scope,$rootScope,$ionicPlatform,$timeout,$interval){
  $scope.codes;

  $ionicPlatform.ready(function(){
      window.addEventListener('resize', onresize, false);
  });

  if(window.cordova){
    screen.lockOrientation('landscape');
  }

  var blocklyArea = document.getElementById('blocklyArea');
  var blocklyDiv = document.getElementById('blocklyDiv');
  var workspace = Blockly.inject(blocklyDiv, {toolbox: document.getElementById('toolbox')});

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

  if(window.cordova){


    $scope.runCode = function(){
      var workspace = document.getElementById('BlocklyDiv');
      var code = Blockly.JavaScript.workspaceToCode(workspace);
      $scope.codes = code.split(",");
      var i = 0;
      var tam = $scope.codes.length - 1;


      $interval(function(){
        if($rootScope.connected){
          bluetoothSerial.write($scope.codes[i]);
        }
        i++;
      },900,tam);

    };
  }

});

app.controller('ControlarController',function($scope,$rootScope,$ionicPlatform,$ionicHistory,$interval,$timeout){


    $ionicPlatform.ready(function(){

      if(window.cordova){
        screen.lockOrientation('landscape');

        $scope.buzinar = function(sound){
          var media = new Media("/android_asset/www/sound_effects/"+sound+".mp3");

          media.play();
          $timeout(function(){media.release()},2000);
        }

      }

      console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

			var joystick	= new VirtualJoystick({
				container	: document.getElementById('container'),
				mouseSupport	: true,
        stationaryBase: true,
        baseX: 140,
        baseY: 130,
        limitStickTravel: true,
        stickRadius: 100
			});
      
			$interval(function(){
        if(joystick.right()){
          bluetoothSerial.write('r\n');
        }

        if(joystick.up()){
          bluetoothSerial.write('f\n');
        }

        if(joystick.down()){
          bluetoothSerial.write('b\n');
        }

        if(joystick.left()){
          bluetoothSerial.write('l\n');
        }

				console.log('Result:'
					+ (joystick.right()	? ' right'	: '')
					+ (joystick.up()	? ' up'		: '')
					+ (joystick.left()	? ' left'	: '')
					+ (joystick.down()	? ' down' 	: ''));
			}, 550);

    });
});

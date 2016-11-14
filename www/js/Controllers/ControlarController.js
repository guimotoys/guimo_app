app.controller('ControlarController',function($scope,$rootScope,$ionicPlatform,$ionicHistory,$interval){


    $ionicPlatform.ready(function(){

      if(window.cordova){
        screen.lockOrientation('landscape');
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

				console.log('Result:'
					+ (joystick.right()	? ' right'	: '')
					+ (joystick.up()	? ' up'		: '')
					+ (joystick.left()	? ' left'	: '')
					+ (joystick.down()	? ' down' 	: ''));
			}, 700);

    });
});

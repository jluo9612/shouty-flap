document.addEventListener('deviceready',function() {
	if (window.device.platform === 'iOS') {
		cordova.plugins.iosrtc.registerGlobals();
	}

	var sketch = function (p) {
		var input;
		var analyzer;
		var vol;
		var mic;


		p.setup = function() {
		    mic = new p5.AudioIn();
		    mic.start();
		}

		p.draw = function () {
		    vol = mic.getLevel();
		    if(0.3 < vol) {
		      console.log("yay");
		    } else {
		      console.log("nope");
		    }
		    
		    if(0.3 < vol) {
			runGame();
			console.log("game running");
		    }
		}

		function runGame() {
		    window.location = "startgame.html";
		} 
	};
	new p5(sketch);
});

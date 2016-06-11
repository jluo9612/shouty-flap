var input;
var analyzer;
var vol;

mic = new p5.AudioIn();

function setup() {
    mic.start();
}

function draw() {
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
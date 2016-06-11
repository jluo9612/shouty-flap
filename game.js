var backgroundImage;
var enemy;
var enemyImage;
var enemy2;
var enemyImage2;
var player;
var playerImage;
var isGameOver;
var score;

function preload() {
    backgroundImage = loadImage("ahhp.jpg");
    playerImage = loadImage("swaggybird.png");
    enemyImage = loadImage("pig.png");
    enemyImage2 = loadImage("pigd.png");
    isGameOver = false;
}

function setup() {
    createCanvas(550, 300);
    mic = new p5.AudioIn();
    mic.start();
    player = createSprite(width/12, height-5, 10, 5);
    player.addImage(playerImage);
    enemy = createSprite(width, height-80, 20, 5);
    enemy.addImage(enemyImage);
    enemy2 = createSprite(width, height-80, 20, 5);
    enemy2.addImage(enemyImage2);
    score = 0;
}

function draw() {
    background(backgroundImage);
    
    //get the current amplitude value
    var vol = mic.getLevel();
    console.log(vol);
    textAlign(CENTER);
    textSize(50);
    text(score, camera.position.x, 50);
    drawSprites();
    
    score += 1
    
    if (isGameOver){
        score = 0;
    }
    console.log("going down");
    player.position.y += 3;
    
    if(0.1 < vol) {
        console.log("going up");
        player.position.y -= 10;
    } 
    // else if(0.2 < vol < 1) {
    //     player.position.y -= 3;
    //     console.log("going up faster");
    // }
    
    if(0.1 < vol < 1 && player.position.y <= 25) {
        player.position.y = 25;
    }
    
    if(vol < 0.1 && player.position.y > height-20) {
        player.position.y = height-20;
    }
    
    // else {
    //     player.position.y = height-25;
    
    // }
    
    // if(player.position.y < 25) {
    //     player.position.y = 25;
    // }

    if (isGameOver) {
        gameOver();
    } else {
        
        if (enemy.overlap(player) || enemy2.overlap(player)) {
            isGameOver = true;
        } else {
            isGameOver = false;
        }
    }
    
    enemy.position.x -= random(1,4);
    enemy2.position.x -= random(1,4);
    
    if(50 < enemy.position.y < height-40 || 40 < enemy2.position.y < height-40) {
        enemy.position.y += random(-16, 16);
        enemy2.position.y += random(-16, 16);
    } else {
        if(enemy.position.y < 50 || enemy2.position.y < 40) {
            enemy.position.y += random(3, 12);
            enemy2.position.y += random(3, 12);
        }
        
        if(enemy.position.y > height-40 || enemy2.position.y > height-40) {
            enemy.position.y -= random(3, 12);
            enemy2.position.y -= random(3, 12);
        }
    }
    
    if (enemy.position.x < -25 || enemy2.position.x < -25) {
        enemy.position.x = width+5;
        enemy.position.x -= random(1,4);
        enemy2.position.x = width+5;
        enemy2.position.x -= random(1,4);
    }

function gameOver() {
    background(1, 11, 92);
    textAlign(CENTER);
    fill("white");
    textSize(20);
    text("You score:" + score, camera.position.x, camera.position.y-30);
    text("GAME OVER!", width/2, height/2);
    text("Press enter key or click anywhere to try again", width/2, 3*height/5);
}

}

function mouseClicked() {
    
    if (isGameOver) {
        score = 0;
        isGameOver = false;
        player.position.x = width/12;
        player.position.y = height-20;
        enemy.position.x = width;
        enemy.position.x += random(1, 4);
        enemy.position.y = random(5, height-5);
    }
}

function keyPressed() {
    if (keyCode === 13) {
        if (isGameOver) {
        isGameOver = false;
        player.position.x = width/12;
        player.position.y = height-20;
        enemy.position.x = width;
        enemy.position.x += random(1, 4);
        enemy.position.y = random(5, height-5);
        }
    }
    return false; //prevent any default behavior
}
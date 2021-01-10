var monkey, monkey_running, monkeyDeathImage;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, stoneGroup;
var survivalTime = 0;
var bankGothicFont;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bankGothicFont = loadFont("BankGothic.ttf");
  monkeyDeathImage = loadImage("Death.png");

}



function setup() {
  createCanvas(800, 400)
  monkey = createSprite(100, 315, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(monkey.x, 350, 1000, 10);
  ground.x = ground.width / 2;

  bananaGroup = new Group();
  stoneGroup = new Group();

}


function draw() {
  background("green");

  if (keyDown("space") && monkey.y >= 310) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.45;

  if (ground.x > 0) {
    ground.x = ground.width / 2;
  }

  survivalTime = Math.ceil(frameCount/frameRate());

  stroke("cornflowerblue");
  fill("black");
  textSize(20);
  textFont(bankGothicFont);
  text("Survival Time: " + survivalTime, 100, 150);

  monkey.collide(ground);

  camera.position.x = monkey.x;
  camera.position.y = monkey.y;

  food();
  obstacle();
  stop(); 
  drawSprites();
}

function food() {

  if (frameCount % 80 === 0) {

    var banana = createSprite(410, 120, 20, 40);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function obstacle() {

  if (frameCount % 300 === 0) {

    var stone = createSprite(410, 325, 20, 40);
    stone.addImage(obstacleImage);
    stone.scale = 0.1;
    stone.velocityX = -6;
    stone.lifetime = 200;
    stoneGroup.add(stone);
  }
}

function stop() {
  
    if(stoneGroup.isTouching(monkey)) {
     
    ground.velocityX = 0;
    
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    
    bananaGroup.setVelocityXEach(0);
    bananaGroup.visible = false;
    bananaGroup.setLifetimeEach = -1;
    
    stoneGroup.setLifetimeEach = -1;
   stoneGroup.setVelocityXEach(0);
    stoneGroup.visible = false;
     
  }
}
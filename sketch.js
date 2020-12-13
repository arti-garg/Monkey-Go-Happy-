var monkey, monkey_running
var bg;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(600, 600);
  monkey = createSprite(130, 450, 10, 10);
  monkey.addAnimation("m1", monkey_running);
  monkey.scale = 0.2;

  bg = createSprite(250, 500, 800, 10);
  bg.setVelocityX = -4;
  bg.x = bg.width / 2;

  FoodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
}


function draw() {
  background("white");

  // display survival time 
  textSize(20);
  fill("blue")
  stroke(15);
  text("Survival Time : " + survivalTime, 230, 100);
  survivalTime = Math.ceil(frameCount / frameRate())


  // reset background
  if (bg.x < 0) {
    bg.x = bg.width / 2;
  }

  // making monkey jump
  if (keyDown("space") && monkey.y > 150) {
    monkey.velocityY = -12;
    console.log("jump");
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(bg);

    
  food()
  obstacles();
  
     if(obstacleGroup.isTouching(monkey)){
        bg.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  
  drawSprites();
}

function food() {

  if (frameCount % 80 === 0) {


    var banana = createSprite(700, 100, 10, 10);
    banana.addImage("b1", bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -6;
    banana.lifetime = 200;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function obstacles() {

  if (frameCount % 300 === 0) {
    var obs = createSprite(700, 470, 10, 10);
    obs.addImage("o1", obstacleImage);
    obs.scale = 0.2;
    
    obs.velocityX=-6;
    obs.lifetime= 300;
    
 obstacleGroup.add(obs);
  }

}
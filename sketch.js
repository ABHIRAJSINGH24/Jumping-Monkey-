var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running,ground,inground;  
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score,bananasCollected;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,600);
monkey=createSprite(75,350,20,20);
monkey.addAnimation("sprite_1",monkey_running);
monkey.scale=0.18;
ground=createSprite(300,350,800,10)
foodGroup=new Group();
obstacleGroup=new Group();
score=0;
bananasCollected=0;
inground=createSprite(75,370,800,10);
}


function draw() {
background("white");
inground.visible=false;
monkey.collide(ground);
if (gameState===PLAY){
ground.velocityX=-7;
if (ground.x<width/2){
  ground.x=300;
}
if (keyDown("space")&&monkey.y>285){
  monkey.velocityY=-16;
}
  monkey.velocityY=monkey.velocityY+0.8;
if (frameCount%80===0){
  make_banana();
}
if (frameCount%300===0){
  make_obstacle();
}
score=score+Math.round(getFrameRate()/60);
stroke("blue");
text("Bananas Collected:"+bananasCollected,100,50);
text("Survival Points:"+score,400,50);
if (monkey.isTouching(foodGroup)){
  foodGroup.destroyEach();
  bananasCollected=bananasCollected+1;
}
if (monkey.isTouching(obstacleGroup)){
  monkey.velocityY=0;
  ground.velocityX=0;
  foodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  gameState=END;
}
}else if(gameState===END){
  stroke("blue");
  text("Game Over",300,75);
  text("Press R to play again",275,100);
  text("Bananas Collected:"+bananasCollected,270,25);
  text("Survival Points:"+score,280,50);
  foodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
  if (keyDown("r")){
    gameState=PLAY;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=0;
    bananasCollected=0;
  }
}
drawSprites(); 
}
function make_banana(){
  banana=createSprite(400,Math.round(random(120,250)),20,20);
  banana.addImage(bananaImage);
  banana.scale=0.15;
  banana.velocityX=-7;
  banana.lifetime=150;
  foodGroup.add(banana);
}
function make_obstacle(){
  obstacle=createSprite(400,330,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.collide(inground);
  obstacle.velocityX=-7;
  obstacle.lifetime=150;
  obstacleGroup.add(obstacle);
}





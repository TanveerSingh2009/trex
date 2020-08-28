var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudgroup,cloudimage;
var obs1,obs2,obs3,obs4,obs5,obs6,obstaclegroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage=loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
 
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("trex_collided",trex_collided);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudgroup=new Group();
  obstaclegroup=new Group();


}

function draw() {
  background("white");
  score=score+Math.round(World.frameRate/60);
  text("score="+score,450,100);
       
   if(gameState === PLAY){
  
  if(keyDown("space")&&trex.y>=160) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
     spawnclouds();
  spawnobstacles();
     if(obstaclegroup.isTouching(trex)){
       gameState=END;
       
     }
   }
   else if(gameState === END) {
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    score=0;
    
  }
  

  
  trex.collide(invisibleGround);
  
  drawSprites();
}
function spawnclouds(){
 if(frameCount % 60===0){ 
  var cloud=createSprite(500,100.30,40);
  cloud.y=Math.round(random(50,100)); 
  cloud.addImage(cloudimage);
   cloud.scale=0.5;
   cloud.velocityX=-6;
   cloud.lifetime=100;
   cloud.depth=trex.depth;
   trex.depth=trex.depth+1;
   cloudgroup.add(cloud);
   
 } 
}
function spawnobstacles(){
  if(frameCount % 80===0){
     var obstacle=createSprite(500,170,30,40);
     obstacle.velocityX=-6;
     var rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obs1);
             break; 
      case 2:obstacle.addImage(obs2);
             break; 
      case 3:obstacle.addImage(obs3);
             break;   
      case 4:obstacle.addImage(obs4);
             break;  
      case 5:obstacle.addImage(obs5);
             break;  
      case 6:obstacle.addImage(obs6);
             break;      
      default:break; 
    }
    obstacle.scale=0.5;
    obstacle.lifetime=90;
    obstaclegroup.add(obstacle);
  }
  

}
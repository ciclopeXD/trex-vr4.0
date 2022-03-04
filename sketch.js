var trex, trex_running, edges;
var groundImage,ground;
var clowdImage;
var clowdGroup;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstaclesGroup;
var marcador=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  clowdImage=loadImage("nube.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200);
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50

  ground=createSprite(200,180,400,20);
  ground.addImage("suelo",groundImage);
  invisibleGround=createSprite(200,190,400,18);
  invisibleGround.visible=false;
  clowdGroup=new Group();
  obstacleGroup=new Group();
}


function draw(){
  //establecer color de fondo.
  background("white");
  text(marcador + " marcador",530,50);
  marcador=marcador+Math.round(frameCount/100);
  if(gameState === PLAY){
    ground.velocityX=-5;
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    if(keyDown("space")&& trex.y>150){
      trex.velocityY = -10;
      
    }
    trex.velocityY = trex.velocityY + 0.5;
    clowds();
    obstacles();
    //evitar que el Trex caiga
    trex.collide(invisibleGround);
  if(obstacleGroup.isTouching(trex)){
    gameState=END;
  }
  }else if(gameState === END){
ground.velocityX=0;
trex.velocityY=0;
text("enter para reiniciar",200,200);
  }
  
  
 
 
  drawSprites();
}

function clowds(){
 var numeros;
numeros=Math.round(random(0,100)) 
  if(frameCount %60 === 0){
    clowd=createSprite(600,numeros,40,10);
  clowd.addImage(clowdImage);
  clowd.scale=0.2;
 clowd.velocityX=-3;
 clowd.depth=trex.depth;
 trex.depth=trex.depth+3;
 clowdGroup.add(clowd);
 clowd.lifetime=200;
  }
}
function obstacles(){
  var numeros;
  var posicion=[30,40,60,80,100];
numeros=Math.round(random(posicion)) 
  if(frameCount %numeros === 0){
obstacle=createSprite(600,160,10,40);
obstacle.velocityX=-5;
obstacleGroup.add(obstacle);
switch(Math.round(random(1,6))){
  case 1: obstacle.addImage(obstacle1);break;
  case 2: obstacle.addImage(obstacle2);break;
  case 3: obstacle.addImage(obstacle3);break;
  case 4: obstacle.addImage(obstacle4);break;
  case 5: obstacle.addImage(obstacle5);break;
  case 6: obstacle.addImage(obstacle6);break;
  default:break;
}
obstacle.scale=0.5;
obstacle.lifetime=125;
  }
}
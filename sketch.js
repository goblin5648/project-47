var golem,golem_running_r,golem_running_l, golemShooting, golemdeath, golemEnd;
var background1,backgroundimg;
var invisGround;
var enemie,enemieimg;
var plform;
var rock;
var score;

function preload() {
  enemieimg = loadImage("Images/enemie1.png");

  golem_running_r = loadAnimation("Images/GR1.png","Images/GR2.png","Images/GR3.png","Images/GR4.png","Images/GR5.png","Images/GR6.png","Images/GR7.png","Images/GR8.png","Images/GR9.png","Images/GR10.png","Images/GR11.png");
  golem_running_l = loadAnimation("Images/GL1.png","Images/GL2.png","Images/GL3.png","Images/GL4.png","Images/GL5.png","Images/GL6.png","Images/GL7.png","Images/GL8.png","Images/GL9.png","Images/GL10.png","Images/GL11.png");
  golemShooting = loadAnimation("Images/GolemSh1.png","Images/GolemSh2.png","Images/GolemSh3.png","Images/GolemSh4.png","Images/GolemSh5.png","Images/GolemSh6.png","Images/GolemSh7.png");
  golemdeath = loadAnimation("Images/golemd1.png","Images/golemd2.png","Images/golemd3.png","Images/golemd4.png","Images/golemd5.png");
  golemEnd = loadImage("Images/golemd5.png");

  backgroundimg = loadImage("Images/dungeon_background.jpg");

  rock = loadAnimation("Images/rock1.png","Images/rock2.png","Images/rock3.png","Images/rock4.png","Images/rock5.png",)
}

function setup() {
  createCanvas(800,400);

  background1 = createSprite(400, 400, 800, 400);
  background1.addImage(backgroundimg);
  background1.x = background1.width/2;
  
  golem = createSprite(70,352);
  golem.addAnimation("running_right",golem_running_r);
  golem.addAnimation("running_left",golem_running_l);
  golem.addAnimation("shooting",golemShooting);
  golem.addAnimation("death",golemdeath);
  golem.addImage("end",golemEnd);

  rock.addAnimation("shot",rock);

  invisGround = createSprite (400,418,800,2);
invisGround.visible = false

  score = 0;

  enemiesGroup = new Group ();
  plformGroup = new Group ();

}

function draw() {
  background(0);  

  background1.velocityX = -3;

  if (background1.x <0) {
    background1.x = background1.width/2;
  }

  golem.collide(invisGround);

  golem.velocityY = golem.velocityY + 0.9  ;

  if(keyDown("space")){
    golem.velocityY = -15;
  }

  if(keyDown(LEFT_ARROW)){
    golem.x = golem.x - 1.5;
    golem.changeAnimation("running_left",golem_running_l);
  }

  if(keyDown(RIGHT_ARROW)){
    golem.x = golem.x + 1.5;
    golem.changeAnimation("running_right",golem_running_r);
  }

  if(keyDown(DOWN_ARROW)){
    shoot();
    golem.changeAnimation("shooting",golemShooting);
  }

  if (enemiesGroup.isTouching(golem)){
    golem.changeAnimation("death",golemdeath);
    enemiesGroup.setVelocityXEach(0);
    plformGroup.setVelocityXEach(0);
    plformGroup.destroyEach();
    golem.changeImage("end",golemEnd);
    background1.velocityX = 0
  }

  if (enemiesGroup.isTouching(rock)){
    enemiesGroup.destroyEach();
    rock.destroyEach();
    score=score+1;
  }

  text("score: "+score,1600,20);

  drawplform();
  drawEnemie();
  drawSprites();
}

function drawEnemie(){

  if(frameCount % 120 == 0){

  
  enemie = createSprite(800,360,50,30)
  enemie.addImage(enemieimg);
  enemie.velocityX=-5;

  enemie.scale = 0.5;
  enemie.lifeTime = 500;
  enemiesGroup.add(enemie);
}
}


function drawplform(){
  if(frameCount % 100==0) {

    plform = createSprite(50, 350,150,30);
    plform.shapeColor ="tan";
    plform.x = Math.round(random(50,350));
    plform.y = Math.round(random(200,350));
    plform.velocityX = -3;
    plform.depth = golem.depth;
    golem.depth = golem.depth+1;
    plformGroup.add(plform);
  }
}

function shoot(){
  rock = createSprite(golem.x,golem.y,30,30);
  rock.velocity = +5;
}
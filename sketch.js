var Play = 1;
var end = 0;
var gameState = Play;
var pl,pi,bgi;
var bg_sound,gi,gGroup,g;
var e = 50;

function preload()
{
  bgi = loadImage("bg.jpg");
  pi = loadImage("p.png");
  bg_sound = loadSound("rain.mp3");
  gi = loadImage("gball.png");
}

function setup() {
  createCanvas(1400,650);
  pl = createSprite(5915, 1130, 50, 50);
  pl.addImage(pi);
  pl.scale = 0.4;

  pl.setCollider("rectangle",0,0,30,30);
  pl.debug = false; 

  gGroup = createGroup();

}

function draw() {
  background(0);  
  image(bgi,480,-displayHeight*2,displayWidth*4,displayHeight*4);

  camera.position.x = pl.x;
  camera.position.y = pl.y;

  fill('white');
  textSize(20);
  text("Energy: " + e,pl.x - 650,pl.y - 275);

  if (gameState === Play)
  {
      spawnG();

      if (frameCount % 40 === 0)
      {
        bg_sound.play();
      }

      if (keyDown("left_arrow"))
      {
        pl.x -= 5;
        e -= 0.5;
      }
      else if (keyDown("right_arrow"))
      {
        pl.x += 5;
        e -= 0.5;
      }
      if (gGroup.isTouching(pl))
      {
        e++;
        g.destroy();
      }

      if (e < 5)
      {
        gameState = end;
      }
}

if (gameState === end)
{
    fill('yellow');
    textSize(40);
    text("Energy is Low!",pl.x,pl.y - 100);
    gGroup.destroyEach();
}

  drawSprites();
}

function spawnG()
{
  if (frameCount % 60 === 0)
  {
    g = createSprite(random(pl.x - 10,pl.x - 400),pl.y,7,7);
    g.addImage(gi);
    g.scale = 0.1;
    g.lifetime = 200;
    gGroup.add(g);
  }
}
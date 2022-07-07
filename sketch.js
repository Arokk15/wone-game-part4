var bg, bgImg;
var player, shooterImg, shooter_shooting;
var inwall = []
var bulletlimg, bulletrimg
var bullet, bulletg
var nob = 10
var gameover, goimg
var fly, en, enimg1, enimg2, enimg3, enimg4, flyimg, flydimg
var enemyg
var score = 0
var rcbullet
var rewardb, rewardbg
var btboximg
var targ,gamestate=1
var health=290


function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg3.jpg")

  bulletlimg = loadImage("assets/bulletl.png")
  bulletrimg = loadImage("assets/bulletr.png")
  goimg = loadImage("assets/gameover.jpg")

  enimg1 = loadAnimation("assets/en1/en1-0.png", "assets/en1/en1-1.png", "assets/en1/en1-2.png", "assets/en1/en1-3.png")
  enimg2 = loadAnimation("assets/en2/en2-0.png", "assets/en2/en2-1.png", "assets/en2/en2-2.png", "assets/en2/en2-3.png")
  enimg3 = loadAnimation("assets/en3/en3-0.png", "assets/en3/en3-1.png", "assets/en3/en3-2.png", "assets/en3/en3-3.png")
  enimg4 = loadAnimation("assets/en4/en4-0.png", "assets/en4/en4-1.png", "assets/en4/en4-2.png", "assets/en4/en4-3.png")
  btboximg = loadImage("assets/btbox.png")




}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(windowWidth / 2, windowHeight / 2)
  bg.addImage(bgImg)
  bg.scale = 1 / 2.4
  //bg.scale = 0.2
  gameover = createSprite(windowWidth / 2 - 20, windowHeight / 2 - 40, 20, 20)
  gameover.addImage(goimg)
  gameover.scale = 2
  gameover.visible = false

  //creating the player sprite
  player = createSprite(windowWidth / 2, windowHeight / 2 + 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 500)

  inwall0 = createSprite(0, windowHeight / 2 + 250, 5, 500)
  inwall1 = createSprite(windowWidth, windowHeight / 2 + 250, 5, 500)
  inwall2 = createSprite(windowWidth / 2, windowHeight / 2 + 160, width, 5)
  inwall3 = createSprite(windowWidth / 2, windowHeight - 1, width, 5)

  inwall = [inwall0, inwall1, inwall2, inwall3]

  rewardb = createSprite(20, 50)
  rewardb.addImage(bulletrimg)
  rewardb.visible = false

  rect21=createSprite(width/2+200,100,300,3)
  rect212=createSprite(width/2+50,120,3,40)

  bulletg = new Group()
  enemyg = new Group()
  rcbullet = new Group()
  rewardbg = new Group()
  targ = new Group()



}

function pointer(playerX, playerY) {
  var poi = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200]
  for (var i = 0; i < 10; i++) {

    rect1 = createSprite(playerX + poi[i], playerY - 24, 5, 5)
    rect1.shapeColor = "green"
    targ.add(rect1)

  }
}

function draw() {
  background(0);
  drawSprites();
  if(gamestate==1){

    
    targ.setVisibleEach(false)
    if (keyDown("space")) {
      pointer(player.x, player.y)
    }
  
  
  
    //moving the player up and down and making the game mobile compatible using touches
    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30
    }
    if (keyDown("LEFT_ARROW") || touches.length > 0) {
      player.x = player.x - 30
    }
    if (keyDown("RIGHT_ARROW") || touches.length > 0) {
      player.x = player.x + 30
    }
  
  
    //release bullets and change the image of shooter to shooting position when space is pressed
    if (keyWentDown("space")) {
  
      player.addImage(shooter_shooting)
  
    }
    if (keyWentUp("space")) {
      bullet = createSprite(player.x, player.y - 25)
      bullet.addImage("bullet", bulletrimg)
      bullet.scale = 0.1
      bullet.velocityX = 50
      bullet.debug = true
      bulletg.add(bullet)
      nob = nob - 1
      //targ.destroyEach()
  
    }
    //
    if (nob <= 0) {
      
      gamestate=2
    }
    //
  
    //player goes back to original standing image once we stop pressing the space bar
    else if (keyWentUp("space")) {
      player.addImage(shooterImg)
    }
  
    for (var i = 0; i < inwall.length; i++) {
      player.collide(inwall[i])
      inwall[i].visible = false
    }
  
    for (var i = 0; i < bulletg.length; i++) {
  
      for (var g = 0; g < enemyg.length; g++) {
        if (enemyg[g].isTouching(bulletg[i])) {
          enemyg[g].destroy()
          score = score + 1
          bulletg[i].destroy()
        }
      }
    }


  
      for (var g = 0; g < enemyg.length; g++) {
        if (enemyg[g].isTouching(player)) {
          enemyg[g].destroy()
          health=health-100
          helth()
        }
      }

      for (var g = 0; g < rcbullet.length; g++) {
        if (rcbullet[g].isTouching(player)) {
          rcbullet[g].destroy()
          health=health-100
          helth()
        }
      }

      if(health<1){
        gamestate=2
      }
  
  
  
    for (var i = 0; i < bulletg.length; i++) {
  
      for (var g = 0; g < rcbullet.length; g++) {
        if (rcbullet[g].isTouching(bulletg[i])) {
          rcbullet[g].velocityX = 0
          rewardb = createSprite(20, 50)
          rewardb.addImage(btboximg)
          rewardb.x = rcbullet[g].x
          rewardb.y = rcbullet[g].y
          rewardb.scale = 0.3
          rewardb.visible = true
          rewardbg.add(rewardb)
          rcbullet[g].destroy()
          score = score + 1
          bulletg[i].destroy()
        }
  
      }
    }
    for (var i = 0; i < rewardbg.length; i++) {
      if (player.isTouching(rewardbg[i])) {
        nob = nob + 10
        rewardbg[i].destroy()
  
      }
    }
  
  
  
    enemyreward()
    enemy()
    helth()
  
    
  

  }
  if(gamestate==2){
    player.destroy()
    bulletg.destroyEach()
    enemyg.destroyEach()
    gameover.visible = true
    bg.visible = false
    nob = 0
    rect21.visible=false
    rect212.visible=false
    rcbullet.destroyEach()
  }

  
  fill("red")
    textSize(20)
    text("Av blt :" + nob, width / 2 - 100, 50)
  
    fill("red")
    textSize(20)
    text("kill rate :" + score + "/20", width / 2 - 500, 50)
    fill("black")
    text(mouseX + "," + mouseY, mouseX, mouseY)

}

function enemy() {
  if (frameCount % 100 == 0) {

    en = createSprite(width + 100, Math.round(random(windowHeight / 2 + 200, height - 50)))
    en.debug = true
    en.setCollider("rectangle", 0, 0, 100, 200)
    var randomen = Math.round(random(1, 4))

    en.scale = 0.5
    switch (randomen) {
      case 1: en.addAnimation("e1", enimg1); en.scale = 0.250; en.setCollider("rectangle", 0, 0, 150, 400); break;
      case 2: en.addAnimation("e2", enimg2); break;
      case 3: en.addAnimation("e3", enimg3); break;
      case 4: en.addAnimation("e4", enimg4); break;
    }
    en.frameDelay = 10
    en.velocityX = -3
    enemyg.add(en)
  }


}
function enemyreward() {
  var count = [/*500,600,700,800,900,1000*/215, 415]
  //console.log(random(count))
  var rc = random(count)
  if (frameCount % 240 == 0) {

    en = createSprite(width + 100, Math.round(random(windowHeight / 2 + 200, height - 50)))
    en.debug = true
    en.setCollider("rectangle", 0, 0, 100, 200)
    var randomen = Math.round(random(1, 4))

    en.scale = 0.5
    switch (randomen) {
      case 1: en.addAnimation("e1", enimg1); en.scale = 0.250; en.setCollider("rectangle", 0, 0, 150, 400); break;
      case 2: en.addAnimation("e2", enimg2); break;
      case 3: en.addAnimation("e3", enimg3); break;
      case 4: en.addAnimation("e4", enimg4); break;
    }
    en.frameDelay = 10
    en.velocityX = -3
    rcbullet.add(en)
  }


}



function helth(){



push()
//rectMode(CENTER)
noStroke()
//strokeWeight(10)
//noFill()
rect(width/2+60,109,health,25)
pop()

}

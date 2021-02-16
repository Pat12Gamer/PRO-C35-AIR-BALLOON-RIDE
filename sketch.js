var balloon, ballonAni;
var bg;
var database;
var position;

function preload() {
  ballonAni = loadAnimation("pro-C35 images/Hot Air Ballon-02.png", "pro-C35 images/Hot Air Ballon-03.png", "pro-C35 images/Hot Air Ballon-04.png")
  bg = loadImage("pro-C35 images/Hot Air Ballon-01.png")
}

function setup() {
  database = firebase.database()
  createCanvas(1000, 1000);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("ballonAni", ballonAni)
  var ballonPosition = database.ref("balloon/position")
  ballonPosition.on("value", readPosition)
}

function draw() {
  background(bg);
  if (position !== undefined) {
    if (keyDown(LEFT_ARROW)) {
      writePosition(-1, 0)
    }
    else if (keyDown(RIGHT_ARROW)) {
      writePosition(1, 0)
    }
    else if (keyDown(UP_ARROW)) {
      writePosition(0, -1)
    }
    else if (keyDown(DOWN_ARROW)) {
      writePosition(0, 1)
    }

    drawSprites();
  }

}

function readPosition(data) {
  position = data.val()
  balloon.x = position.x;
  balloon.y = position.y;
  console.log(position.x)
}

function writePosition(x, y) {
  database.ref("balloon/position").set({
    'x': position.x + x,
    'y': position.y + y
  });
}
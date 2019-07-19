var count = 0;

let bigBox;
let smallBox;
let mySound;
function preload() {
  mySound = loadSound("Mousclik.wav");
}

function setup() {
  bigBox = new Box(1000, 30);
  smallBox = new Box(300, 200);
  createCanvas(windowWidth, 300);
  smallBox.setVelocity(0);
  bigBox.setVelocity(-0.3);

  smallBox.setMass(1);
  bigBox.setMass(100 * 100);

  smallBox.setSound(mySound);

  smallBox.setCollideCallback(() => {
    count++;
  });
  bigBox.setSound(mySound);

  background(100);
}

function draw() {
  for (var i = 0; i < 10; i++) {
    bigBox.setColor(240, 200, 0);
    bigBox.update();
    smallBox.setColor(0, 200, 240);
    smallBox.update();
    smallBox.collide(bigBox);
  }

  background(100);
  bigBox.draw();
  smallBox.draw();
  print(count);
}

class Box {
  constructor(x, w) {
    this.x = x;
    this.y = 3 * height - w;
    console.log(height);
    this.height = w;
    this.width = w;
    this.color = color(255, 255, 255);
    this.mass = 2;
    this.clk = () => {};
  }

  setSound(sound) {
    this.sound = sound;
  }

  setCollideCallback(clk) {
    this.clk = clk;
  }

  setVelocity(velocity) {
    this.velocity = velocity;
  }

  draw() {
    fill(this.color); // Use color variable 'c' as fill color
    noStroke(); // Don't draw a stroke around shapes
    rect(this.x, this.y, this.width, this.height);
  }

  reverse() {
    this.velocity *= -1;
  }

  hitWall() {
    return this.x < 0;
  }

  setColor(r, g, b) {
    this.color = color(r, g, b);
  }

  playSound() {
    this.clk();
    if (this.sound) {
      this.sound.play();
    }
  }

  update() {
    if (this.hitWall()) {
      this.reverse();
      this.playSound();
    }

    this.x += this.velocity;
  }

  setMass(mass) {
    this.mass = mass;
  }

  collide(other) {
    let hit = collideRectRect(
      this.x,
      this.y,
      this.width,
      this.height,
      other.x,
      other.y,
      other.width,
      other.height
    );
    if (hit) {
      let sumMass = this.mass + other.mass;
      let massSub = this.mass - other.mass;
      let l1 = (massSub / sumMass) * this.velocity;
      let r1 = ((2 * other.mass) / sumMass) * other.velocity;

      let l2 = ((2 * this.mass) / sumMass) * this.velocity;
      let r2 = (massSub / sumMass) * other.velocity;

      var newVelocity = l1 + r1;
      var newVelocity2 = l2 - r2;

      this.velocity = newVelocity;
      other.velocity = newVelocity2;
      this.playSound();
    }
  }
}

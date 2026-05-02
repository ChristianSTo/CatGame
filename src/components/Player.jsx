import walkSheet from "../assets/images/walkCycle.png";
import jumpSheet from "../assets/images/jumpCycle.png";
import sleep from "../assets/images/Sleep.png";

class Player {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.targetX = 0;
    this.speed = 0.1;
    this.y;
    this.spriteWidth = 128;
    this.spriteHeight = 66.5;
    this.width;
    this.height;
    this.speedY = 0;
    this.jumpSpeed = -9 * this.game.ratio;
    this.inAir = false;
    this.movingRight = false;
    this.movingLeft = false;
    this.walkImage = new Image();
    this.walkImage.src = walkSheet;
    this.jumpImage = new Image();
    this.jumpImage.src = jumpSheet;
    this.frameX = 0;
    this.frameTimer = 0;
    this.frameInterval = 10;
    this.jumpPending = false;
    this.jumpPendingTimer = 0;
    this.jumpPendingDelay = 300;
    this.idleImage = new Image();
    this.idleImage.src = sleep;
    this.facingLeft = false;
  }

  draw() {
    console.log(
      "inAir:",
      this.inAir,
      "currentAnimation:",
      this.currentAnimation
    );

    let image;
    let totalFrames;

    if (this.inAir) {
      image = this.jumpImage;
      totalFrames = 50;
    } else if (this.game.keys.ArrowLeft || this.game.keys.ArrowRight) {
      image = this.walkImage;
      totalFrames = 40;
    } else {
      image = this.idleImage;
      totalFrames = 1;
    }

    const newAnimation = this.inAir
      ? "jump"
      : this.game.keys.ArrowLeft || this.game.keys.ArrowRight
        ? "walk"
        : "idle";

    if (newAnimation !== this.currentAnimation) {
      this.frameX = 0;
      this.frameTimer = 0;
      this.currentAnimation = newAnimation;
    }

    if (this.frameTimer > this.frameInterval) {
      this.frameX = (this.frameX + 1) % totalFrames;
      this.frameTimer = 0;
    } else {
      this.frameTimer += 16;
    }

    if (this.facingLeft) {
      this.game.ctx.save();
      this.game.ctx.scale(-1, 1);
      this.game.ctx.drawImage(
        image,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        -this.x - this.width,
        this.y,
        this.width,
        this.height
      );
      this.game.ctx.restore();
    } else {
      this.game.ctx.drawImage(
        image,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  update() {
    // apply gravity
    if (!this.isTouchingGround()) {
      this.speedY += this.game.gravity;
    }

    // handle jump delay
    if (this.jumpPending) {
      this.jumpPendingTimer += 16;
      if (this.jumpPendingTimer >= this.jumpPendingDelay) {
        this.speedY = this.jumpSpeed;
        this.jumpPending = false;
      }
    }

    // apply vertical movement
    this.y += this.speedY;

    // landing
    const offset = this.game.height - this.height - 25 * this.game.ratio;
    if (this.isTouchingGround()) {
      this.y = offset;
      this.speedY = 0;
      if (!this.jumpPending) {
        // don't reset inAir while waiting for delay
        this.inAir = false;
      }
    }

    // horizontal movement
    this.x += (this.targetX - this.x + 150) * this.speed;
  }

  jump() {
    if (this.isTouchingGround()) {
      this.inAir = true; // animation starts immediately
      this.jumpPending = true;
      this.jumpPendingTimer = 0;
    }
  }
  moveRight() {
    this.facingLeft = false;
    if (!this.isTouchingRight()) {
      const isScrolling = this.x + this.width >= this.game.width * 0.7;
      if (!isScrolling) {
        if (this.inAir && this.jumpPending === false) {
          this.targetX += 25 * this.game.ratio;
          this.inAir = false;
        } else {
          this.targetX += 8 * this.game.ratio;
        }
      } else {
        this.targetX = this.x - 150; // reset targetX so momentum stops
      }
    }
  }
  moveLeft() {
    this.facingLeft = true;
    if (!this.isTouchingLeft()) {
      const isScrolling = this.x <= this.game.width * 0.3;
      if (!isScrolling) {
        if (this.inAir && this.jumpPending === false) {
          this.targetX -= 25 * this.game.ratio;
          this.inAir = false;
        } else {
          this.targetX -= 8 * this.game.ratio;
        }
      } else {
        return;
      }
    } else {
      this.targetX = this.x - 150; // reset targetX so momentum stops
    }
  }
  resize() {
    this.width = this.spriteWidth * this.game.ratio;
    this.height = this.spriteHeight * this.game.ratio;
    this.y = 0;
    this.speedY = -2 * this.game.ratio;
    this.speed = 0.1 * this.game.ratio;
  }
  isTouchingGround() {
    // return this.y >= this.game.height - this.height;
    return this.y >= this.game.height - this.height - 25 * this.game.ratio;
  }

  isTouchingLeft() {
    return this.x <= 0;
  }
  isTouchingRight() {
    return this.x + this.width >= this.game.width;
  }
}

export default Player;

import "../blocks/background.css";
import bgImage1 from "../assets/images/HomeDoor.png";
import bgImage2 from "../assets/images/KitchenBackground.png";
import bgImage3 from "../assets/images/TVRoomBackground.png";
import bgImage4 from "../assets/images/BEDRoomBackground.png";
import bgImage5 from "../assets/images/RestLaundryRoomBackground.png";
import bgImage6 from "../assets/images/GarageBackground.png";
import bgImage7 from "../assets/images/BackyardBackground.png";
import bgImage8 from "../assets/images/DrivewayBackground.png";

const imageSources = [
  bgImage1,
  bgImage2,
  bgImage3,
  bgImage4,
  bgImage5,
  bgImage6,
  bgImage7,
  bgImage8,
];

class BackgroundImage {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.x = 0;
    this.scrollSpeed = 8;
    this.drawWidth = 0;
    this.drawHeight = 0;
    this.x = 0;
    this.images = imageSources.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    // use first image to get natural dimensions
    this.images[0].onload = () => {
      this.drawHeight = this.game.height;
      this.drawWidth =
        this.images[0].naturalWidth *
        (this.game.height / this.images[0].naturalHeight);
    };
  }

  update() {
    const playerRightLocation = this.player.x + this.player.width;
    const playerLeftLocation = this.player.x;

    if (
      playerRightLocation >= this.game.width * 0.7 &&
      this.player.movingRight
    ) {
      this.x -= this.scrollSpeed;
    }
    if (playerLeftLocation <= this.game.width * 0.3 && this.player.movingLeft) {
      this.x += this.scrollSpeed;
    }

    const totalWidth = this.drawWidth * this.images.length;

    if (this.x <= -totalWidth) this.x += totalWidth; // wrap forward
    if (this.x > 0) this.x -= totalWidth; // wrap backward
  }

  draw() {
    const totalWidth = this.drawWidth * this.images.length;

    [-1, 0, 1].forEach((offset) => {
      this.images.forEach((img, i) => {
        this.game.ctx.drawImage(
          img,
          this.x + i * this.drawWidth + offset * totalWidth,
          0,
          this.drawWidth,
          this.drawHeight
        );
      });
    });
  }

  resize() {
    this.drawHeight = this.game.height;
    if (this.images[0].naturalWidth) {
      this.drawWidth =
        this.images[0].naturalWidth *
        (this.game.height / this.images[0].naturalHeight);
    }
    this.x = 0;
  }
}

export default BackgroundImage;

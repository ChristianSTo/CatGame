import React, { useEffect, useRef } from "react";
import "../blocks/game.css";
import Player from "../components/Player";
import BackgroundImage from "../components/Background";

export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.baseHeight = 720;
    this.ratio = this.height / this.baseHeight;
    this.gravity = 0.9 * this.ratio;

    this.player = new Player(this);
    this.background = new BackgroundImage(this, this.player);

    this.animate = this.animate.bind(this);
    this.resize = this.resize.bind(this);
    this.keys = {
      ArrowUp: false,
      ArrowRight: false,
      ArrowLeft: false,
    };

    // this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", (evt) => {
      this.resize(evt.currentTarget.innerWidth, evt.currentTarget.innerHeight);
    });

    //controls
    this.canvas.addEventListener("click", (evt) => {
      //   this.player.jump();
    });

    window.addEventListener("keydown", (evt) => {
      if (this.keys.hasOwnProperty(evt.key)) {
        this.keys[evt.key] = true;
      }
      //   if (evt.key === "ArrowUp") {
      //     this.player.jump();
      //   }

      //   if (evt.key === "ArrowRight") {
      //     this.player.movingRight = true;
      //     this.player.moveRight();
      //   }
      //   if (evt.key === "ArrowLeft") {
      //     this.player.movingLeft = true;
      //     this.player.moveLeft();
      //   }
    });
    window.addEventListener("keyup", (evt) => {
      if (this.keys.hasOwnProperty(evt.key)) {
        this.keys[evt.key] = false;
      }
      if (evt.key === "ArrowRight") {
        this.player.movingRight = false;
      }
      if (evt.key === "ArrowLeft") {
        this.player.movingLeft = false;
      }
    });
  }
  update() {
    if (this.keys.ArrowUp) {
      this.player.jump();
    }
    if (this.keys.ArrowRight) {
      this.player.movingRight = true;
      this.player.moveRight();
    } else {
      this.player.movingRight = false;
    }
    if (this.keys.ArrowLeft) {
      this.player.movingLeft = true;
      this.player.moveLeft();
    } else {
      this.player.movingLeft = false;
    }
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ratio = this.height / this.baseHeight;
    this.background.resize();
    this.player.resize();
  }
  animate() {
    this.update();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.render();
    requestAnimationFrame(this.animate);
  }
  render() {
    this.background.update();
    this.background.draw();
    this.player.update();
    this.player.draw();
  }
}

const GameCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const game = new Game(canvas, ctx);
      game.resize(window.innerWidth, window.innerHeight);
      game.animate();
    }
  }, []);

  return (
    <canvas ref={canvasRef} id="canvas1">
      <div className="canvas__border"></div>
    </canvas>
  );
};

export default GameCanvas;

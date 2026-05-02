import React, { useState, useEffect, useRef } from "react";
import GameCanvas from "./Game";
import "../blocks/main.css";
import cat from "../assets/images/cat1.png";

function Main() {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const style = {
    position: "absolute",
    top: `${position.top}px`,
    left: `${position.left}px`,
  };

  return (
    <section className="main__game">
      <GameCanvas />
    </section>
  );
}

export default Main;

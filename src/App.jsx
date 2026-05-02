import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Assets from "./components/Assets";

// import Canvas from "./components/Canvas";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Assets />
      <Footer />
    </>
  );
}

export default App;

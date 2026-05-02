import "../blocks/header.css";
import cat from "../assets/images/Appicon.png";

function Header() {
  const style = {
    position: "relative",
    top: `-40px`,
    left: `0px`,
  };
  return (
    <div className="header">
      <h1 className="header__title">
        <img className="header__image" src={cat} alt="Cat Icon" />
        Cat Platform Game...
        <span className="header__span">
          but the cat is too smol to reach anything...
        </span>
      </h1>
    </div>
  );
}

export default Header;

import "../blocks/header.css";
import cat from "../assets/images/cat1.png";

function Header() {
  const style = {
    position: "relative",
    top: `-40px`,
    left: `0px`,
  };
  return (
    <div className="header">
      <h1 className="header__title">
        Cat Platform Game...
        <span className="header__span">
          but the cat is too smol to reach anything...
        </span>
      </h1>
    </div>
  );
}

export default Header;

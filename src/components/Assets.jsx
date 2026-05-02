import "../blocks/assets.css";
import backgroundSource from "../assets/images/HomeDoor.png";

function Assets() {
  return (
    <div className="assets">
      <img id="background" src={backgroundSource} />
    </div>
  );
}

export default Assets;

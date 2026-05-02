import "../blocks/footer.css";
import cat from "../assets/images/cat1.png";

function footer() {
  const style = {
    position: "relative",
    top: `-40px`,
    left: `0px`,
  };
  return (
    <div className="footer">
      <div className="footer__controls">
        <p className="footer__controls-title">Controls:</p>
        <p>← Move left</p>
        <p>→ Move right</p>
        <p>↑ Jump</p>
      </div>
      <p className="footer__title">© Christian To 2026</p>
    </div>
  );
}

export default footer;

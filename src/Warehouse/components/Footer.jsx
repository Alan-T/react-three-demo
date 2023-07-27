import { useState } from "react";
import "./Footer.css";

function ViewBtn(props) {
  const [active, setActive] = useState("reset");

  const onBtnClick = (value) => {
    setActive(value);
    props.onCameraChanged(value);
  };
  
  return (
    <>
      <div className="footer-container">
        <div className="btn-group">
          <button
            className={active === "left" ? "active" : null}
            onClick={() => onBtnClick("left")}
          >
            左 视
          </button>
          <button
            className={active === "top" ? "active" : null}
            onClick={() => onBtnClick("top")}
          >
            俯 视
          </button>
          <button
            className={active === "reset" ? "active" : null}
            onClick={() => onBtnClick("reset")}
          >
            重 置
          </button>
          <button
            className={active === "front" ? "active" : null}
            onClick={() => onBtnClick("front")}
          >
            正 视
          </button>
          <button
            className={active === "right" ? "active" : null}
            onClick={() => onBtnClick("right")}
          >
            右 视
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewBtn;

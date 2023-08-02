import { Html, useProgress } from "@react-three/drei";
import "./Loader.css";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loading-alan">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="text">{progress} %</div>
      </div>
    </Html>
  );
}

export default Loader;

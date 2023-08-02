import { Html, useProgress } from "@react-three/drei";
import "./Loading.css";

function Loading() {
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

export default Loading;

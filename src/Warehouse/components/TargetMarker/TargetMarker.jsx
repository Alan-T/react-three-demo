import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function TargetMarker({ children, ...props }) {
  const ref = useRef();
  const [isOccluded, setOccluded] = useState();
  const isVisible = !isOccluded;
  const [rotationY, setRotationY] = useState(0);
  useFrame((state, delta) => {
    setRotationY((old) => (old += delta) % 360);
    console.log(delta);
  });
  return (
    // <group >
    <Html
      ref={ref}
      rotation={[0, rotationY * 2, 0]}
      transform
      occlude
      onOcclude={setOccluded}
      style={{
        transition: "all 0.2s",
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isVisible ? 1.5 : 0.25})`,
      }}
      {...props}
    >
      {children}
    </Html>
  );
}

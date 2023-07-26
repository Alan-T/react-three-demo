const GroundScene = () => {
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-4.001}>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="#9eacb8" />
    </mesh>
  );
};

export default GroundScene;

const GroundScene = () => {
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.001}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="rgb(115,110,115)" />
    </mesh>
  );
};

export default GroundScene;

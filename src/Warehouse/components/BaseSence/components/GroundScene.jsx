const GroundScene = () => {
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-4.001}>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="rgb(115,110,115)" />
    </mesh>
  );
};

export default GroundScene;

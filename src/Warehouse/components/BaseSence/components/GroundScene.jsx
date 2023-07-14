const GroundScene = () => {
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="rgb(115,110,115)" />
    </mesh>
  );
};

export default GroundScene;

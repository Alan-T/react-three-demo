const LightsScene = () => {
  return (
    <>
      <directionalLight color={0xffffff} intensity={3} position={[10, 10, 0]} />
      <ambientLight intensity={0.5} />
    </>
  );
};
export default LightsScene;

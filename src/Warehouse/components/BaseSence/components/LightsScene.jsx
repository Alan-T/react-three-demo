const LightsScene = () => {
  return (
    <>
      <directionalLight color={0xffffff} intensity={2} position={[20, 20, 0]} />
      <ambientLight intensity={0.35} />
    </>
  );
};
export default LightsScene;

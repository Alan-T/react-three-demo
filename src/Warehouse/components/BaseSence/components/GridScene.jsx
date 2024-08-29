import { Grid } from "@react-three/drei";

const GridScene = (props) => {
  return (
    <>
      <Grid
        renderOrder={-1}
        position={[0, -8, 0]}
        infiniteGrid={true}
        cellSize={0.6}
        cellThickness={0.6}
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor={[0.5, 10, 10]}
        fadeDistance={80}
      />
    </>
  );
};

export default GridScene

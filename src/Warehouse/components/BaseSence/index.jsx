import GridScene from "./components/GridScene";
import SkyScene from "./components/SkyScene";
import LightsScene from "./components/LightsScene";
import GroundScene from './components/GroundScene'

const BaseSence = (props) => {
  return (
    <>
      {/* <GridScene></GridScene> */}
      <SkyScene></SkyScene>
      <LightsScene></LightsScene>
      <GroundScene
      args={[120, 20]}
      position={[0, -8.001, -24.1]}
      color={ "#9eacb8"}
      ></GroundScene>
        <GroundScene
      args={[120, 20]}
      position={[0, -8.001, -4]}
      color={ "#9eacb8"}
      ></GroundScene>
        <GroundScene
      args={[120, 20]}
      position={[0, -8.001, 16.1]}
      color={ "#9eacb8"}
      ></GroundScene>
    </>
  );
};

export default BaseSence;

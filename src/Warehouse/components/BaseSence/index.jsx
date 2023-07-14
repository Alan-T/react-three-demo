import Camera from "./components/Camera";
import GridScene from "./components/GridScene";
import SkyScene from "./components/SkyScene";
import LightsScene from "./components/LightsScene";
import GroundScene from './components/GroundScene'

const BaseSence = (props) => {
  return (
    <>
      <Camera></Camera>
      <GridScene></GridScene>
      <SkyScene></SkyScene>
      <LightsScene></LightsScene>
      <GroundScene></GroundScene>
    </>
  );
};

export default BaseSence;

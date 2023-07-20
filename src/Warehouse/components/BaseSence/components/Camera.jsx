import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";

const Camera = (props) => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 8, 20]}
        // position={[26, 8, 0]}
        fov={65}
        near={1}
        far={100}
        maxDistance={10}
      />
      {/* <OrthographicCamera
        // makeDefault
        position={[8, 18, 20]}
        near={.1}
        far={1000}
        left={window.innerWidth/-12}
        right={window.innerWidth/12}
        top={window.innerHeight/12}
        bottom={window.innerHeight/-12}
      /> */}
    </>
  );
};
export default Camera;

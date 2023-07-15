import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";

const Camera = (props) => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[6, 8, 22]}
        fov={75}
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

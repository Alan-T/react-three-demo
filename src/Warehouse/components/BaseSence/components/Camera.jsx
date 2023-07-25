import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";

const Camera = (props) => {
  return (
    <>
      <PerspectiveCamera
        {...props}
        makeDefault
        // position={[0, 6, 18]} // 正视
        // position={[0, 18, 0]}  //俯视
        // position={[26, 7, 0]}  //右视
        // position={[-26, 7, 0]}  //左视
        fov={75}
        near={1}
        far={1000}
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

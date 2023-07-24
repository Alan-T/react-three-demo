import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Model(props) {
  const gltf = useLoader(GLTFLoader, props.url, null, (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  });
  return <primitive object={gltf.scene} position={props.position} />;
}

export default Model;

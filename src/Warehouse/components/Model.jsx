import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// 校验props 带默认值
import PropTypes from "prop-types";
Model.propTypes = {
  url: PropTypes.string.isRequired,
  position: PropTypes.array.isRequired,
  scale: PropTypes.array,
};
Model.defaultProps = {
  url: "",
  position: [0, 0, 0],
  scale: [1, 1, 1],
};

function Model(props) {
  const gltf = useLoader(GLTFLoader, props.url, null, (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  });
  return <primitive scale={props.scale} object={gltf.scene} position={props.position} />;
}

export default Model;

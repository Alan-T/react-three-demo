import PropTypes from "prop-types";
GroundScene.propTypes = {
  args: PropTypes.array,
  position: PropTypes.array,
  color: PropTypes.string,
};
GroundScene.defaultProps = {
  args:[120, 120],
  position: [0, -8.001, 0],
  color: "#9eacb8",
};

function GroundScene  (props){
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position={props.position} >
      <planeGeometry args={props.args} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
};

export default GroundScene;

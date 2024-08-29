import { Sky } from "@react-three/drei";
const SkyScene = () => {
  return (
    <>
      <Sky 
       turbidity={10} 
       rayleigh= {6}
       mieCoefficient= {0.005}
       mieDirectionalG= {0.8}
       sunPosition= {[0, 1, -100]}
      />
    </>
  );
};

export default SkyScene;

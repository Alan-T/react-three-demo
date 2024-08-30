import { Sky } from "@react-three/drei";
const SkyScene = () => {
  return (
    <>
      <Sky 
       turbidity={10} 
       rayleigh= {0}
       mieCoefficient= {0.007}
       mieDirectionalG= {0.12}
       inclination={0.49}
       azimuth={0.25}
       sunPosition= {[7, 0, 0]}
      />
    </>
  );
};

export default SkyScene;

import { useRef, useState, Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { suspend } from "suspend-react";
const inter = import("@pmndrs/assets/fonts/inter_regular.woff");
import "./PackingBox.css";

const PackingBox = (props) => {
  const { setShowMsgBox } = props;
  const meshRef = useRef();
  const textRef = useRef();
  const gltf = useLoader(GLTFLoader, "/托盘.glb");
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <Select enabled={hovered}>
      <group>
        <RoundedBox
          {...props}
          position={[
            parseFloat(props.position[0]),
            parseFloat(props.position[1]) + 0.135,
            parseFloat(props.position[2]),
          ]}
          ref={meshRef}
          scale={active ? 1.5 : 1}
          onClick={(event) => {
            event.stopPropagation();
            setShowMsgBox(props.contNo);
          }}
          onPointerEnter={(event) => {
            event.stopPropagation();
            setHover(true);
          }}
          onPointerLeave={(event) => {
            event.stopPropagation();
            setHover(false);
          }}
        >
          {/* <boxGeometry args={[1, 1, 1]} /> */}
          <meshStandardMaterial
            color={
              props.contNo && props.contNo === props.showMsgBox
                ? "#409EFF"
                : "orange"
            }
          ></meshStandardMaterial>
          {/* <meshStandardMaterial attach="material-0" color="orange" /> */}
          {/* 左边 */}
          {/* <meshStandardMaterial attach="material-1" color="orange" /> */}
          {/* 上边 */}
          {/* <meshStandardMaterial attach="material-2" color="orange" /> */}
          {/* 下边 */}
          {/* <meshStandardMaterial attach="material-3" color="orange" /> */}
          {/* 前边 */}
          {/* <meshStandardMaterial  attach="material-4" color={hovered ? "hotpink" : "orange"}> */}
          {/* <RenderTexture attach="map" anisotropy={16}>
            <color attach="background" args={["orange"]} />
            <Text
              font={suspend(inter).default}
              ref={textRef}
              fontSize={2}
              color="#555"
            >
              hello
            </Text>
          </RenderTexture> */}
          {/* </meshStandardMaterial> */}
          {/* 后边 */}
          {/* <meshStandardMaterial attach="material-5" color="orange" /> */}

          {props.contNo && props.contNo === props.showMsgBox && (
            <Html distanceFactor={12} position={[0, 2.3, 0]}>
              <div className="detail-info">
                <div
                  className="close"
                  onClick={() => {
                    setShowMsgBox(null);
                  }}
                >
                  x
                </div>
                <div className="header">托盘信息</div>
                <div className="content">
                  <ul>
                    <li>
                      <div className="label">托盘编号:</div>
                      {props.contNo}
                    </li>
                    <li>
                      {props.locateNo ? (
                        <>
                          <div className="label">货架位置:</div>
                          {props.locateNo}
                        </>
                      ) : null}
                    </li>
                    <li>
                      <div className="label">上架时间:</div>
                      {props.updateDate}
                    </li>
                  </ul>
                </div>
              </div>
            </Html>
          )}
        </RoundedBox>
        <Suspense fallback={null}>
          <primitive
            object={gltf.scene.clone()}
            position={[
              parseFloat(props.position[0]) - 5.289,
              parseFloat(props.position[1]) - 0.55,
              parseFloat(props.position[2]) + 2.333,
            ]}
          />
        </Suspense>
      </group>
    </Select>
  );
};

export default PackingBox;

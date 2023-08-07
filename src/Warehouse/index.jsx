import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Model from "./components/Model";
import Camera from "./components/BaseSence/components/Camera";
import Loading from "./components/Loading/Loading";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TargetMarker from "./components/TargetMarker/TargetMarker";
import { useRef, useState, Suspense, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import mqtt from "mqtt/dist/mqtt.min";

import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
import BaseSence from "./components/BaseSence";
import PalletBox from "./components/PalletBox/PalletBox";

import "./index.css";
const Warehouse = () => {
  const [mqttUrl, setMqttUrl] = useState("ws://101.132.39.71:8083/mqtt");
  const mqttRef = useRef(null);
  const orbRef = useRef(null);
  const [cameraPosition, setCameraPosition] = useState([4, 2, 18]);
  const [meshList, setMeshList] = useState([]);
  const [dvcObj, setDvcObj] = useState({
    dvcNo: "",
    posX: 36147,
    posY: 309,
    posZ: 10000,
    status: 0,
    noLoad: 0,
  });
  const [showMsgBox, setShowMsgBox] = useState(null);

  useEffect(() => {
    initMqtt();
    return () => {
      if (mqttRef.current) {
        mqttRef.current.end(true);
      }
    };
  }, []);
  const initMqtt = () => {
    const options = {
      keepalive: 60, // 默认60秒，设置0为禁用
      clean: true, // 设置为false以在脱机时接收QoS 1和2消息
      // connectTimeout: 4000,
      // clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      // username: "guest",
      // password: 'guest',
      // protocolId: 'MQTT',
      // protocolVersion: 4,
      // protocolId: 'MQIsdp', // 只支持MQTT 3.1(不符合3.1.1)的代理
      // protocolVersion: 3,   // 版本
      // reconnectPeriod: 1000, //设置多长时间进行重新连接 单位毫秒 两次重新连接之间的时间间隔。通过将设置为，禁用自动重新连接0
      // connectTimeout: 10 * 1000, // 收到CONNACK之前等待的时间
    };
    mqttRef.current = mqtt.connect(mqttUrl);
    mqttRef.current.on("connect", (connack) => {
      console.log("mqtt链接成功");
      mqttRef.current.subscribe("monitor/obj/init", (err) => {
        if (!err) {
          console.log("订阅monitor/obj/init成功");
        }
      });
      mqttRef.current.subscribe("monitor/obj/add", (err) => {
        if (!err) {
          console.log("订阅monitor/obj/add成功");
        }
      });
      mqttRef.current.subscribe("monitor/obj/del", (err) => {
        if (!err) {
          console.log("订阅monitor/obj/del成功");
        }
      });
      mqttRef.current.subscribe("monitor/dvc/state", (err) => {
        if (!err) {
          console.log("订阅monitor/dvc/state成功");
        }
      });
      mqttRef.current.publish(
        "monitor/client/init",
        "Data init!",
        { qos: 2, retain: false },
        function (error) {
          if (error) {
            console.log(error);
          } else {
            console.log("mqtt初始请求告警数据");
          }
        }
      );
      mqttRef.current.on("message", function (topic, message, packet) {
        console.log("packet", packet);
        if (topic.toString() === "monitor/obj/init") {
          const res = JSON.parse(message.toString());
          setMeshList(res.data);
        }
        if (topic.toString() === "monitor/obj/add") {
          const res = JSON.parse(message.toString());
          setMeshList((newList) => {
            return newList.concat(res.data);
          });
        }
        if (topic.toString() === "monitor/obj/del") {
          const res = JSON.parse(message.toString());
          setMeshList((meshList) =>
            meshList.filter(
              (item) => !res.data.some((box) => box.contNo === item.contNo)
            )
          );
        }
        if (topic.toString() === "monitor/dvc/state") {
          const res = JSON.parse(message.toString());
          setDvcObj(res.data);
        }
        console.log(topic.toString());
        console.log(message.toString());
      });
      mqttRef.current.on("offline", function () {
        console.log("mqtt断开链接");
      });
    });
  };
  // monitor/dvc/task  任务主题
  const onCameraChanged = (direction) => {
    switch (direction) {
      case "left":
        setCameraPosition([-26, 3, 0]);
        break;
      case "top":
        setCameraPosition([0, 18, 0]);
        break;
      case "reset":
        setCameraPosition([4, 2, 18]);
        break;
      case "front":
        setCameraPosition([0, 3, 18]);
        break;
      case "right":
        setCameraPosition([26, 3, 0]);
        break;
      default:
        setCameraPosition([4, 2, 18]);
        break;
    }
    if (orbRef.current) {
      orbRef.current.reset();
    }
  };

  const onSetShowMsgBox = (value) => {
    setShowMsgBox(value);
  };

  return (
    <div className="canvas-container">
      <div className="over-container">
        <Header></Header>
        <Footer onCameraChanged={onCameraChanged}></Footer>
      </div>

      <Canvas dpr={[1, 2]}>
        <Camera position={cameraPosition}></Camera>
        <BaseSence></BaseSence>
        <Suspense fallback={<Loading />}>
          <Model url={"/货架/货架.glb"} position={[-16, -4, 4]}></Model>
          {/* <TargetMarker position={[11.3, -2.8, 3.42]}>
            <FaMapMarkerAlt style={{ color: "indianred" }} />
          </TargetMarker> */}
          <group position-x={((dvcObj.posX - 36147) / 1330) * 1.05}>
            <Model
              url={"/堆垛机/堆垛机.glb"}
              position={[11.14, -4, 2.58]}
            ></Model>
            <group position-y={((dvcObj.posY - 309) / 2100) * 2.1}>
              <Model
                url={"/载货台/载货台.glb"}
                position={[11.83, -3.5, 2.7]}
              ></Model>
              <group position-z={((10000 - dvcObj.posZ) / 2439) * 1.2}>
                <Model
                  url={"/货叉/货叉.glb"}
                  position={[12.18, -3.4, 2.64]}
                ></Model>
                {dvcObj.noLoad === 1 ? (
                  <PalletBox
                    position={[12.48, -2.8, 2.22]}
                    key={"res.origin"}
                  />
                ) : null}
              </group>
            </group>
          </group>
        </Suspense>
        <Selection>
          <EffectComposer multisampling={8} autoClear={false}>
            <Outline
              blur
              visibleEdgeColor="green"
              edgeStrength={100}
              width={1000}
            />
          </EffectComposer>
          {meshList.map((res) => (
            <PalletBox
              {...res}
              key={res.contNo}
              setShowMsgBox={onSetShowMsgBox}
              showMsgBox={showMsgBox}
            />
          ))}
        </Selection>
        <group position={[0, 0, 0]}>
          <PalletBox position={[10.1, -3.45, 7]} key={"res.name1"} />
          <PalletBox position={[11.2, -3.45, 7]} key={"res.name2"} />
          <PalletBox position={[12.3, -3.45, 7]} key={"res.name3"} />
        </group>
        <OrbitControls ref={orbRef} />
        <Stats />
      </Canvas>
    </div>
  );
};

export default Warehouse;

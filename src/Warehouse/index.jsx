import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Model from "./components/Model";
import Camera from "./components/BaseSence/components/Camera";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useRef, useState, Suspense, useEffect } from "react";
import mqtt from "mqtt/dist/mqtt.min";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
import BaseSence from "./components/BaseSence";
import PackingBox from "./components/PackingBox";

import "./index.css";
const Warehouse = () => {
  const [mqttUrl, setMqttUrl] = useState("ws://101.132.39.71:8083/mqtt");
  const mqttRef = useRef(null);
  const orbRef = useRef(null);
  const [cameraPosition, setCameraPosition] = useState([4, 2, 18]);
  const [meshList, setMeshList] = useState([]);
  const [modelX, setModelX] = useState(36147);
  const [modelY, setModelY] = useState(309);

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
          setMeshList(meshList.filter((item) => !res.includes(item)));
        }
        console.log(topic.toString());
        console.log(message.toString());
      });
      mqttRef.current.on("offline", function () {
        console.log("mqtt断开链接");
      });
    });
  };

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

  return (
    <div className="canvas-container">
      <div className="over-container">
        <Header></Header>
        <Footer onCameraChanged={onCameraChanged}></Footer>
      </div>

      <Canvas dpr={[1, 2]}>
        <Camera position={cameraPosition}></Camera>
        <BaseSence></BaseSence>
        <Suspense fallback={<Loader />}>
          <Model url={"/货架/货架.glb"} position={[-16, -4, 4]}></Model>
          <group position-x={((modelX - 36147) / 1330) * 1.05}>
            <Model
              url={"/堆垛机/堆垛机.glb"}
              position={[11.14, -4, 2.58]}
            ></Model>
            <group position-y={((modelY - 309) / 2100) * 2.1}>
              <Model
                url={"/载货台/载货台.glb"}
                position={[11.83, -3.5, 2.7]}
              ></Model>
              <group position-z={0}>
                <Model
                  url={"/货叉/货叉.glb"}
                  position={[12.18, -3.4, 2.64]}
                ></Model>
              </group>
            </group>
          </group>
          {/* <PackingBox position={[10.25, -2.8, 2.22]} key={"res.name1"} /> */}
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
            <PackingBox {...res} key={res.contNo} />
          ))}
        </Selection>
        <group position={[0, 0, 0]}>
          <PackingBox position={[10.1, -3.45, 7]} key={"res.name1"} />
          <PackingBox position={[11.2, -3.45, 7]} key={"res.name2"} />
          <PackingBox position={[12.3, -3.45, 7]} key={"res.name3"} />
        </group>
        <OrbitControls ref={orbRef} />
        <Stats />
      </Canvas>
    </div>
  );
};

export default Warehouse;

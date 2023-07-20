import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useState, Suspense, useEffect } from "react";
import mqtt from "mqtt/dist/mqtt.min";

import "../App.css";

import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
import BaseSence from "./components/BaseSence";
import PackingBox from "./components/PackingBox";

const Warehouse = () => {
  const [mqttUrl,setMqttUrl]=useState("ws://101.132.39.71:8083/mqtt")
  const mqttRef = useRef(null);
  const [meshList, setMeshList] = useState([
    // {
    //   name: "货物0、0、0",
    //   position: [11.3, 1.2, 9.42],
    // },
    // {
    //   name: "货物0、0、1",
    //   position: [11.3, 1.2, 7.02],
    // },
    // {
    //   name: "货物0、0、2",
    //   position: [11.3, 1.2, 5.82],
    // },
    // {
    //   name: "货物0、1、0",
    //   position: [11.3, 3.3, 9.42],
    // },
    // {
    //   name: "货物0、1、1",
    //   position: [11.3, 3.3, 7.02],
    // },
    // {
    //   name: "货物0、1、2",
    //   position: [11.3, 3.3, 5.82],
    // },
    // {
    //   name: "货物0、2、0",
    //   position: [11.3, 5.4, 9.42],
    // },
    // {
    //   name: "货物0、2、1",
    //   position: [11.3, 5.4, 7.02],
    // },
    // {
    //   name: "货物0、2、2",
    //   position: [11.3, 5.4, 5.82],
    // },
    // {
    //   name: "货物0、3、0",
    //   position: [11.3, 7.5, 9.42],
    // },
    // {
    //   name: "货物0、3、1",
    //   position: [11.3, 7.5, 7.02],
    // },
    // {
    //   name: "货物0、3、2",
    //   position: [11.3, 7.5, 5.82],
    // },
    // {
    //   name: "货物1、0、0",
    //   position: [10.25, 1.2, 9.42],
    // },
    // {
    //   name: "货物1、0、1",
    //   position: [10.25, 1.2, 7.02],
    // },
    // {
    //   name: "货物1、0、2",
    //   position: [10.25, 1.2, 5.82],
    // },
    // {
    //   name: "货物1、1、0",
    //   position: [10.25, 3.3, 9.42],
    // },
    // {
    //   name: "货物1、1、1",
    //   position: [10.25, 3.3, 7.02],
    // },
    // {
    //   name: "货物1、1、2",
    //   position: [10.25, 3.3, 5.82],
    // },
    // {
    //   name: "货物1、2、0",
    //   position: [10.25, 5.4, 9.42],
    // },
    // {
    //   name: "货物1、2、1",
    //   position: [10.25, 5.4, 7.02],
    // },
    // {
    //   name: "货物1、2、2",
    //   position: [10.25, 5.4, 5.82],
    // },
    // {
    //   name: "货物1、3、0",
    //   position: [10.25, 7.5, 9.42],
    // },
    // {
    //   name: "货物1、3、1",
    //   position: [10.25, 7.5, 7.02],
    // },
    // {
    //   name: "货物1、3、2",
    //   position: [10.25, 7.5, 5.82],
    // },
    // {
    //   name: "货物2、0、0",
    //   position: [9.2, 1.2, 9.42],
    // },
    // {
    //   name: "货物2、0、1",
    //   position: [9.2, 1.2, 7.02],
    // },
    // {
    //   name: "货物2、0、2",
    //   position: [9.2, 1.2, 5.82],
    // },
    // {
    //   name: "货物2、1、0",
    //   position: [9.2, 3.3, 9.42],
    // },
    // {
    //   name: "货物2、1、1",
    //   position: [9.2, 3.3, 7.02],
    // },
    // {
    //   name: "货物2、1、2",
    //   position: [9.2, 3.3, 5.82],
    // },
    // {
    //   name: "货物2、2、0",
    //   position: [9.2, 5.4, 9.42],
    // },
    // {
    //   name: "货物2、2、1",
    //   position: [9.2, 5.4, 7.02],
    // },
    // {
    //   name: "货物2、2、2",
    //   position: [9.2, 5.4, 5.82],
    // },
    // {
    //   name: "货物2、3、0",
    //   position: [9.2, 7.5, 9.42],
    // },
    // {
    //   name: "货物2、3、1",
    //   position: [9.2, 7.5, 7.02],
    // },
    // {
    //   name: "货物2、3、2",
    //   position: [9.2, 7.5, 5.82],
    // },
    // {
    //   name: "货物3、0、0",
    //   position: [8.15, 1.2, 9.42],
    // },
    // {
    //   name: "货物3、0、1",
    //   position: [8.15, 1.2, 7.02],
    // },
    // {
    //   name: "货物3、0、2",
    //   position: [8.15, 1.2, 5.82],
    // },
    // {
    //   name: "货物3、1、0",
    //   position: [8.15, 3.3, 9.42],
    // },
    // {
    //   name: "货物3、1、1",
    //   position: [8.15, 3.3, 7.02],
    // },
    // {
    //   name: "货物3、1、2",
    //   position: [8.15, 3.3, 5.82],
    // },
    // {
    //   name: "货物3、2、0",
    //   position: [8.15, 5.4, 9.42],
    // },
    // {
    //   name: "货物3、2、1",
    //   position: [8.15, 5.4, 7.02],
    // },
    // {
    //   name: "货物3、2、2",
    //   position: [8.15, 5.4, 5.82],
    // },
    // {
    //   name: "货物3、3、0",
    //   position: [8.15, 7.5, 9.42],
    // },
    // {
    //   name: "货物3、3、1",
    //   position: [8.15, 7.5, 7.02],
    // },
    // {
    //   name: "货物3、3、2",
    //   position: [8.15, 7.5, 5.82],
    // },
    // {
    //   name: "货物4、0、0",
    //   position: [7.1, 1.2, 9.42],
    // },
    // {
    //   name: "货物4、0、1",
    //   position: [7.1, 1.2, 7.02],
    // },
    // {
    //   name: "货物4、0、2",
    //   position: [7.1, 1.2, 5.82],
    // },
    // {
    //   name: "货物4、1、0",
    //   position: [7.1, 3.3, 9.42],
    // },
    // {
    //   name: "货物4、1、1",
    //   position: [7.1, 3.3, 7.02],
    // },
    // {
    //   name: "货物4、1、2",
    //   position: [7.1, 3.3, 5.82],
    // },
    // {
    //   name: "货物4、2、0",
    //   position: [7.1, 5.4, 9.42],
    // },
    // {
    //   name: "货物4、2、1",
    //   position: [7.1, 5.4, 7.02],
    // },
    // {
    //   name: "货物4、2、2",
    //   position: [7.1, 5.4, 5.82],
    // },
    // {
    //   name: "货物4、3、0",
    //   position: [7.1, 7.5, 9.42],
    // },
    // {
    //   name: "货物4、3、1",
    //   position: [7.1, 7.5, 7.02],
    // },
    // {
    //   name: "货物4、3、2",
    //   position: [7.1, 7.5, 5.82],
    // },
    // {
    //   name: "货物5、0、0",
    //   position: [6.05, 1.2, 9.42],
    // },
    // {
    //   name: "货物5、0、1",
    //   position: [6.05, 1.2, 7.02],
    // },
    // {
    //   name: "货物5、0、2",
    //   position: [6.05, 1.2, 5.82],
    // },
    // {
    //   name: "货物5、1、0",
    //   position: [6.05, 3.3, 9.42],
    // },
    // {
    //   name: "货物5、1、1",
    //   position: [6.05, 3.3, 7.02],
    // },
    // {
    //   name: "货物5、1、2",
    //   position: [6.05, 3.3, 5.82],
    // },
    // {
    //   name: "货物5、2、0",
    //   position: [6.05, 5.4, 9.42],
    // },
    // {
    //   name: "货物5、2、1",
    //   position: [6.05, 5.4, 7.02],
    // },
    // {
    //   name: "货物5、2、2",
    //   position: [6.05, 5.4, 5.82],
    // },
    // {
    //   name: "货物5、3、0",
    //   position: [6.05, 7.5, 9.42],
    // },
    // {
    //   name: "货物5、3、1",
    //   position: [6.05, 7.5, 7.02],
    // },
    // {
    //   name: "货物5、3、2",
    //   position: [6.05, 7.5, 5.82],
    // },
    // {
    //   name: "货物6、0、0",
    //   position: [5, 1.2, 9.42],
    // },
    // {
    //   name: "货物6、0、1",
    //   position: [5, 1.2, 7.02],
    // },
    // {
    //   name: "货物6、0、2",
    //   position: [5, 1.2, 5.82],
    // },
    // {
    //   name: "货物6、1、0",
    //   position: [5, 3.3, 9.42],
    // },
    // {
    //   name: "货物6、1、1",
    //   position: [5, 3.3, 7.02],
    // },
    // {
    //   name: "货物6、1、2",
    //   position: [5, 3.3, 5.82],
    // },
    // {
    //   name: "货物6、2、0",
    //   position: [5, 5.4, 9.42],
    // },
    // {
    //   name: "货物6、2、1",
    //   position: [5, 5.4, 7.02],
    // },
    // {
    //   name: "货物6、2、2",
    //   position: [5, 5.4, 5.82],
    // },
    // {
    //   name: "货物6、3、0",
    //   position: [5, 7.5, 9.42],
    // },
    // {
    //   name: "货物6、3、1",
    //   position: [5, 7.5, 7.02],
    // },
    // {
    //   name: "货物6、3、2",
    //   position: [5, 7.5, 5.82],
    // },
    // {
    //   name: "货物7、0、0",
    //   position: [3.95, 1.2, 9.42],
    // },
    // {
    //   name: "货物7、0、1",
    //   position: [3.95, 1.2, 7.02],
    // },
    // {
    //   name: "货物7、0、2",
    //   position: [3.95, 1.2, 5.82],
    // },
    // {
    //   name: "货物7、1、0",
    //   position: [3.95, 3.3, 9.42],
    // },
    // {
    //   name: "货物7、1、1",
    //   position: [3.95, 3.3, 7.02],
    // },
    // {
    //   name: "货物7、1、2",
    //   position: [3.95, 3.3, 5.82],
    // },
    // {
    //   name: "货物7、2、0",
    //   position: [3.95, 5.4, 9.42],
    // },
    // {
    //   name: "货物7、2、1",
    //   position: [3.95, 5.4, 7.02],
    // },
    // {
    //   name: "货物7、2、2",
    //   position: [3.95, 5.4, 5.82],
    // },
    // {
    //   name: "货物7、3、0",
    //   position: [3.95, 7.5, 9.42],
    // },
    // {
    //   name: "货物7、3、1",
    //   position: [3.95, 7.5, 7.02],
    // },
    // {
    //   name: "货物7、3、2",
    //   position: [3.95, 7.5, 5.82],
    // },
    // {
    //   name: "货物8、0、0",
    //   position: [2.9, 1.2, 9.42],
    // },
    // {
    //   name: "货物8、0、1",
    //   position: [2.9, 1.2, 7.02],
    // },
    // {
    //   name: "货物8、0、2",
    //   position: [2.9, 1.2, 5.82],
    // },
    // {
    //   name: "货物8、1、0",
    //   position: [2.9, 3.3, 9.42],
    // },
    // {
    //   name: "货物8、1、1",
    //   position: [2.9, 3.3, 7.02],
    // },
    // {
    //   name: "货物8、1、2",
    //   position: [2.9, 3.3, 5.82],
    // },
    // {
    //   name: "货物8、2、0",
    //   position: [2.9, 5.4, 9.42],
    // },
    // {
    //   name: "货物8、2、1",
    //   position: [2.9, 5.4, 7.02],
    // },
    // {
    //   name: "货物8、2、2",
    //   position: [2.9, 5.4, 5.82],
    // },
    // {
    //   name: "货物8、3、0",
    //   position: [2.9, 7.5, 9.42],
    // },
    // {
    //   name: "货物8、3、1",
    //   position: [2.9, 7.5, 7.02],
    // },
    // {
    //   name: "货物8、3、2",
    //   position: [2.9, 7.5, 5.82],
    // },
    // {
    //   name: "货物9、0、0",
    //   position: [1.85, 1.2, 9.42],
    // },
    // {
    //   name: "货物9、0、1",
    //   position: [1.85, 1.2, 7.02],
    // },
    // {
    //   name: "货物9、0、2",
    //   position: [1.85, 1.2, 5.82],
    // },
    // {
    //   name: "货物9、1、0",
    //   position: [1.85, 3.3, 9.42],
    // },
    // {
    //   name: "货物9、1、1",
    //   position: [1.85, 3.3, 7.02],
    // },
    // {
    //   name: "货物9、1、2",
    //   position: [1.85, 3.3, 5.82],
    // },
    // {
    //   name: "货物9、2、0",
    //   position: [1.85, 5.4, 9.42],
    // },
    // {
    //   name: "货物9、2、1",
    //   position: [1.85, 5.4, 7.02],
    // },
    // {
    //   name: "货物9、2、2",
    //   position: [1.85, 5.4, 5.82],
    // },
    // {
    //   name: "货物9、3、0",
    //   position: [1.85, 7.5, 9.42],
    // },
    // {
    //   name: "货物9、3、1",
    //   position: [1.85, 7.5, 7.02],
    // },
    // {
    //   name: "货物9、3、2",
    //   position: [1.85, 7.5, 5.82],
    // },
    // {
    //   name: "货物10、0、0",
    //   position: [0.8, 1.2, 9.42],
    // },
    // {
    //   name: "货物10、0、1",
    //   position: [0.8, 1.2, 7.02],
    // },
    // {
    //   name: "货物10、0、2",
    //   position: [0.8, 1.2, 5.82],
    // },
    // {
    //   name: "货物10、1、0",
    //   position: [0.8, 3.3, 9.42],
    // },
    // {
    //   name: "货物10、1、1",
    //   position: [0.8, 3.3, 7.02],
    // },
    // {
    //   name: "货物10、1、2",
    //   position: [0.8, 3.3, 5.82],
    // },
    // {
    //   name: "货物10、2、0",
    //   position: [0.8, 5.4, 9.42],
    // },
    // {
    //   name: "货物10、2、1",
    //   position: [0.8, 5.4, 7.02],
    // },
    // {
    //   name: "货物10、2、2",
    //   position: [0.8, 5.4, 5.82],
    // },
    // {
    //   name: "货物10、3、0",
    //   position: [0.8, 7.5, 9.42],
    // },
    // {
    //   name: "货物10、3、1",
    //   position: [0.8, 7.5, 7.02],
    // },
    // {
    //   name: "货物10、3、2",
    //   position: [0.8, 7.5, 5.82],
    // },
    // {
    //   name: "货物11、0、0",
    //   position: [-0.25, 1.2, 9.42],
    // },
    // {
    //   name: "货物11、0、1",
    //   position: [-0.25, 1.2, 7.02],
    // },
    // {
    //   name: "货物11、0、2",
    //   position: [-0.25, 1.2, 5.82],
    // },
    // {
    //   name: "货物11、1、0",
    //   position: [-0.25, 3.3, 9.42],
    // },
    // {
    //   name: "货物11、1、1",
    //   position: [-0.25, 3.3, 7.02],
    // },
    // {
    //   name: "货物11、1、2",
    //   position: [-0.25, 3.3, 5.82],
    // },
    // {
    //   name: "货物11、2、0",
    //   position: [-0.25, 5.4, 9.42],
    // },
    // {
    //   name: "货物11、2、1",
    //   position: [-0.25, 5.4, 7.02],
    // },
    // {
    //   name: "货物11、2、2",
    //   position: [-0.25, 5.4, 5.82],
    // },
    // {
    //   name: "货物11、3、0",
    //   position: [-0.25, 7.5, 9.42],
    // },
    // {
    //   name: "货物11、3、1",
    //   position: [-0.25, 7.5, 7.02],
    // },
    // {
    //   name: "货物11、3、2",
    //   position: [-0.25, 7.5, 5.82],
    // },
    // {
    //   name: "货物12、0、0",
    //   position: [-1.3, 1.2, 9.42],
    // },
    // {
    //   name: "货物12、0、1",
    //   position: [-1.3, 1.2, 7.02],
    // },
    // {
    //   name: "货物12、0、2",
    //   position: [-1.3, 1.2, 5.82],
    // },
    // {
    //   name: "货物12、1、0",
    //   position: [-1.3, 3.3, 9.42],
    // },
    // {
    //   name: "货物12、1、1",
    //   position: [-1.3, 3.3, 7.02],
    // },
    // {
    //   name: "货物12、1、2",
    //   position: [-1.3, 3.3, 5.82],
    // },
    // {
    //   name: "货物12、2、0",
    //   position: [-1.3, 5.4, 9.42],
    // },
    // {
    //   name: "货物12、2、1",
    //   position: [-1.3, 5.4, 7.02],
    // },
    // {
    //   name: "货物12、2、2",
    //   position: [-1.3, 5.4, 5.82],
    // },
    // {
    //   name: "货物12、3、0",
    //   position: [-1.3, 7.5, 9.42],
    // },
    // {
    //   name: "货物12、3、1",
    //   position: [-1.3, 7.5, 7.02],
    // },
    // {
    //   name: "货物12、3、2",
    //   position: [-1.3, 7.5, 5.82],
    // },
    // {
    //   name: "货物13、0、0",
    //   position: [-2.35, 1.2, 9.42],
    // },
    // {
    //   name: "货物13、0、1",
    //   position: [-2.35, 1.2, 7.02],
    // },
    // {
    //   name: "货物13、0、2",
    //   position: [-2.35, 1.2, 5.82],
    // },
    // {
    //   name: "货物13、1、0",
    //   position: [-2.35, 3.3, 9.42],
    // },
    // {
    //   name: "货物13、1、1",
    //   position: [-2.35, 3.3, 7.02],
    // },
    // {
    //   name: "货物13、1、2",
    //   position: [-2.35, 3.3, 5.82],
    // },
    // {
    //   name: "货物13、2、0",
    //   position: [-2.35, 5.4, 9.42],
    // },
    // {
    //   name: "货物13、2、1",
    //   position: [-2.35, 5.4, 7.02],
    // },
    // {
    //   name: "货物13、2、2",
    //   position: [-2.35, 5.4, 5.82],
    // },
    // {
    //   name: "货物13、3、0",
    //   position: [-2.35, 7.5, 9.42],
    // },
    // {
    //   name: "货物13、3、1",
    //   position: [-2.35, 7.5, 7.02],
    // },
    // {
    //   name: "货物13、3、2",
    //   position: [-2.35, 7.5, 5.82],
    // },
    // {
    //   name: "货物14、0、0",
    //   position: [-3.4, 1.2, 9.42],
    // },
    // {
    //   name: "货物14、0、1",
    //   position: [-3.4, 1.2, 7.02],
    // },
    // {
    //   name: "货物14、0、2",
    //   position: [-3.4, 1.2, 5.82],
    // },
    // {
    //   name: "货物14、1、0",
    //   position: [-3.4, 3.3, 9.42],
    // },
    // {
    //   name: "货物14、1、1",
    //   position: [-3.4, 3.3, 7.02],
    // },
    // {
    //   name: "货物14、1、2",
    //   position: [-3.4, 3.3, 5.82],
    // },
    // {
    //   name: "货物14、2、0",
    //   position: [-3.4, 5.4, 9.42],
    // },
    // {
    //   name: "货物14、2、1",
    //   position: [-3.4, 5.4, 7.02],
    // },
    // {
    //   name: "货物14、2、2",
    //   position: [-3.4, 5.4, 5.82],
    // },
    // {
    //   name: "货物14、3、0",
    //   position: [-3.4, 7.5, 9.42],
    // },
    // {
    //   name: "货物14、3、1",
    //   position: [-3.4, 7.5, 7.02],
    // },
    // {
    //   name: "货物14、3、2",
    //   position: [-3.4, 7.5, 5.82],
    // },
    // {
    //   name: "货物15、0、0",
    //   position: [-4.45, 1.2, 9.42],
    // },
    // {
    //   name: "货物15、0、1",
    //   position: [-4.45, 1.2, 7.02],
    // },
    // {
    //   name: "货物15、0、2",
    //   position: [-4.45, 1.2, 5.82],
    // },
    // {
    //   name: "货物15、1、0",
    //   position: [-4.45, 3.3, 9.42],
    // },
    // {
    //   name: "货物15、1、1",
    //   position: [-4.45, 3.3, 7.02],
    // },
    // {
    //   name: "货物15、1、2",
    //   position: [-4.45, 3.3, 5.82],
    // },
    // {
    //   name: "货物15、2、0",
    //   position: [-4.45, 5.4, 9.42],
    // },
    // {
    //   name: "货物15、2、1",
    //   position: [-4.45, 5.4, 7.02],
    // },
    // {
    //   name: "货物15、2、2",
    //   position: [-4.45, 5.4, 5.82],
    // },
    // {
    //   name: "货物15、3、0",
    //   position: [-4.45, 7.5, 9.42],
    // },
    // {
    //   name: "货物15、3、1",
    //   position: [-4.45, 7.5, 7.02],
    // },
    // {
    //   name: "货物15、3、2",
    //   position: [-4.45, 7.5, 5.82],
    // },
    // {
    //   name: "货物16、0、0",
    //   position: [-5.5, 1.2, 9.42],
    // },
    // {
    //   name: "货物16、0、1",
    //   position: [-5.5, 1.2, 7.02],
    // },
    // {
    //   name: "货物16、0、2",
    //   position: [-5.5, 1.2, 5.82],
    // },
    // {
    //   name: "货物16、1、0",
    //   position: [-5.5, 3.3, 9.42],
    // },
    // {
    //   name: "货物16、1、1",
    //   position: [-5.5, 3.3, 7.02],
    // },
    // {
    //   name: "货物16、1、2",
    //   position: [-5.5, 3.3, 5.82],
    // },
    // {
    //   name: "货物16、2、0",
    //   position: [-5.5, 5.4, 9.42],
    // },
    // {
    //   name: "货物16、2、1",
    //   position: [-5.5, 5.4, 7.02],
    // },
    // {
    //   name: "货物16、2、2",
    //   position: [-5.5, 5.4, 5.82],
    // },
    // {
    //   name: "货物16、3、0",
    //   position: [-5.5, 7.5, 9.42],
    // },
    // {
    //   name: "货物16、3、1",
    //   position: [-5.5, 7.5, 7.02],
    // },
    // {
    //   name: "货物16、3、2",
    //   position: [-5.5, 7.5, 5.82],
    // },
    // {
    //   name: "货物17、0、0",
    //   position: [-6.55, 1.2, 9.42],
    // },
    // {
    //   name: "货物17、0、1",
    //   position: [-6.55, 1.2, 7.02],
    // },
    // {
    //   name: "货物17、0、2",
    //   position: [-6.55, 1.2, 5.82],
    // },
    // {
    //   name: "货物17、1、0",
    //   position: [-6.55, 3.3, 9.42],
    // },
    // {
    //   name: "货物17、1、1",
    //   position: [-6.55, 3.3, 7.02],
    // },
    // {
    //   name: "货物17、1、2",
    //   position: [-6.55, 3.3, 5.82],
    // },
    // {
    //   name: "货物17、2、0",
    //   position: [-6.55, 5.4, 9.42],
    // },
    // {
    //   name: "货物17、2、1",
    //   position: [-6.55, 5.4, 7.02],
    // },
    // {
    //   name: "货物17、2、2",
    //   position: [-6.55, 5.4, 5.82],
    // },
    // {
    //   name: "货物17、3、0",
    //   position: [-6.55, 7.5, 9.42],
    // },
    // {
    //   name: "货物17、3、1",
    //   position: [-6.55, 7.5, 7.02],
    // },
    // {
    //   name: "货物17、3、2",
    //   position: [-6.55, 7.5, 5.82],
    // },
    // {
    //   name: "货物18、0、0",
    //   position: [-7.6, 1.2, 9.42],
    // },
    // {
    //   name: "货物18、0、1",
    //   position: [-7.6, 1.2, 7.02],
    // },
    // {
    //   name: "货物18、0、2",
    //   position: [-7.6, 1.2, 5.82],
    // },
    // {
    //   name: "货物18、1、0",
    //   position: [-7.6, 3.3, 9.42],
    // },
    // {
    //   name: "货物18、1、1",
    //   position: [-7.6, 3.3, 7.02],
    // },
    // {
    //   name: "货物18、1、2",
    //   position: [-7.6, 3.3, 5.82],
    // },
    // {
    //   name: "货物18、2、0",
    //   position: [-7.6, 5.4, 9.42],
    // },
    // {
    //   name: "货物18、2、1",
    //   position: [-7.6, 5.4, 7.02],
    // },
    // {
    //   name: "货物18、2、2",
    //   position: [-7.6, 5.4, 5.82],
    // },
    // {
    //   name: "货物18、3、0",
    //   position: [-7.6, 7.5, 9.42],
    // },
    // {
    //   name: "货物18、3、1",
    //   position: [-7.6, 7.5, 7.02],
    // },
    // {
    //   name: "货物18、3、2",
    //   position: [-7.6, 7.5, 5.82],
    // },
    // {
    //   name: "货物19、0、0",
    //   position: [-8.65, 1.2, 9.42],
    // },
    // {
    //   name: "货物19、0、1",
    //   position: [-8.65, 1.2, 7.02],
    // },
    // {
    //   name: "货物19、0、2",
    //   position: [-8.65, 1.2, 5.82],
    // },
    // {
    //   name: "货物19、1、0",
    //   position: [-8.65, 3.3, 9.42],
    // },
    // {
    //   name: "货物19、1、1",
    //   position: [-8.65, 3.3, 7.02],
    // },
    // {
    //   name: "货物19、1、2",
    //   position: [-8.65, 3.3, 5.82],
    // },
    // {
    //   name: "货物19、2、0",
    //   position: [-8.65, 5.4, 9.42],
    // },
    // {
    //   name: "货物19、2、1",
    //   position: [-8.65, 5.4, 7.02],
    // },
    // {
    //   name: "货物19、2、2",
    //   position: [-8.65, 5.4, 5.82],
    // },
    // {
    //   name: "货物19、3、0",
    //   position: [-8.65, 7.5, 9.42],
    // },
    // {
    //   name: "货物19、3、1",
    //   position: [-8.65, 7.5, 7.02],
    // },
    // {
    //   name: "货物19、3、2",
    //   position: [-8.65, 7.5, 5.82],
    // },
    // {
    //   name: "货物20、0、0",
    //   position: [-9.7, 1.2, 9.42],
    // },
    // {
    //   name: "货物20、0、1",
    //   position: [-9.7, 1.2, 7.02],
    // },
    // {
    //   name: "货物20、0、2",
    //   position: [-9.7, 1.2, 5.82],
    // },
    // {
    //   name: "货物20、1、0",
    //   position: [-9.7, 3.3, 9.42],
    // },
    // {
    //   name: "货物20、1、1",
    //   position: [-9.7, 3.3, 7.02],
    // },
    // {
    //   name: "货物20、1、2",
    //   position: [-9.7, 3.3, 5.82],
    // },
    // {
    //   name: "货物20、2、0",
    //   position: [-9.7, 5.4, 9.42],
    // },
    // {
    //   name: "货物20、2、1",
    //   position: [-9.7, 5.4, 7.02],
    // },
    // {
    //   name: "货物20、2、2",
    //   position: [-9.7, 5.4, 5.82],
    // },
    // {
    //   name: "货物20、3、0",
    //   position: [-9.7, 7.5, 9.42],
    // },
    // {
    //   name: "货物20、3、1",
    //   position: [-9.7, 7.5, 7.02],
    // },
    // {
    //   name: "货物20、3、2",
    //   position: [-9.7, 7.5, 5.82],
    // },
    // {
    //   name: "货物21、0、0",
    //   position: [-10.75, 1.2, 9.42],
    // },
    // {
    //   name: "货物21、0、1",
    //   position: [-10.75, 1.2, 7.02],
    // },
    // {
    //   name: "货物21、0、2",
    //   position: [-10.75, 1.2, 5.82],
    // },
    // {
    //   name: "货物21、1、0",
    //   position: [-10.75, 3.3, 9.42],
    // },
    // {
    //   name: "货物21、1、1",
    //   position: [-10.75, 3.3, 7.02],
    // },
    // {
    //   name: "货物21、1、2",
    //   position: [-10.75, 3.3, 5.82],
    // },
    // {
    //   name: "货物21、2、0",
    //   position: [-10.75, 5.4, 9.42],
    // },
    // {
    //   name: "货物21、2、1",
    //   position: [-10.75, 5.4, 7.02],
    // },
    // {
    //   name: "货物21、2、2",
    //   position: [-10.75, 5.4, 5.82],
    // },
    // {
    //   name: "货物21、3、0",
    //   position: [-10.75, 7.5, 9.42],
    // },
    // {
    //   name: "货物21、3、1",
    //   position: [-10.75, 7.5, 7.02],
    // },
    // {
    //   name: "货物21、3、2",
    //   position: [-10.75, 7.5, 5.82],
    // },
    // {
    //   name: "货物22、0、0",
    //   position: [-11.8, 1.2, 9.42],
    // },
    // {
    //   name: "货物22、0、1",
    //   position: [-11.8, 1.2, 7.02],
    // },
    // {
    //   name: "货物22、0、2",
    //   position: [-11.8, 1.2, 5.82],
    // },
    // {
    //   name: "货物22、1、0",
    //   position: [-11.8, 3.3, 9.42],
    // },
    // {
    //   name: "货物22、1、1",
    //   position: [-11.8, 3.3, 7.02],
    // },
    // {
    //   name: "货物22、1、2",
    //   position: [-11.8, 3.3, 5.82],
    // },
    // {
    //   name: "货物22、2、0",
    //   position: [-11.8, 5.4, 9.42],
    // },
    // {
    //   name: "货物22、2、1",
    //   position: [-11.8, 5.4, 7.02],
    // },
    // {
    //   name: "货物22、2、2",
    //   position: [-11.8, 5.4, 5.82],
    // },
    // {
    //   name: "货物22、3、0",
    //   position: [-11.8, 7.5, 9.42],
    // },
    // {
    //   name: "货物22、3、1",
    //   position: [-11.8, 7.5, 7.02],
    // },
    // {
    //   name: "货物22、3、2",
    //   position: [-11.8, 7.5, 5.82],
    // },
    // {
    //   name: "货物23、0、0",
    //   position: [-12.85, 1.2, 9.42],
    // },
    // {
    //   name: "货物23、0、1",
    //   position: [-12.85, 1.2, 7.02],
    // },
    // {
    //   name: "货物23、0、2",
    //   position: [-12.85, 1.2, 5.82],
    // },
    // {
    //   name: "货物23、1、0",
    //   position: [-12.85, 3.3, 9.42],
    // },
    // {
    //   name: "货物23、1、1",
    //   position: [-12.85, 3.3, 7.02],
    // },
    // {
    //   name: "货物23、1、2",
    //   position: [-12.85, 3.3, 5.82],
    // },
    // {
    //   name: "货物23、2、0",
    //   position: [-12.85, 5.4, 9.42],
    // },
    // {
    //   name: "货物23、2、1",
    //   position: [-12.85, 5.4, 7.02],
    // },
    // {
    //   name: "货物23、2、2",
    //   position: [-12.85, 5.4, 5.82],
    // },
    // {
    //   name: "货物23、3、0",
    //   position: [-12.85, 7.5, 9.42],
    // },
    // {
    //   name: "货物23、3、1",
    //   position: [-12.85, 7.5, 7.02],
    // },
    // {
    //   name: "货物23、3、2",
    //   position: [-12.85, 7.5, 5.82],
    // },
  ]);
  useEffect(() => {
    initMqtt();
    return () => {
      mqttRef.value.end();
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
    mqttRef.value = mqtt.connect(mqttUrl);
    mqttRef.value.on("connect", (connack) => {
      console.log("mqtt链接成功");
      mqttRef.value.subscribe("monitor/obj/init", (err) => {
        if (!err) {
          console.log("订阅monitor/obj/init成功");
        }
      });
      mqttRef.value.subscribe("monitor/obj/add", (err) => {
        if (!err) {
          console.log("订阅monitor/obj/add成功");
        }
      });
      mqttRef.value.subscribe("monitor/obj/del", (err) => {
        if (!err) {
          console.log("订阅monitor/obj/del成功");
        }
      });
      mqttRef.value.publish(
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
      mqttRef.value.on("message", function (topic, message, packet) {
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
      mqttRef.value.on("offline", function () {
        console.log("mqtt断开链接");
      });
    });
  };

  return (
    <div className="canvas-container">
      <Canvas dpr={[1, 2]}>
        <BaseSence></BaseSence>
        <Suspense fallback={null}>
          <Scene url={"/货架/货架.glb"} position={[-16, 0, 10]}></Scene>
          <Translation>
            <Scene url={"/堆垛机/堆垛机.glb"} position={[12, 0, 8.6]}></Scene>
            <group position-y={0}>
              <group position-z={0}>
                <Scene
                  url={"/货叉/货叉.glb"}
                  position={[13.2, 2.1, 8.8]}
                ></Scene>
              </group>
              <Scene
                url={"/载货台/载货台.glb"}
                position={[12.8, 2, 8.8]}
              ></Scene>
            </group>
          </Translation>
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
            <PackingBox position={res.position} key={res.lpnCode} />
          ))}
        </Selection>
        <group position={[0, 0, 0]}>
          <PackingBox position={[10.1, 0.55, 13]} key={"res.name1"} />
          <PackingBox position={[11.2, 0.55, 13]} key={"res.name2"} />
          <PackingBox position={[12.3, 0.55, 13]} key={"res.name3"} />
        </group>
        <OrbitControls />
        <Stats />
      </Canvas>
    </div>
  );
};

function Scene(props) {
  const gltf = useLoader(GLTFLoader, props.url);
  return <primitive object={gltf.scene} position={props.position} />;
}

function Translation(props) {
  const ref = useRef();
  // useFrame(
  //   (state) =>
  //     (ref.current.position.x = Math.sin(state.clock.elapsedTime) * 13 - 13)
  // );
  return <group ref={ref} {...props} />;
}
export default Warehouse;

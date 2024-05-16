import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import ModelView from "./ModelView";
import { useRef, useState } from "react";
import { yellowImg } from "../utils";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    colors: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  //My variables to set up camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  //My variables to select model size
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //State variables to set rotation value of models
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useGSAP(() => {
    gsap.to("heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-width-max">
        <h1 id="heading" className="section-heading">
          Take a closer look
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              gsapType="view1"
              groupRef={small}
              controlRef={cameraControlSmall}
              setRotationState={smallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={1}
              gsapType="view2"
              groupRef={large}
              controlRef={cameraControlLarge}
              setRotationState={largeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full "
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: onabort,
                left: 0,
              }}
              eventSource={document.getElementById("root")}
            >
              {/**View port allows us to render different views of a model on the same canvas */}
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, index) => (
                  <li
                    className="rounded-full w-6 h-6 mx-2 cursor-pointer"
                    key={index}
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              {/**Buttons to manage model sizes onClick */}
              {/**The size state property will determine which size is selected, if selected size==value then make backround white and text color black */}
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    className="size-btn"
                    key={{ label }}
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;

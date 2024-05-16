import { View } from "@react-three/drei";
import * as THREE from "three";

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`border-2 border-red-500 w-full h-full ${
        index === 2 ? "right-[-100%]" : ""
      }`}
    >
      {/**Ambient lighting */}
      <ambientLight intensity={0.3} />
      <perspectiveCamera makeDefault position={[0, 0, 4]} />
    </View>
  );
};

export default ModelView;

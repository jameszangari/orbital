import { useRef } from "react";
import { useTexture } from "@react-three/drei";
// import {
//   Bloom,
//   EffectComposer,
//   EffectPass,
//   RenderPass,
// } from "@react-three/postprocessing";
// import { BlurPass, Resizer, KernelSize } from "postprocessing";

export default function Planet() {
  const targetRef = useRef();
  const texture = useTexture("/img/sun.jpg");
  return (
    <>
      {/* <EffectComposer> */}
      <mesh ref={targetRef} position={[0, 0, 0]} scale={15}>
        <sphereGeometry attach="geometry" args={[1, 50, 30]} />
        <meshStandardMaterial
          color={"orange"}
          map={useTexture("/img/sun.jpg")}
        />
      </mesh>
      {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
      {/* </EffectComposer> */}
    </>
  );
}

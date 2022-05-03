import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export default function Planet() {
  const ref = useRef();
  const texture = useTexture("/img/sun.jpg");
  return (
    <>
      <mesh ref={ref} position={[0, 0, 0]} scale={15}>
        <sphereGeometry attach="geometry" args={[1, 50, 30]} />
        <meshStandardMaterial color={"orange"} map={texture} />
      </mesh>
    </>
  );
}

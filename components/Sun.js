import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export default function Planet() {
  const texture = useTexture("/sun.jpg");
  // TODO add animation to texture
  // create a reference
  const ref = useRef();
  // useFrame(({ clock }) => {
  //   // ref.current.rotation.x = clock.getElapsedTime() / 2;
  //   ref.current.rotation.y = clock.getElapsedTime() / 4;
  // });
  return (
    <>
      <mesh ref={ref} position={[0, 0, 0]} scale={10}>
        <sphereGeometry args={[1, 50, 30]} />
        <meshStandardMaterial color={"orange"} map={texture} />
      </mesh>
    </>
  );
}

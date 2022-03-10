import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
// import { PlainAnimator } from "three-plain-animator/lib/plain-animator";

export default function Planet() {
  const ref = useRef();
  const texture = useTexture("/sun.jpg");
  // const spriteTexture = useTexture("/sun.jpg");
  // const animator = new PlainAnimator(spriteTexture, 2, 2, 240, 30);
  // const texture = animator.init();
  // const animate = () => {
  //   animator.animate();
  //   requestAnimationFrame(animate);
  // };
  // TODO add animation to texture
  // create a reference
  // useFrame(({ clock }) => {
  //   // ref.current.rotation.x = clock.getElapsedTime() / 2;
  //   // ref.current.rotation.y = clock.getElapsedTime() / 4;
  // });
  return (
    <>
      <mesh ref={ref} position={[0, 0, 0]} scale={10}>
        <sphereGeometry attach="geometry" args={[1, 50, 30]} />
        <meshStandardMaterial color={"orange"} map={texture} />
      </mesh>
      {/* {animate()} */}
    </>
  );
}

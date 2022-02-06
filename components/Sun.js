import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
// import { useRouter } from "next/router";

export default function Planet() {
  // // threejs stuff

  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() / 2;
    ref.current.rotation.y = clock.getElapsedTime() / 2;
  });

  // useFrame((state, delta) => (ref.current.rotation.y += 0.01));
  // useFrame((state, delta) => (ref.current.rotation.z += 0.01));

  return (
    <>
      <mesh
        ref={ref}
        position={[0, 0, 0]}
        rotation={[Math.PI / 20, 0, 0]}
        // position={[`${post.position}`, 0, 0]}
        // scale={clicked ? 1.5 : 1}
        // rotation={[20, 10, 0]}
        scale={2}
        // scale={gasGiant ? 1.5 : 0.5}
        // onClick={(event) => click(!clicked)}
        // onPointerOver={(event) => hover(true)}
        // onPointerOut={(event) => hover(false)}
      >
        <sphereGeometry args={[1, 50, 30]} />
        {/* <textGeometry args={[`${post.title}`]} /> */}
        <meshStandardMaterial color={"orange"} />
        {/* <meshStandardMaterial color={"orange"} /> */}
      </mesh>
    </>
  );
}

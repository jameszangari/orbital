// import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import { LayerMaterial, Base, Depth } from "lamina";
import { Sphere } from "@react-three/drei";

export default function Planet({ post }) {
  console.log(post);
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += 0.025));
  useFrame((state, delta) => (ref.current.rotation.y += 0.025));
  // useFrame((state, delta) => (ref.current.rotation.z += 0.025));

  // Delete post
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const deletePost = async (postId) => {
    //change deleting state
    setDeleting(true);

    try {
      // Delete post
      await fetch("/api/posts", {
        method: "DELETE",
        body: postId,
      });

      // reset the deleting state
      setDeleting(false);

      // reload the page
      return router.push(router.asPath);
    } catch (error) {
      // stop deleting state
      return setDeleting(false);
    }
  };
  const gasGiant = post.type === "Gas Giant";
  const neptuneLike = post.type === "Neptune-like";
  const superEarth = post.type === "Super-Earth";
  const terrestrial = post.type === "Terrestrial";
  const typeScale = () => {
    return gasGiant
      ? 2
      : neptuneLike
      ? 1.5
      : superEarth
      ? 1
      : terrestrial
      ? 0.5
      : 1;
  };
  const typePosition = () => {
    return gasGiant
      ? 10
      : neptuneLike
      ? 7
      : superEarth
      ? 1
      : terrestrial
      ? -3
      : 1;
  };
  const typeColor = () => {
    return gasGiant
      ? "#4443A7"
      : neptuneLike
      ? "#36c69b"
      : superEarth
      ? "#6fb23a"
      : terrestrial
      ? "#bdaa66"
      : "#ffffff";
  };
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  return (
    <>
      {/* <mesh
        ref={ref}
        position={[`${typePosition()}`, 0, 0]}
        rotation={[Math.PI / 10, 20, 10]}
        // position={[`${post.position}`, 0, 0]}
        // scale={clicked ? 1.5 : 1}
        // rotation={[20, 10, 0]}
        scale={typeScale()}
        // scale={gasGiant ? 1.5 : 0.5}
        // onClick={(event) => click(!clicked)}
        // onPointerOver={(event) => hover(true)}
        // onPointerOut={(event) => hover(false)}
      >
        <sphereGeometry args={[1, 50, 30]} />
        <meshStandardMaterial attach="material" color={typeColor()} />
      </mesh> */}
      <Sphere
        ref={ref}
        position={[getRandomInt(10), getRandomInt(10), getRandomInt(10)]}
        scale={post.scale}
      >
        <LayerMaterial>
          <Base color={post.baseColor} alpha={1} mode="normal" />
          <Depth
            colorA="#121212"
            colorB="#EDEDED"
            alpha={1}
            mode="multiply"
            near={0}
            far={2}
            origin={[1, 1, 1]}
          />
        </LayerMaterial>
      </Sphere>
    </>
  );
}

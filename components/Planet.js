import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import Button from "./Button";
// import Sora from "../public/Sora_Regular.json";

export default function Planet({ post }) {
  // // threejs stuff
  // const mesh = useRef();

  // const [hovered, setHover] = useState(false);
  // const [active, setActive] = useState(false);
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += 0.01));
  useFrame((state, delta) => (ref.current.rotation.z += 0.01));

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
      ? "#2e2d71"
      : neptuneLike
      ? "#36c69b"
      : superEarth
      ? "#6fb23a"
      : terrestrial
      ? "#bdaa66"
      : "#ffffff";
  };
  // // parse JSON file with Three
  // const font = new THREE.FontLoader().parse(Sora);
  // // configure font geometry
  // const textOptions = {
  //   font,
  //   size: 5,
  //   height: 1,
  // };
  return (
    <>
      <mesh
        ref={ref}
        position={[`${typePosition()}`, 0, 0]}
        rotation={[Math.PI / 20, 0, 0]}
        // position={[`${post.position}`, 0, 0]}
        // scale={clicked ? 1.5 : 1}
        // rotation={[20, 10, 0]}
        scale={typeScale()}
        // scale={gasGiant ? 1.5 : 0.5}
        // onClick={(event) => click(!clicked)}
        // onPointerOver={(event) => hover(true)}
        // onPointerOut={(event) => hover(false)}
      >
        {/* <textGeometry attach="geometry" args={[`${post.title}`, textOptions]} /> */}
        <sphereGeometry args={[1, 50, 30]} />
        <meshStandardMaterial attach="material" color={typeColor()} />
      </mesh>
      {/* <NativeBox
        args={[1, 1, 1]}
        {...post}
        ref={mesh}
        scale={active ? [6, 6, 6] : [5, 5, 5]}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <meshStandardMaterial
          attach="material"
          color={hovered ? "#2b6c76" : "#720b23"}
        />
      </NativeBox> */}
      {/* <li className="planet flex flex-col mb-16">
        <h3>Name: {post.title}</h3>
        {post.type === "Gas Giant" && (
          <div className={"bg-red-500"}>{post.type}</div>
        )}
        {post.type === "Neptune-like" && (
          <div className={"bg-blue-500"}>{post.type}</div>
        )}
        {post.type === "Super-Earth" && (
          <div className={"bg-green-500"}>{post.type}</div>
        )}
        {post.type === "Terrestrial" && (
          <div className={"bg-amber-500"}>{post.type}</div>
        )}
        {post.core === "Metallic" && (
          <div className={"bg-gray-500"}>{post.core}</div>
        )}
        {post.core === "Rocky" && (
          <div className={"bg-yellow-900"}>{post.core}</div>
        )}
        <small>Created: {new Date(post.createdAt).toLocaleDateString()}</small>
        <Button
          label={deleting ? "Deleting" : "Delete"}
          type="submit"
          click={() => deletePost(post["_id"])}
        />
      </li> */}
    </>
  );
}

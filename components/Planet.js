import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import { LayerMaterial, Base, Depth, Fresnel, Texture, Noise } from "lamina";
import { Sphere, useTexture } from "@react-three/drei";

export default function Planet({ post, xRadius, zRadius, speed, offset }) {
  console.log(post);
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const rotationSpeed = 0.005;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    const x = xRadius * Math.sin(t);
    const z = zRadius * Math.cos(t);
    ref.current.position.x = x;
    ref.current.position.z = z;
    ref.current.rotation.y += rotationSpeed;
  });

  function Ecliptic() {
    const points = [];
    for (let index = 0; index < 64; index++) {
      const angle = (index / 64) * 2 * Math.PI;
      const x = xRadius * Math.cos(angle);
      const z = zRadius * Math.sin(angle);
      points.push(new THREE.Vector3(x, 0, z));
    }
    points.push(points[0]);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    return (
      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color="#393e46" linewidth={10} />
      </line>
    );
  }
  // set type to variable
  const gasGiant = post.pType === "Gas Giant";
  const neptuneLike = post.pType === "Neptune-like";
  const superEarth = post.pType === "Super Earth";
  const terrestrial = post.pType === "Terrestrial";
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
  const texture = useTexture([
    "/metallic.jpg",
    "/rocky.jpg",
    "/water.jpg",
    "/terrestrial.jpg",
  ]);
  const chooseTexture = () => {
    if (gasGiant) {
      return texture[0];
    }
    if (neptuneLike) {
      return texture[1];
    }
    if (superEarth) {
      return texture[2];
    }
    if (terrestrial) {
      return texture[3];
    }
  };
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

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  return (
    <>
      <Sphere
        ref={ref}
        // position={[getRandomInt(15), 0, getRandomInt(15)]}
        // position={[getRandomInt(10), getRandomInt(10), getRandomInt(10)]}
        // position={[80, getRandomInt(10), 0]}
        scale={post.pSize}
      >
        <LayerMaterial>
          <Base color={post.pCore} alpha={1} mode="normal" />
          {/* <Depth
            colorA={post.layerColorA}
            colorB={post.layerColorB}
            alpha={1}
            mode="multiply"
            near={0}
            far={2}
            origin={[1, 1, 1]}
          />
          <Fresnel
            color={post.fresnelColor}
            alpha={1}
            mode="softlight"
            power={1}
            intensity={1}
            bias={0.1}
          /> */}
          <Texture map={chooseTexture()} alpha={0.85} />

          <Texture map={useTexture(post.pCoreTexture)} alpha={0.65} />
          <Texture
            map={useTexture(post.pCloudTexture)}
            alpha={post.pCloudAlpha}
            attachObject={Noise}
          />
          <Noise
            colorA={post.pAtmosColor.hex}
            colorB="#000000"
            alpha={0.5}
            mode="darken"
          />
        </LayerMaterial>
      </Sphere>
      {/* <Ecliptic xRadius={getRandomInt(15)} zRadius={getRandomInt(15)} /> */}
      <Ecliptic xRadius={xRadius} zRadius={zRadius} />
    </>
  );
}

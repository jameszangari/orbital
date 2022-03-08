import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import { LayerMaterial, Base, Depth, Fresnel, Texture, Noise } from "lamina";
import { Sphere, useTexture } from "@react-three/drei";
import Ecliptic from "./Ecliptic";

export default function Planet({ post, xRadius, zRadius }) {
  console.log(post);
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();

  // set type to variable
  const gasGiant = post.pType === "Gas Giant";
  const neptuneLike = post.pType === "Neptune-like";
  const superEarth = post.pType === "Super Earth";
  const terrestrial = post.pType === "Terrestrial";

  const texture = useTexture([
    "/img/gaseous/Gaseous1.png",
    "/img/inhabitable/Icy.png",
    "/img/habitable/Alpine.png",
    "/img/terrestrial/Terrestrial1.png",
  ]);
  const setTextures = () => {
    return gasGiant
      ? texture[0]
      : neptuneLike
      ? texture[1]
      : superEarth
      ? texture[2]
      : terrestrial
      ? texture[3]
      : "";
  };
  // const orbitRings = () => {
  //   for (let ring = 0; ring < 64; ring++) {
  //     return <Ecliptic xRadius={ring} zRadius={ring} />;
  //     // <Ecliptic xRadius={post.xRadius} zRadius={post.zRadius} />;
  //     // Runs 5 times, with values of step 0 through 4.
  //     console.log("Walking east one step");
  //   }
  // };
  // console.log(orbitRings);
  const random = (a, b) => a + Math.random() * b;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * post.pSpeed + post.pOffset;
    const x = xRadius * Math.sin(t);
    const z = zRadius * Math.cos(t);
    ref.current.position.x = x;
    ref.current.position.z = z;
    ref.current.rotation.y += random(0.008, 0.004);
  });
  return (
    <>
      <Sphere
        ref={ref}
        // position={[getRandomInt(15), 0, getRandomInt(15)]}
        // position={[8, 0, 0]}
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
          <Texture map={setTextures()} alpha={0.65} />
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
      <Ecliptic xRadius={xRadius} zRadius={zRadius} />
    </>
  );
}

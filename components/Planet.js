import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { LayerMaterial, Depth, Texture } from "lamina";
import { Sphere, useTexture } from "@react-three/drei";
import Ecliptic from "./Ecliptic";

export default function Planet({ post, xRadius, zRadius }) {
  const ref = useRef();

  const random = (a, b) => a + Math.random() * b;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * post.pSpeed + post.pOffset;
    const x = xRadius * Math.sin(t * 1.25);
    const z = zRadius * Math.cos(t * 1.25);
    ref.current.position.x = x;
    ref.current.position.z = z;
    ref.current.rotation.y += random(0.008, 0.004);
  });
  return (
    <>
      <Sphere ref={ref} scale={post.pSize / 2.5}>
        <LayerMaterial
          color={post.pCoreColor.hex}
          alpha={1}
          lighting="physical"
          transmission={0.1}
        >
          <Texture map={useTexture(post.pCoreTexture)} alpha={0.65} />
          <Texture map={useTexture(post.pCloudTexture)} alpha={0.3} />
          <Depth
            colorA={post.pCloudColor.hex}
            colorB="#000000"
            alpha={0.5}
            mode="darken"
            mapping={"vector"}
          />
        </LayerMaterial>
      </Sphere>
      <Ecliptic xRadius={xRadius} zRadius={zRadius} />
    </>
  );
}

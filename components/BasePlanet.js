import { useRef } from "react";
import { LayerMaterial, Depth, Texture } from "lamina";
import { Sphere, useTexture } from "@react-three/drei";

export default function Planet({ post }) {
  console.log(post);
  const ref = useRef();
  return (
    <Sphere ref={ref} scale={5}>
      <LayerMaterial
        color={post.CoreColor}
        alpha={1}
        lighting="physical"
        transmission={0.1}
      >
        <Texture map={useTexture(post.CoreTexture)} alpha={0.65} />
        <Texture map={useTexture(post.CloudTexture)} alpha={0.3} />
        <Depth
          colorA={post.CloudColor}
          colorB="#000000"
          alpha={0.5}
          mode="darken"
          mapping={"vector"}
        />
      </LayerMaterial>
    </Sphere>
  );
}

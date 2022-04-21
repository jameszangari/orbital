import Link from "next/link";
import MediaQuery from "react-responsive";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, useTexture } from "@react-three/drei";
import { LayerMaterial, Base, Noise, Depth, Fresnel, Texture } from "lamina";
import Title from "./components/Title.js";
import Time from "./components/Time.js";
import Creators from "./components/Creators.js";
import Instagram from "./icons/Instagram.js";
import BackgroundAlt from "./components/BackgroundAlt.js";
import * as gtag from "./../lib/gtag";

const Planet = () => {
  const ref = useRef();
  return (
    <>
      <MediaQuery minWidth={640}>
        <Sphere ref={ref} position={[0, 1, 0]} scale={2}>
          <LayerMaterial
            color="#D33CE7"
            alpha={1}
            lighting="physical"
            transmission={0.5}
          >
            <Texture map={useTexture("/img/volcanic.png")} alpha={0.65} />
            <Texture map={useTexture("/img/clouds.png")} alpha={0.5} />
            <Depth
              colorA="#5B2CCB"
              colorB="#000000"
              alpha={0.5}
              mode="darken"
              mapping={"vector"}
            />
          </LayerMaterial>
        </Sphere>
      </MediaQuery>
      <MediaQuery maxWidth={641}>
        <Sphere ref={ref} position={[0, 1, 0]} scale={2}>
          <LayerMaterial
            color="#D33CE7"
            alpha={1}
            lighting="physical"
            transmission={0.5}
          >
            <Texture map={useTexture("/img/volcanic.png")} alpha={0.65} />
            <Texture map={useTexture("/img/clouds.png")} alpha={0.5} />
            <Depth
              colorA="#5B2CCB"
              colorB="#000000"
              alpha={0.5}
              mode="darken"
              mapping={"vector"}
            />
          </LayerMaterial>
        </Sphere>
      </MediaQuery>
    </>
  );
};

export default function Home() {
  const [insta, setInsta] = useState("");

  const click = () => {
    gtag.event({
      category: "Instagram",
      action: "click",
      label: insta,
    });
  };
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: false }}
        camera={{ fov: 50, position: [0, 0, 20] }}
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          zIndex: 10,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <pointLight position={[100, 100, 100]} />
          <Planet />
          <Stars
            radius={100} // Radius of the inner sphere (default=100)
            depth={50} // Depth of area where stars should fit (default=50)
            count={5000} // Amount of stars (default=5000)
            factor={4} // Size factor (default=4)
            saturation={0} // Saturation 0-1 (default=0)
            fade={false} // Faded dots (default=false)
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            enableDamping={true}
          />
        </Suspense>
      </Canvas>
      <Title />
      <div className="absolute flex flex-col flex-wrap w-full sm:flex-row px-4 gap-2 bottom-0 z-10 sm:gap-4">
        <Time />
        <Creators />
        <Link href="https://www.instagram.com/orbitalteam.app" passHref>
          <a
            className="relative w-full flex items-center justify-center px-4 py-2 text-xs md:text-sm text-text hover:text-blue-accent uppercase font-space tracking-widest mb-4"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setInsta("Instagram");
              click();
            }}
          >
            Follow us <Instagram className={"ml-2"} /> <BackgroundAlt />
          </a>
        </Link>
      </div>
      <div className="absolute flex self-end px-4 w-full"></div>
    </>
  );
}

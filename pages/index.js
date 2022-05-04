// import dynamic from "next/dynamic";
import Head from "next/head";
import React, { Suspense, useCallback } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Logo from "../components/Logo";
import Link from "../components/Link";
import Background from "../components/Background";
import RotateIcon from "../components/RotateIcon";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useTexture } from "@react-three/drei";

export default function Landing() {
  const description = "begin customizing your own personalized planet";
  const Planet = () => {
    const targetRef = useRef();
    const texture = useTexture("/img/sun.jpg");
    useFrame(({ clock }) => {
      targetRef.current.rotation.y = clock.getElapsedTime() / 10;
    });
    return (
      <>
        <mesh ref={targetRef} position={[0, 0, 0]} scale={4}>
          <sphereGeometry attach="geometry" args={[1, 50, 30]} />
          <meshStandardMaterial
            // color={"orange"}
            map={useTexture("/img/default-texture.png")}
          />
        </mesh>
      </>
    );
  };
  const screen1 = useFullScreenHandle();
  const screen2 = useFullScreenHandle();

  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen1) {
        console.log("Screen 1 went to", state, handle);
      }
      if (handle === screen2) {
        console.log("Screen 2 went to", state, handle);
      }
    },
    [screen1, screen2]
  );
  return (
    <>
      <Head>
        <title>Orbital</title>
      </Head>
      <FullScreen handle={screen1} onChange={reportChange}>
        <button
          className="absolute right-5 top-5 z-[999]"
          onClick={screen2.enter}
        >
          Fullscreen
        </button>
      </FullScreen>

      <FullScreen handle={screen2} onChange={reportChange}>
        <button
          className="absolute left-5 top-5 z-[999]"
          onClick={screen2.exit}
        >
          Exit
        </button>
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          camera={{ fov: 50, position: [0, 0, 20] }}
          style={{ height: "100vh", width: "100vw", position: "fixed" }}
          shadows
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[100, 100, 100]} />
            <Stars />
            <Planet />
          </Suspense>
        </Canvas>
        <motion.div className="portrait:hidden">
          <motion.div className="absolute w-full h-full">
            <Logo className={"mx-auto w-64"} />
            <motion.div className="absolute bottom-4 w-full mx-auto">
              <motion.p className="text-center text-lg uppercase tracking-[0.15em] mb-4">
                {description}
              </motion.p>
              <Link
                variant={"link"}
                url={"/create"}
                label={`Create Your Planet`}
                className={"w-max mx-auto py-4 px-8"}
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className="landscape:hidden z-50 h-screen w-full flex flex-col justify-center items-center bg-black bg-opacity-75">
          <motion.div className="absolute z-50 flex flex-col justify-center items-center mx-4">
            <RotateIcon className={"block w-24 h-24 mt-8"} />
            <motion.h3 className="text-xl font-secondary uppercase p-8">
              Please rotate your device.
            </motion.h3>
            <Background color={"blue"} border={"blue"} />
          </motion.div>
        </motion.div>
      </FullScreen>
    </>
  );
}

// import dynamic from "next/dynamic";
import Head from "next/head";
import React, { Suspense } from "react";
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
        <mesh ref={targetRef} position={[0, 0, 0]} scale={5}>
          <sphereGeometry attach="geometry" args={[1, 50, 30]} />
          <meshStandardMaterial
            // color={"orange"}
            map={useTexture("/img/default-texture.png")}
          />
        </mesh>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Orbital</title>
      </Head>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        camera={{ fov: 50, position: [0, 0, 20] }}
        style={{ height: "100vh", width: "100vw", position: "fixed" }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <pointLight position={[100, 100, 100]} />
          <Stars fade depth={50} />
          <Planet />
        </Suspense>
      </Canvas>
      <motion.div className="portrait:hidden">
        <motion.div className="absolute w-full h-full">
          <Logo className={"mx-auto w-64 mt-2"} />
          <motion.div className="absolute bottom-6 w-full mx-auto">
            <motion.p className="text-center text-lg uppercase tracking-[0.15em] mb-6 text-glow-blue">
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
    </>
  );
}

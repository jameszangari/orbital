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
        </Suspense>
      </Canvas>
      <motion.div className="absolute w-full h-screen">
        <Logo className={"mx-auto w-96 mt-32 px-6"} />
        <motion.div className="flex flex-col items-center justify-center h-auto w-full mt-16 mx-auto">
          <Link
            variant={"link"}
            url={"/begin"}
            label={`Create Your Own Planet`}
            className={"w-96 mx-auto py-4 px-8 mb-4"}
            color={"pink"}
          />
          <Link
            variant={"link"}
            url={"/observe"}
            label={`Observe the Solar System`}
            className={"w-96 mx-auto py-4 px-8 mb-4"}
          />
          <Link
            variant={"link"}
            url={"/dashboard"}
            label={`View the Mission Control Center`}
            className={"w-96 mx-auto py-4 px-8 mb-4"}
          />
          <Link
            variant={"link"}
            url={"/codex"}
            label={`View the Planet Codex`}
            className={"w-96 mx-auto py-4 px-8 mb-4"}
          />
          <Link
            variant={"link"}
            url={"/casestudy"}
            label={`View the Case Study`}
            className={"w-96 mx-auto py-4 px-8 mb-4"}
            color={"blue"}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

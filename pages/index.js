import Head from "next/head";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Logo from "../components/Logo";
import Link from "../components/Link";
import Background from "../components/Background";
import RotateIcon from "../components/RotateIcon";
import { motion } from "framer-motion";

export default function Index() {
  const description =
    "Your mission is to design a unique planet that will be instantly added to the collaborative solar system projected in front of you!";
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
        <Stars />
      </Canvas>
      <motion.div className="portrait:hidden">
        <motion.div className="py-4 m-auto grid place-items-center mx-4 absolute w-full h-full">
          <motion.div className="flex flex-col justify-center max-w-3xl">
            <Logo />
            <motion.p
              className="pt-12 text-lg uppercase tracking-[0.15em]"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <Link
              variant={"link"}
              url={"/create"}
              label={`Create Your Planet`}
              className={"mt-12 w-max mx-auto"}
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
          <Background color={"#496EEF"} border={"blue-bg"} />
        </motion.div>
      </motion.div>
    </>
  );
}

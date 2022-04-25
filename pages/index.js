import Head from "next/head";
import React from "react";
import Link from "../components/Link";
import Background from "../components/Background";
import RotateIcon from "../components/RotateIcon";
import { motion } from "framer-motion";

export default function Index({ posts }) {
  const description =
    "Orbital is an interactive art exhibit where visitors can create a custom planet and add it to our collaborative solar system and see it projected in real-time. Through the individual contributions of our visitors, our solar system will be filled with unique and vibrant planets for all to see.";
  return (
    <>
      <Head>
        <title>Orbital | Welcome</title>
      </Head>
      <motion.div className="portrait:hidden">
        <motion.div className="py-4 max-w-3xl m-auto grid place-items-center mx-4">
          <motion.div className="flex flex-col justify-center">
            <motion.h1 className="pb-8 pt-24 text-3xl">Welcome!</motion.h1>
            <motion.p>{description}</motion.p>
            <Link
              variant={"link"}
              url={"/create"}
              label={`Create Your Planet!`}
              className={"mt-8 w-max"}
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
          <Background />
        </motion.div>
      </motion.div>
    </>
  );
}

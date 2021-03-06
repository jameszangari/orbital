import dynamic from "next/dynamic";
import Image from "../Image";
// import Background from "../Background";
const Background = dynamic(() => import("../Background"));

import { motion } from "framer-motion";

export default function Create({ imgSrc, label, click }) {
  return (
    <motion.a
      className="relative cursor-pointer text-text p-2 flex flex-col justify-center items-center w-full active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 text-xs md:text-sm font-secondary uppercase hover:bg-orbital-blue focus:bg-orbital-blue active:bg-orbital-blue transition-all shadow-md shadow-orbital-blue/10"
      onClick={click || null}
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.25,
        },
        height: "auto",
      }}
      exit={{ opacity: 0, height: 0 }}
    >
      <motion.span className="z-10 flex flex-col justify-center items-center pointer-events-none py-1">
        <Image
          src={imgSrc}
          alt={label}
          layout="fixed"
          width={50}
          height={50}
          unoptimized={true}
          className="rounded-full mb-2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            delay: 0.5,
          }}
          exit={{ opacity: 0 }}
        />
        <motion.p className="pt-2 text-glow-blue">{label}</motion.p>
      </motion.span>
      <Background color={"blue"} border={"blue"} />
    </motion.a>
  );
}

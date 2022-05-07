import dynamic from "next/dynamic";
const Background = dynamic(() => import("./Background"));
import { motion } from "framer-motion";

export default function Button({ label, type, className, click }) {
  return (
    <motion.button
      className={
        "relative cursor-pointer text-text p-2 flex flex-col justify-center items-center w-full active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 text-sm font-secondary uppercase hover:bg-oPink focus:bg-oPink active:bg-oPink transition-all shadow-md shadow-oPink/10 border-pink-border bg-pink-bg " +
          className || null
      }
      type={type}
      onClick={click || null}
    >
      {label}
      <Background color={"pink"} border={"pink"} />
    </motion.button>
  );
}

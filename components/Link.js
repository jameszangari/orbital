import dynamic from "next/dynamic";
import Link from "next/link";
// import Background from "./Background";
import { motion } from "framer-motion";
const Background = dynamic(() => import("./Background"));
export default function Button({ label, click, url, variant, className }) {
  return (
    <>
      {variant === "button" && (
        <motion.a
          className="relative cursor-pointer text-text p-2 flex flex-col justify-center items-center w-full active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 text-sm font-secondary uppercase hover:bg-oPink focus:bg-oPink active:bg-oPink transition-all shadow-md shadow-oPink/10 border-pink-border bg-pink-bg"
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
          <motion.span>{label}</motion.span>
          <Background color={"pink"} border={"pink"} />
        </motion.a>
      )}
      {variant === "link" && (
        <Link href={url || ""} passHref>
          <motion.div
            className={
              "relative cursor-pointer text-text p-2 flex flex-col justify-center items-center w-full active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 text-sm font-secondary uppercase hover:bg-oPurple focus:bg-oPurple active:bg-oPurple transition-all shadow-md shadow-oPurple/10 border-purple-accent bg-purple-bg " +
                className || null
            }
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
            <motion.span>{label}</motion.span>
            <Background color={"purp"} border={"purp"} />
          </motion.div>
        </Link>
      )}
    </>
  );
}

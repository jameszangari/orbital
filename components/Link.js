import Link from "next/link";
import Background from "./Background";
import { motion } from "framer-motion";

export default function Button({ label, click, url, variant, className }) {
  return (
    <>
      {variant === "button" && (
        <motion.a
          className="relative cursor-pointer text-text p-2 flex flex-col justify-center items-center w-full active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 text-sm font-secondary uppercase hover:bg-oPurple focus:bg-oPurple active:bg-oPurple transition-all shadow-md shadow-oPurple/10 border-purple-accent bg-purple-bg"
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
          <motion.p>{label}</motion.p>
          <Background color={"#5B2CCB"} border={"purple-accent"} />
        </motion.a>
      )}
      {variant === "link" && (
        <Link href={url || ""} passHref>
          <motion.a
            className={
              "relative cursor-pointer text-text p-2 flex flex-col justify-center items-center w-full active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 text-sm font-secondary uppercase hover:bg-oPurple focus:bg-oPurple active:bg-oPurple transition-all shadow-md shadow-oPurple/10 border-purple-accent bg-purple-bg " +
                className || null
            }
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
            <motion.p>{label}</motion.p>
            <Background color={"#5B2CCB"} border={"purple-accent"} />
          </motion.a>
        </Link>
      )}
    </>
  );
}

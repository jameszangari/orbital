import Link from "next/dist/client/link";
import { motion } from "framer-motion";

export default function Button({ label, click, url, variant, className }) {
  return (
    <>
      {variant === "button" && (
        <motion.a
          className={
            "text-sm sm:text-md uppercase bg-purple-bg bg-opacity-25 border-pink-border border-2 text-text py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oPurple hover:bg-opacity-25 hover:border-oPurple w-full cursor-pointer text-center shadow-md shadow-pink-border/10 " +
            className
          }
          onClick={click || null}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.5,
            },
            height: "auto",
          }}
          exit={{ opacity: 0, height: 0 }}
        >
          {label}
        </motion.a>
      )}
      {variant === "link" && (
        <Link href={url || ""} passHref>
          <motion.a
            className={
              "text-sm sm:text-md uppercase bg-oPurple bg-opacity-25 border-pink-border border-2 text-text py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oPurple hover:bg-opacity-50 hover:border-oPurple w-full shadow-md shadow-oPurple/10 " +
              className
            }
            onClick={click || null}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
              height: "auto",
            }}
            exit={{ opacity: 0, height: 0 }}
          >
            {label}
          </motion.a>
        </Link>
      )}
    </>
  );
}

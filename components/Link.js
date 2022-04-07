import Link from "next/dist/client/link";
import { motion } from "framer-motion";

export default function Button({ label, click, url, variant, className }) {
  return (
    <>
      {variant === "button" && (
        <motion.a
          className={
            "text-sm sm:text-md uppercase bg-blue-bg bg-opacity-25 border-blue-border border-2 text-text py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oBlue hover:bg-opacity-50 hover:border-oBlue w-full cursor-pointer text-center " +
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
              "text-sm sm:text-md uppercase bg-oPurple bg-opacity-25 border-pink-border border-2 text-text py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oPurple hover:bg-opacity-50 hover:border-oPurple w-full " +
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

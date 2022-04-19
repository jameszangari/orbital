import Link from "./Link";
import { motion } from "framer-motion";
import Icon from "./Icon";

export default function Nav() {
  return (
    <motion.nav
      className="absolute top-0 p-1 m-auto z-[999]"
      initial={{ opacity: 0, x: -50, y: -50 }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
      exit={{ opacity: 0 }}
    >
      <Icon className={"w-36 h-auto"} />
    </motion.nav>
  );
}

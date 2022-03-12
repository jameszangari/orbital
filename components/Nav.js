import Link from "./Link";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.nav
      className="absolute top-0 p-1 m-auto z-50"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      }}
      exit={{ opacity: 0 }}
    >
      <ul className="flex w-full list-none">
        <li className="block mr-1">
          <Link label="Create" url="/" variant="link" />
        </li>
        <li className="block">
          <Link label="Observe" url="/observe" variant="link" />
        </li>
      </ul>
    </motion.nav>
  );
}

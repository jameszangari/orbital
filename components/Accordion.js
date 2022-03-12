import React from "react";
import { motion } from "framer-motion";

const Accordion = ({ collapsed, children, title, className, click }) => {
  // TODO add an active class to not collapsed div, use this to set option to open another div if not active
  console.log(collapsed);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
        exit={{ opacity: 0 }}
        className={
          collapsed
            ? "border-pink-border border-2 mt-1 first-of-type:my-0 p-1 " +
              className
            : "border-pink-border border-2 mt-1 first-of-type:my-0 p-1 h-screen " +
              className
        }
      >
        <a className={"block w-full cursor-pointer"} onClick={click}>
          <h1
            className={
              collapsed
                ? "uppercase tracking-wider font-secondary text-xs opacity-75"
                : "uppercase tracking-wider font-secondary text-base pt-1 pl-1"
            }
          >
            {title}
          </h1>
        </a>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{ opacity: 0 }}
            // className={collapsed ? "hidden" : "block"}
            aria-expanded={!collapsed}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Accordion;

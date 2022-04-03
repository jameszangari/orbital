import React from "react";
import { motion } from "framer-motion";

const Accordion = ({
  collapsed,
  children,
  title,
  className,
  click,
  selection,
}) => {
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
            ? "border-pink-border bg-purple-bg border-2 mt-1 first-of-type:my-0 p-1 " +
              className
            : "border-blue-border bg-[#496EEF] bg-opacity-10 border-2 mt-1 first-of-type:my-0 p-1 h-max " +
              className
        }
      >
        <a
          className={"flex justify-between items-center w-full cursor-pointer"}
          onClick={click}
        >
          <h1
            className={
              collapsed
                ? "uppercase tracking-wider font-secondary text-xs opacity-75"
                : "uppercase tracking-wider font-secondary text-base pt-1 pl-1 text-orbital-blueLight font-semibold"
            }
          >
            {title}
          </h1>
          <span className="flex gap-2">
            {typeof selection === "string" ? (
              <p className="text-xs uppercase opacity-50">{selection}</p>
            ) : (
              selection
            )}
          </span>
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

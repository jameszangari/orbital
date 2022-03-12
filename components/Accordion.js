import React from "react";

const Accordion = ({ collapsed, children, title, className, click }) => {
  // TODO add an active class to not collapsed div, use this to set option to open another div if not active
  return (
    <>
      <div
        className={
          collapsed
            ? "border-pink-border border-2 mt-2 first-of-type:my-0 p-2 " +
              className
            : "border-pink-border border-2 mt-2 first-of-type:my-0 p-2 h-screen " +
              className
        }
      >
        <a className={"block w-full cursor-pointer"} onClick={click}>
          <h1 className="uppercase tracking-wider font-secondary">{title}</h1>
        </a>
        <div
          className={collapsed ? "hidden" : "block"}
          aria-expanded={!collapsed}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Accordion;

import React, { useState } from "react";

const Accordion = ({ collapsed, children, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  return (
    <>
      <a
        className="block w-full cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h1 className="mb-2">
          {isCollapsed ? "-" : "+"} {title}
        </h1>
      </a>
      <div
        className={`${isCollapsed ? "hidden" : "block"}`}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </>
  );
};

export default Accordion;

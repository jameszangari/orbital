import React, { useState } from "react";

const Accordion = ({ collapsed, children, title, className }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  return (
    <div className={className}>
      <a
        className={"block w-full cursor-pointer"}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h1 className="mb-8 uppercase tracking-wider">
          {isCollapsed ? "-" : "+"} {title}
        </h1>
      </a>
      <div
        className={`${isCollapsed ? "hidden" : "block mb-4"}`}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;

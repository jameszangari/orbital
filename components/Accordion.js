import React, { useState } from "react";

const Accordion = ({ collapsed, children, title, className }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  return (
    <div className={className}>
      <a
        className={"block w-full cursor-pointer"}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h1 className="uppercase tracking-wider">
          {isCollapsed ? "-" : "+"} {title}
        </h1>
      </a>
      <div
        className={isCollapsed ? "hidden" : "block"}
        aria-expanded={!isCollapsed}
      >
        {children}
        {/* {step === 1 ? (
          <Button
            label={"Next"}
            click={(e) => {
              e.preventDefault;
              nextStep();
            }}
            className="mt-4"
          />
        ) : (
          <div className="flex gap-2">
            <Button
              label={"Back"}
              click={(e) => {
                e.preventDefault;
                prevStep();
              }}
              className="mt-4 w-1/2"
            />
            <Button
              label={"Next"}
              click={(e) => {
                e.preventDefault;
                nextStep();
              }}
              className="mt-4 w-1/2"
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Accordion;

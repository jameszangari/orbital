import React from "react";
import Logo from "../icons/Logo.js";

export default function Title() {
  return (
    <div className="absolute top-0 z-10 w-full flex flex-col items-center justify-center mt-2 sm:col-span-2 sm:mt-8">
      <div className="flex items-center w-full justify-center pb-2">
        <Logo />
      </div>
      <h3 className="uppercase text-text-transparent font-space text-xs md:text-sm lg:text-md font-bold tracking-widest px-8">
        a covid safe interactive art installation
      </h3>
    </div>
  );
}

import { useState } from "react";
import Link from "./Link.js";
import Background from "./../components/Background";
import * as gtag from "../../lib/gtag";

export default function Creators() {
  const [query, setQuery] = useState("");

  const click = () => {
    gtag.event({
      category: "CTA Links",
      action: "click",
      label: query,
    });
  };
  // console.log(query);
  // console.log(click());

  return (
    <div className="relative w-full sm:w-1/2 flex-1">
      <Background />
      <div className="relative p-4 h-4/5 flex flex-col justify-between w-full">
        <p className="font-space text-text-transparent font-medium uppercase text-xs md:text-sm pb-4 tracking-widest w-full">
          Created By:
        </p>
        <Link
          link="https://www.charleswollochdesigns.com/"
          name="Charles Wolloch"
          click={() => {
            setQuery("Charles");
            click();
          }}
        />
        <Link
          link="https://jamescliff.com/"
          name="James Zangari"
          click={() => {
            setQuery("James");
            click();
          }}
        />
        <Link
          link="https://themgdesign.com/"
          name="Melissa Gabriele"
          click={() => {
            setQuery("Melissa");
            click();
          }}
        />
        <Link
          link="https://reiddumont.com/"
          name="Reid Dumont"
          click={() => {
            setQuery("Reid");
            click();
          }}
        />
      </div>
    </div>
  );
}

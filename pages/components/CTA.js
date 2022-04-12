import { useState } from "react";
import * as gtag from "../../lib/gtag";
import BackgroundAlt from "./BackgroundAlt.js";
import Link from "next/link";

export default function Time() {
  const [cta, setCTA] = useState("");

  const click = () => {
    gtag.event({
      category: "CTA Links",
      action: "click",
      label: cta,
    });
  };
  return (
    <Link
      href={
        "https://www.gofundme.com/f/donate-to-the-orbital-project?utm_campaign=p_cf+share-flow-1&utm_medium=copy_link&utm_source=customer"
      }
      passHref
    >
      <a
        className="relative w-full flex items-center justify-center px-4 py-2 text-xs md:text-sm text-blue-accent hover:text-text uppercase font-space tracking-widest"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          setCTA("GoFundMe");
          click();
        }}
      >
        help us put this installation on
        <BackgroundAlt />
      </a>
    </Link>
  );
}

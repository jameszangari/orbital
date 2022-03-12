import Image from "next/image";
import Background from "../Background";

export default function Create({ imgSrc, label, click }) {
  return (
    <a
      className="relative cursor-pointer text-levaHighlight3 p-2 flex flex-col justify-center items-center w-full active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 text-xs md:text-sm font-secondary uppercase hover:bg-pink-border focus:bg-pink-border active:bg-pink-border transition-all"
      onClick={click}
    >
      <span className="z-10 flex flex-col justify-center items-center pointer-events-none">
        <Image
          src={imgSrc}
          alt={"Clouds " + label}
          layout="fixed"
          width={50}
          height={50}
          // placeholder="blur"
          priority={true}
          className="rounded-full shadow-lg mb-2"
        />
        {label}
      </span>
      <Background />
    </a>
  );
}

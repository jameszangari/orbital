import Image from "next/image";
import Background from "../Background";

export default function Create({ imgSrc, label, click }) {
  return (
    <a
      className="relative cursor-pointer text-levaHighlight3 p-2 flex flex-col justify-center items-center w-full active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50 text-xs md:text-sm font-secondary uppercase"
      onClick={click}
    >
      <span className="flex flex-col justify-center items-center">
        <Image
          src={imgSrc}
          alt={"Clouds " + label}
          layout="fixed"
          width={50}
          height={50}
          // placeholder="blur"
          priority={true}
          className="rounded-full pointer-events-none shadow-lg"
        />
        <span className="mt-2 pointer-events-none">{label}</span>
      </span>
      <Background />
    </a>
  );
}

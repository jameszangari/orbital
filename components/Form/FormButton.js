import Image from "next/image";

export default function Create({ imgSrc, label, click }) {
  return (
    <a
      className="cursor-pointer bg-oBlue bg-opacity-50 border-oBlue text-levaHighlight3 border-2 p-2 flex flex-col justify-center items-center w-1/4 active:bg-oPurple focus:bg-oPurple hover:bg-oPurple active:border-oPurple focus:border-oPurple hover:border-oPurple active:bg-opacity-50 focus:bg-opacity-50 hover:bg-opacity-50"
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
          className="rounded-full pointer-events-none"
        />
        <span className="mt-2 pointer-events-none">{label}</span>
      </span>
    </a>
  );
}

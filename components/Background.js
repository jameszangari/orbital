import { motion } from "framer-motion";

export default function Background({ color, border }) {
  const Corner = ({ className, stroke }) => {
    return (
      <motion.svg
        width="7"
        height="7"
        viewBox="0 0 7 7"
        fill="none"
        xmlns="//www.w3.org/2000/svg"
        className={className}
      >
        <motion.path
          opacity="0.6"
          d="M6 0V6H-1.19209e-07"
          stroke={stroke}
          strokeWidth="2"
        />
      </motion.svg>
    );
  };
  const pinkBorder = border === "pink";
  const blueBorder = border === "blue";
  const purpBorder = border === "purp";
  const pinkColor = color === "pink";
  const blueColor = color === "blue";
  const purpColor = color === "purp";
  return (
    <>
      <motion.div
        className={
          pinkBorder
            ? "absolute z-0 w-full h-full bg-oPink bg-opacity-10 border-pink-border border-2 border-solid grid grid-columns-2 grid-rows-2"
            : blueBorder
            ? "absolute z-0 w-full h-full bg-orbital-blue bg-opacity-10 border-blue-bg border-2 border-solid grid grid-columns-2 grid-rows-2"
            : purpBorder
            ? "absolute z-0 w-full h-full bg-oPruple bg-opacity-10 border-purple-accent border-2 border-solid grid grid-columns-2 grid-rows-2"
            : "absolute z-0 w-full h-full bg-oPink bg-opacity-10 border-pink-border border-2 border-solid grid grid-columns-2 grid-rows-2"
        }
        // `absolute z-0 w-full h-full bg-[${color}] bg-opacity-10 border-${border} border-blue-bg border-2 border-solid grid grid-columns-2 grid-rows-2`}
      >
        {/* top left corner */}
        <Corner
          className={
            "row-span-1 col-span-1 rotate-180 self-start justify-self-start -mt-0.5 -ml-0.5"
          }
          stroke={
            pinkColor
              ? "#D33CE7"
              : blueColor
              ? "#496EEF"
              : purpColor
              ? "#5B2CCB"
              : "#D33CE7"
          }
        />
        {/* top right corner */}
        <Corner
          className={
            "row-span-1 col-start-2 -rotate-90 self-start justify-self-end -mt-0.5 -mr-0.5"
          }
          stroke={
            pinkColor
              ? "#D33CE7"
              : blueColor
              ? "#496EEF"
              : purpColor
              ? "#5B2CCB"
              : "#D33CE7"
          }
        />
        {/* bottom left corner */}
        <Corner
          className={
            "row-start-2 col-span-1 rotate-90 self-end justify-self-start -mb-0.5 -ml-0.5"
          }
          stroke={
            pinkColor
              ? "#D33CE7"
              : blueColor
              ? "#496EEF"
              : purpColor
              ? "#5B2CCB"
              : "#D33CE7"
          }
        />
        {/* bottom right corner */}
        <Corner
          className={
            "row-start-2 col-start-2 self-end justify-self-end -mb-0.5 -mr-0.5"
          }
          stroke={
            pinkColor
              ? "#D33CE7"
              : blueColor
              ? "#496EEF"
              : purpColor
              ? "#5B2CCB"
              : "#D33CE7"
          }
        />
      </motion.div>
    </>
  );
}

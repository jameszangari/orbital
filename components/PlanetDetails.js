import { motion } from "framer-motion";
import BackgroundCornerLeft from "./BackgroundCornerLeft";
import Image from "../components/Image";

export default function PlanetDetails({
  className,
  name,
  type,
  size,
  core,
  coreColor,
  atmos,
  atmosColor,
}) {
  const between = (x, min, max) => {
    return x >= min && x <= max;
  };
  const sizeAdjustment = () => {
    if (between(size, 0, 1.624)) {
      return "extra small";
    }
    if (between(size, 1.625, 3.24)) {
      return "small";
    }
    if (between(size, 3.25, 4.874)) {
      return "medium";
    }
    if (between(size, 4.875, 6.4)) {
      return "large";
    }
    if (between(size, 6.5, 6.5)) {
      return "extra large";
    }
  };
  sizeAdjustment();
  const options = [
    {
      title: "Name:",
      value: name ? name : "undefined",
    },
    {
      title: "Type:",
      value: type ? type : "undefined",
    },
    {
      title: "Size:",
      value: sizeAdjustment() ? sizeAdjustment() : "undefined",
    },
  ];
  return (
    <motion.div className={className}>
      <motion.div className="p-4 h-72 w-96">
        {/* <motion.div className="border-blue-border bg-[#496EEF] bg-opacity-10 border-2 p-4 h-72 w-96"> */}
        <motion.h2 className="uppercase tracking-widest font-primary text-lg pt-1 pl-1 text-orbital-blue w-max">
          Planet Info
        </motion.h2>
        <motion.div className="w-full flex flex-col mt-4">
          {options.map((option, i) => {
            return (
              <motion.div key={i} className="flex flex-row mb-4">
                <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight">
                  {option.title}
                </motion.p>
                <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-pink-accent">
                  {option.value.substring(0, 18)}
                </motion.p>
              </motion.div>
            );
          })}
          <motion.div className="flex flex-row justify-between mb-4">
            <motion.div className="flex flex-col justify-between mb-4">
              <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight mb-2">
                Core:
              </motion.p>
              <motion.div className="flex flex-row">
                <Image
                  src={core}
                  alt={"Core Texture"}
                  height={40}
                  width={40}
                  className="object-cover rounded-full"
                />
                <motion.div
                  style={{ backgroundColor: coreColor }}
                  className="w-[40px] h-[40px] rounded-full ml-2"
                />
              </motion.div>
            </motion.div>
            <motion.div className="flex flex-col justify-between mb-4">
              <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight mb-2">
                Atmosphere:
              </motion.p>
              <motion.div className="flex flex-row">
                <Image
                  src={atmos}
                  alt={"Core Texture"}
                  height={40}
                  width={40}
                  className="object-cover rounded-full"
                />
                <motion.div
                  style={{ backgroundColor: atmosColor }}
                  className="w-[40px] h-[40px] rounded-full ml-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <BackgroundCornerLeft className={"absolute left-0 bottom-0 z-10"} />
    </motion.div>
  );
}

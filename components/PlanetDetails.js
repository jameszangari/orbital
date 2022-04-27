import { motion } from "framer-motion";
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
  return (
    <motion.div className={className}>
      <motion.div className="border-blue-border bg-[#496EEF] bg-opacity-10 border-2 p-4 mb-5">
        <motion.h2 className="uppercase tracking-[0.2em] font-primary text-base pt-1 pl-1 text-orbital-blue">
          Planet Info
        </motion.h2>
        <motion.div className="w-full flex flex-col gap-4 mt-4">
          <motion.div className="flex flex-row justify-between">
            <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight">
              Name:
            </motion.p>
            <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight">
              {name ? name : "undefined"}
            </motion.p>
          </motion.div>
          <motion.div className="flex flex-row justify-between">
            <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight">
              Type:
            </motion.p>
            <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight">
              {type ? type : "undefined"}
            </motion.p>
          </motion.div>
          <motion.div className="flex flex-row justify-between">
            <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight">
              Size:
            </motion.p>
            <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight">
              {size ? size : "undefined"}
            </motion.p>
          </motion.div>
          <motion.div className="flex flex-row justify-between">
            <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight">
              Core:
            </motion.p>
            <motion.div className="flex flex-row gap-2 ml-4">
              <Image
                src={core}
                alt={"Core Texture"}
                height={30}
                width={70}
                className="object-cover"
              />
              <motion.div
                style={{ backgroundColor: coreColor }}
                className="w-[70px] h-[30px]"
              />
            </motion.div>
          </motion.div>
          <motion.div className="flex flex-row justify-between">
            <motion.p className="uppercase tracking-wider font-secondary text-xl px-1 text-orbital-blueLight">
              Atmosphere:
            </motion.p>
            <motion.div className="flex flex-row gap-2 ml-4">
              <Image
                src={atmos}
                alt={"Core Texture"}
                height={30}
                width={70}
                className="object-cover"
              />
              <motion.div
                style={{ backgroundColor: atmosColor }}
                className="w-[70px] h-[30px]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

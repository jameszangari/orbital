import React, { Suspense, useRef } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";
import { LayerMaterial, Depth, Texture } from "lamina";
import Background from "../components/Background";
import { Sphere, useTexture } from "@react-three/drei";
import Head from "next/head";
import { motion } from "framer-motion";
import WarningIcon from "../components/WarningIcon";
import { server } from "../lib/server";

const API_URL = `${server}/api/posts`;

async function fetcher(url) {
  try {
    const res = await fetch(url);
    const json = await res.json();
    return {
      posts: json["message"],
    };
  } catch (error) {
    return error;
  }
}

export default function Dashboard() {
  // @link https://swr.vercel.app/docs/revalidation
  const { data, error } = useSWR(API_URL, fetcher, { refreshInterval: 60 });

  if (error) {
    return (
      <div className="z-50 h-screen w-full grid place-items-center">
        <div className="absolute z-50 grid place-items-center">
          <h3 className="text-xl font-secondary uppercase p-8">
            Failed to load.
          </h3>
          <Background />
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="z-50 h-screen w-full grid place-items-center">
        <div className="absolute z-50 grid place-items-center">
          <h3 className="text-xl font-secondary uppercase p-8">Loading...</h3>
          <Background />
        </div>
      </div>
    );
  }

  // number padding
  function pad(num, size) {
    var s = "0" + num;
    return s.substr(s.length - size);
  }

  // get current planet count
  const PlanetCount = Object.keys(data.posts).length;
  let AllPlanets = [];
  data.posts.forEach((planet) => {
    AllPlanets.push(planet);
  });

  // push most recent planet to it own array
  let recentPlanet = [];
  if (data) {
    Object.keys(data).forEach((key) => {
      recentPlanet.push(data[key].slice(-1)[0]);
    });
  }

  const preloadCoreTexture = (texturePath) =>
    new Promise((resolve, reject) => {
      const image = new window.Image(texturePath);
      image.onload = () => resolve(texturePath);
      image.src = texturePath;
    });

  const prepareCoreTexture = async (texturePath) => {
    try {
      await preloadCoreTexture(texturePath);
      setCoreTexture(texturePath);
    } catch (e) {
      console.log(e);
    }
  };

  const Planet = () => {
    // preloadCoreTexture(recentPlanet[0].pCoreTexture);
    // prepareCoreTexture(recentPlanet[0].pCoreTexture);
    const targetRef = useRef();
    useFrame(({ clock }) => {
      targetRef.current.rotation.y = clock.getElapsedTime() / 10;
    });
    return (
      <>
        <Sphere
          ref={targetRef}
          position={[0, 0, 0]}
          scale={recentPlanet[0].pSize}
        >
          <LayerMaterial
            color={recentPlanet[0].pCoreColor.hex}
            alpha={1}
            lighting="physical"
            transmission={0.1}
          >
            <Texture
              map={useTexture(recentPlanet[0].pCoreTexture)}
              alpha={0.65}
            />
            <Texture
              map={useTexture(recentPlanet[0].pCloudTexture)}
              alpha={recentPlanet[0].pCloudAlpha}
            />
            <Depth
              colorA={recentPlanet[0].pCloudColor.hex}
              colorB="#000000"
              alpha={0.5}
              mode="darken"
              mapping={"vector"}
            />
          </LayerMaterial>
        </Sphere>
      </>
    );
  };

  // set planet types to variables
  const gasGiant = AllPlanets.filter(
    ({ pType }) => pType === "Gas Giant"
  ).length;
  const neptuneLike = AllPlanets.filter(
    ({ pType }) => pType === "Neptune-like"
  ).length;
  const superEarth = AllPlanets.filter(
    ({ pType }) => pType === "Super Earth"
  ).length;
  const terrestrial = AllPlanets.filter(
    ({ pType }) => pType === "Terrestrial"
  ).length;

  return (
    <>
      <Head>
        <title>Orbital | Mission Control</title>
      </Head>
      <motion.div className="absolute top-5 z-10 w-full flex justify-center">
        <motion.h1 className="text-3xl tracking-[0.2em] uppercase border-blue-border bg-[#496EEF] bg-opacity-10 border-2 py-4 px-8 text-orbital-blueLight">
          Mission Control Center
        </motion.h1>
      </motion.div>
      <motion.div
        className="absolute top-32 left-32 z-10 flex justify-center"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
        }}
      >
        <motion.h1 className="flex flex-row text-2xl uppercase border-pink-border bg-purple-bg border-2 py-4 pl-4 pr-8 text-pink-accent tracking-[0.15em]">
          <WarningIcon className={"w-16 h-16 mr-4"} />
          New Planet
          <br /> Discovered
        </motion.h1>
      </motion.div>
      {recentPlanet && (
        <>
          <motion.div className="absolute right-5 top-[50vh] z-10 border-blue-border bg-[#496EEF] bg-opacity-10 border-2 p-4">
            <motion.h2 className="uppercase tracking-wider font-secondary text-base pt-1 pl-1 text-orbital-blue">
              Planet Info
            </motion.h2>
            {recentPlanet.map((planet, i) => {
              return (
                <motion.div key={i} className="w-full flex flex-col gap-4 mt-4">
                  <motion.p className="uppercase tracking-wider font-secondary text-base px-1 text-orbital-blueLight">
                    Name: {planet.pName ? planet.pName : "undefined"}
                  </motion.p>
                  <motion.p className="uppercase tracking-wider font-secondary text-base px-1 text-orbital-blueLight">
                    Type: {planet.pType ? planet.pType : "undefined"}
                  </motion.p>
                  <motion.p className="uppercase tracking-wider font-secondary text-base px-1 text-orbital-blueLight">
                    Size: {planet.pSize ? planet.pSize : "undefined"}
                  </motion.p>
                  <motion.div className="flex flex-row justify-between">
                    <motion.p className="uppercase tracking-wider font-secondary text-base px-1 text-orbital-blueLight">
                      Core:
                    </motion.p>
                    <motion.div className="flex flex-row gap-2 ml-4">
                      <Image
                        src={planet.pCoreTexture}
                        alt={"Core Texture"}
                        height={30}
                        width={30}
                      />
                      <motion.div
                        style={{ backgroundColor: planet.pCoreColor.hex }}
                        className="w-[30px] h-[30px]"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div className="flex flex-row justify-between">
                    <motion.p className="uppercase tracking-wider font-secondary text-base px-1 text-orbital-blueLight">
                      Atmosphere:
                    </motion.p>
                    <motion.div className="flex flex-row gap-2 ml-4">
                      <Image
                        src={planet.pCloudTexture}
                        alt={"Core Texture"}
                        height={30}
                        width={30}
                      />
                      <motion.div
                        style={{ backgroundColor: planet.pCloudColor.hex }}
                        className="w-[30px] h-[30px]"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div className="absolute bottom-5 mx-5 z-10 flex flex-row gap-2 w-max border-blue-border bg-[#496EEF] bg-opacity-10 border-2 p-4">
            <motion.div className="w-1/2">
              <motion.h2 className="uppercase tracking-[0.2em] font-primary text-base pt-1 pl-1 text-orbital-blueLight">
                Total Planets Found
                <br /> In System
              </motion.h2>
              <motion.h2 className="uppercase tracking-wider font-secondary text-3xl pt-1 pl-1 text-orbital-blue">
                {pad(PlanetCount)}
              </motion.h2>
            </motion.div>
            <motion.div className="w-1/2">
              <motion.h2 className="uppercase tracking-wider font-secondary text-xl pt-1 pl-1 text-orbital-blueLight">
                {pad(gasGiant)} Gas Giant
              </motion.h2>
              <motion.h2 className="uppercase tracking-wider font-secondary text-xl pt-1 pl-1 text-orbital-blueLight">
                {pad(neptuneLike)} Neptune-like
              </motion.h2>
              <motion.h2 className="uppercase tracking-wider font-secondary text-xl pt-1 pl-1 text-orbital-blueLight">
                {pad(superEarth)} Super Earth
              </motion.h2>
              <motion.h2 className="uppercase tracking-wider font-secondary text-xl pt-1 pl-1 text-orbital-blueLight">
                {pad(terrestrial)} Terrestrial
              </motion.h2>
            </motion.div>
          </motion.div>
        </>
      )}
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        camera={{ fov: 50, position: [0, 0, 20] }}
        style={{ height: "100vh", width: "100vw", position: "fixed" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <pointLight position={[100, 100, 100]} />
          {recentPlanet && <Planet />}
          <Stars />
        </Suspense>
      </Canvas>
    </>
  );
}

import React, { Suspense, useRef } from "react";
import useSWR from "swr";
import { Canvas, useFrame } from "@react-three/fiber";
import { SpotLight, Stars, Text, Stats } from "@react-three/drei";
import { LayerMaterial, Depth, Texture } from "lamina";
import { Sphere, useTexture } from "@react-three/drei";
import Head from "next/head";
import { motion } from "framer-motion";
import WarningIcon from "../components/WarningIcon";
import Background from "../components/Background";
import BackgroundCornerLeft from "../components/BackgroundCornerLeft";
import BackgroundCornerRight from "../components/BackgroundCornerRight";
import PlanetDetails from "../components/PlanetDetails";
import Image from "../components/Image";
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
          scale={8}
          // scale={recentPlanet[0].pSize}
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

  const values = [
    {
      number: pad(gasGiant),
      title: "Gas Giant",
    },
    {
      number: pad(neptuneLike),
      title: "Neptune-like",
    },
    {
      number: pad(superEarth),
      title: "Super Earth",
    },
    {
      number: pad(terrestrial),
      title: "Terrestrial",
    },
  ];

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
        className="absolute right-5 top-96 z-10 flex justify-center"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
        }}
      >
        <motion.h1 className="flex flex-row text-2xl uppercase border-pink-border bg-purple-bg border-2 py-4 pl-6 pr-4 text-pink-accent tracking-[0.15em] w-96">
          <WarningIcon className={"w-16 h-16 mr-6"} />
          New Planet
          <br /> Discovered
        </motion.h1>
      </motion.div>
      <motion.div className="absolute right-5 bottom-5 z-10">
        <motion.div className="flex flex-col justify-between gap-2 p-4 h-72 w-96">
          <BackgroundCornerRight className={"absolute right-0 bottom-0 z-10"} />
          <motion.div className="">
            <motion.h2 className="uppercase tracking-widest font-primary text-lg mb-2 text-orbital-blue text-right">
              Total Planets
              <br />
              Discovered
            </motion.h2>
            <motion.h2 className="uppercase tracking-widest font-secondary text-4xl p-2 text-oPinkLight text-right bg-pink-border w-max ml-auto">
              {pad(PlanetCount)}
            </motion.h2>
          </motion.div>
          <motion.div className="">
            {values.map((value, i) => {
              return (
                <motion.h2
                  key={i}
                  className="uppercase tracking-wider font-secondary text-2xl text-orbital-blueLight"
                >
                  <motion.span className="text-oPinkLight mr-4">
                    {value.number}
                  </motion.span>
                  {value.title}
                </motion.h2>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
      {recentPlanet.map((planet, i) => {
        return (
          <PlanetDetails
            key={i}
            className="absolute bottom-5 left-5 z-10"
            name={planet.pName}
            type={planet.pType}
            size={planet.pSize}
            core={planet.pCoreTexture}
            coreColor={planet.pCoreColor.hex}
            atmos={planet.pCloudTexture}
            atmosColor={planet.pCloudColor.hex}
          />
        );
      })}
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        camera={{ fov: 50, position: [0, 0, 20] }}
        style={{ height: "100vh", width: "100vw", position: "fixed" }}
        // shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.65} />
          <pointLight position={[100, 100, 100]} />
          {recentPlanet && <Planet />}
          <Stars />
        </Suspense>
      </Canvas>
    </>
  );
}

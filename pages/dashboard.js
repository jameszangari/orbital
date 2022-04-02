import React, { Suspense, useRef } from "react";
import useSWR from "swr";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { LayerMaterial, Depth, Texture } from "lamina";
import Background from "../components/Background";
import { Sphere, useTexture } from "@react-three/drei";
import Head from "next/head";

const API_URL = "/api/posts";

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return {
    posts: json["message"],
  };
}
export default function Dashboard() {
  // Allows for hot reload of planets
  const { data, error } = useSWR(API_URL, fetcher);

  if (error)
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
  if (!data)
    return (
      <div className="z-50 h-screen w-full grid place-items-center">
        <div className="absolute z-50 grid place-items-center">
          <h3 className="text-xl font-secondary uppercase p-8">Loading...</h3>
          <Background />
        </div>
      </div>
    );

  if (error) {
    console.log("Error:");
    console.log(error);
    return null;
  }
  if (!data) {
    console.log("No Data:");
    console.log(!data);
  }
  if (!error) {
    console.log("No Error:");
    console.log(!error);
  }
  if (data) {
    console.log("Data:");
    console.log(data);
  }

  const PlanetCount = Object.keys(data.posts).length;
  let AllPlanets = [];
  data.posts.forEach((planet) => {
    AllPlanets.push(planet);
  });

  let recentPlanet = [];
  if (data) {
    Object.keys(data).forEach((key) => {
      recentPlanet.push(data[key].slice(-1)[0]);
    });
  }
  console.log(recentPlanet);

  const Planet = () => {
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
              colorA={recentPlanet[0].pAtmosColor.hex}
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
      <div className="absolute z-10 w-full flex justify-center mt-8">
        <h1 className="text-3xl uppercase border-blue-border bg-[#496EEF] bg-opacity-10 border-2 py-4 px-8 text-orbital-blueLight">
          Mission Control Center
        </h1>
      </div>
      {recentPlanet && (
        <>
          <div className="absolute right-0 z-10 border-blue-border bg-[#496EEF] bg-opacity-10 border-2 p-4">
            <h2 className="uppercase tracking-wider font-secondary text-base pt-1 pl-1 text-orbital-blue">
              Planet Info
            </h2>
            {recentPlanet.map((planet, i) => {
              return (
                <div key={i}>
                  <p className="uppercase tracking-wider font-secondary text-base pt-1 pl-1 text-orbital-blueLight">
                    Type: {planet.pType ? planet.pType : "undefined"}
                  </p>
                  <p className="uppercase tracking-wider font-secondary text-base pt-1 pl-1 text-orbital-blueLight">
                    Size: {planet.pSize ? planet.pSize : "undefined"}
                  </p>
                  <p className="uppercase tracking-wider font-secondary text-base pt-1 pl-1 text-orbital-blueLight">
                    Core:{" "}
                    {planet.pCoreColor.hex
                      ? planet.pCoreColor.hex
                      : "undefined"}
                  </p>
                  <p className="uppercase tracking-wider font-secondary text-base pt-1 pl-1 text-orbital-blueLight">
                    Atmosphere:{" "}
                    {planet.pAtmosColor.hex
                      ? planet.pAtmosColor.hex
                      : "undefined"}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 z-10 flex flex-row gap-2 w-full">
            <div className="border-blue-border bg-[#496EEF] bg-opacity-10 border-2 p-4 w-1/2">
              <h2 className="uppercase tracking-wider font-primary text-base pt-1 pl-1 text-orbital-blueLight">
                Total Planets Found
              </h2>
              <h2 className="uppercase tracking-wider font-secondary text-3xl pt-1 pl-1 text-orbital-blue">
                {PlanetCount}
              </h2>
            </div>
            <div className="border-blue-border bg-[#496EEF] bg-opacity-10 border-2 p-4 w-1/2">
              <h2 className="uppercase tracking-wider font-secondary text-xl pt-1 pl-1 text-orbital-blueLight">
                {gasGiant} Gas Giant
              </h2>
              <h2 className="uppercase tracking-wider font-secondary text-xl pt-1 pl-1 text-orbital-blueLight">
                {neptuneLike} Neptune-like
              </h2>
              <h2 className="uppercase tracking-wider font-secondary text-xl pt-1 pl-1 text-orbital-blueLight">
                {superEarth} Super Earth
              </h2>
              <h2 className="uppercase tracking-wider font-secondary text-xl pt-1 pl-1 text-orbital-blueLight">
                {terrestrial} Terrestrial
              </h2>
            </div>
          </div>
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

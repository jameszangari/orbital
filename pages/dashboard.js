import React, { Suspense, useRef, useState } from "react";
import useSWR from "swr";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { LayerMaterial, Base, Depth, Fresnel, Texture, Noise } from "lamina";
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

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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
  console.log(AllPlanets);

  let recentPlanet = [];
  if (data) {
    Object.keys(data).forEach((key) => {
      recentPlanet.push(data[key].slice(-1)[0]);
    });
  }

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
          <LayerMaterial>
            <Base
              color={recentPlanet[0].pCoreColor.hex}
              value={recentPlanet[0].pCoreColor.hex}
              alpha={1}
              mode="normal"
            />
            <Texture
              map={useTexture(recentPlanet[0].pCoreTexture)}
              alpha={0.65}
            />
            <Texture
              map={useTexture(recentPlanet[0].pCloudTexture)}
              alpha={recentPlanet[0].pCloudAlpha}
              attachObject={Noise}
            />
            <Noise
              colorA={recentPlanet[0].pAtmosColor.hex}
              colorB="#000000"
              alpha={0.5}
              mode="darken"
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
      <h1 className="absolute z-10 pt-24 pb-8 text-3xl w-full text-center">
        Mission Control Center
      </h1>
      {recentPlanet && (
        <>
          <div className="absolute right-0 z-10 border p-4">
            <h2>Planet Info</h2>
            {recentPlanet.map((planet, i) => {
              return (
                <div key={i}>
                  <p>Type: {planet.pType ? planet.pType : "undefined"}</p>
                  <p>Size: {planet.pSize ? planet.pSize : "undefined"}</p>
                  <p>
                    Core:{" "}
                    {planet.pCoreColor.hex
                      ? planet.pCoreColor.hex
                      : "undefined"}
                  </p>
                  <p>
                    Atmosphere:{" "}
                    {planet.pAtmosColor.hex
                      ? planet.pAtmosColor.hex
                      : "undefined"}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 z-10 flex flex-row">
            <div className="border p-4">
              <h2>Total Planets Found</h2>
              <h2>{PlanetCount}</h2>
            </div>
            <div className="border p-4">
              <h2>{gasGiant} Gas Giant</h2>
              <h2>{neptuneLike} Neptune-like</h2>
              <h2>{superEarth} Super Earth</h2>
              <h2>{terrestrial} Terrestrial</h2>
            </div>
            {/* {AllPlanets.map((planet, i) => {
              return (
                <div key={i}>
                  <p>{gasGiant ? "yo" : "nah"}</p>
                </div>
              );
            })} */}
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

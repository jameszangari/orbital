import Head from "next/head";
import useSWR from "swr";
import React, { Suspense } from "react";
import { OrbitControls, Stars, Stats } from "@react-three/drei";
import Planet from "../components/Planet";
import Sun from "../components/Sun";
import Background from "../components/Background";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei"; // TODO: disable at some point
import { server } from "../lib/server";
import { trickle } from "nprogress";

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
function Observe() {
  // @link https://swr.vercel.app/docs/revalidation
  const { data, error } = useSWR(API_URL, fetcher, { refreshInterval: 60 });

  if (error) {
    return (
      <div className="z-50 h-screen w-full grid place-items-center">
        <div className="absolute z-50 grid place-items-center">
          <h3 className="text-xl font-secondary uppercase p-8">
            Failed to load.
          </h3>
          <Background color={"#496EEF"} border={"blue-bg"} />
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="z-50 h-screen w-full grid place-items-center">
        <div className="absolute z-50 grid place-items-center">
          <h3 className="text-xl font-secondary uppercase p-8">Loading...</h3>
          <Background color={"#496EEF"} border={"blue-bg"} />
        </div>
      </div>
    );
  }

  const planets = data?.posts;

  // Set max limit to 30, add x and z radius
  let AllPlanets = [];
  if (planets) {
    planets.slice(-50).forEach((planet, i) => {
      (planet.xRadius = (i + 6) * 12),
        (planet.zRadius = (i + 6) * 8),
        AllPlanets.push(planet);
    });
  }
  console.log(AllPlanets);

  if (error) {
    console.log("Error:");
    console.log(error);
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
  return (
    <>
      <Head>
        <title>Orbital | Observe</title>
      </Head>
      <div>
        <div className="mx-auto">
          <Canvas
            dpr={window.devicePixelRatio}
            // dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
            camera={{
              fov: 50,
              position: [200, 100, -300],
            }}
            style={{ height: "100vh" }}
            shadows
          >
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <Suspense fallback={null}>
              {/* <Stars fade={true} /> */}
              <Stars
                radius={200}
                depth={50}
                count={5000}
                factor={8}
                saturation={10}
                // fade
                speed={3}
              />
              <ambientLight intensity={0.5} />
              <pointLight position={[0, 0, 0]} />
              <Sun />
              <Stats />
              {AllPlanets
                ? AllPlanets.map((planet, i) => {
                    {
                      console.log(planet);
                    }
                    return (
                      <Planet
                        post={planet}
                        zRadius={planet.zRadius / 1.5}
                        xRadius={planet.zRadius / 1.5}
                        key={i}
                      />
                    );
                  })
                : null}
              <OrbitControls enableDamping />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default Observe;

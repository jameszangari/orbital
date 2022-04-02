import Head from "next/head";
import useSWR from "swr";
import React, { Suspense } from "react";
import { TrackballControls, Stars } from "@react-three/drei";
import Planet from "../components/Planet";
import Sun from "../components/Sun";
import Background from "../components/Background";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";

const API_URL = "/api/posts";

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  let planets = [];
  json.message.forEach((row, i) => {
    (row.xRadius = (i + 3) * 12),
      (row.zRadius = (i + 3) * 8),
      planets.push(row);
  });
  return {
    posts: planets,
  };
}
function Observe() {
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

  const posts = data?.posts;

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
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
            camera={{ fov: 25, position: [200, 100, 0] }}
            style={{ height: "100vh" }}
          >
            {/* <Stats /> */}
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <Suspense fallback={null}>
              <Stars fade={false} />
              <ambientLight intensity={1} />
              <Sun />
              {posts
                ? posts.map((planet, i) => {
                    {
                      console.log(planet);
                    }
                    return (
                      <Planet
                        post={planet}
                        zRadius={planet.zRadius}
                        xRadius={planet.zRadius}
                        key={i}
                      />
                    );
                  })
                : null}
              <TrackballControls />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default Observe;

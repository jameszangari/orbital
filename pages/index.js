import Head from "next/head";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { TrackballControls, Stars } from "@react-three/drei";
import Planet from "../components/Planet";
import Sun from "../components/Sun";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Orbital | Observe</title>
      </Head>
      <div>
        {posts.length === 0 ? (
          <h2 className="max-w-3xl mx-auto px-2 pt-4">No planets added yet</h2>
        ) : (
          <div className="mx-auto">
            <Canvas
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: false }}
              camera={{ fov: 50, position: [0, 0, 50] }}
              style={{ height: "100vh" }}
            >
              <Stats />
              <Suspense fallback={null}>
                <Stars />
                {/* TODO figure out lighting */}
                <ambientLight intensity={1} />
                <pointLight position={[100, 100, 100]} />
                <Sun />
                {posts.map((post, i) => (
                  <Planet post={post} key={i} />
                ))}
                {/* <OrbitControls enableZoom={false} /> */}
                <TrackballControls />
              </Suspense>
            </Canvas>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  // TODO figure out way to refresh this request every 'x' seconds
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
  // extract the data
  let data = await response.json();

  return {
    props: {
      posts: data["message"],
    },
  };
}

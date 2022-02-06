import Head from "next/head";
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Nav from "../components/Nav";
import Planet from "../components/Planet";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Orbital | Observe</title>
      </Head>

      <Nav />

      <main>
        {posts.length === 0 ? (
          <h2 className="max-w-3xl mx-auto px-2 pt-4">No planets added yet</h2>
        ) : (
          <>
            <div style={{ width: "100vw", height: "100vh" }}>
              <Canvas
                camera={{
                  fov: 35,
                  near: 1,
                  far: 1000,
                  position: [50, 0, 0],
                }}
                setPixelRatio={2160}
                // className="js-canvas"
              >
                <ambientLight intensity={1} />
                <pointLight position={[100, 100, 100]} />
                {/* <Sun /> */}
                {posts.map((post, i) => (
                  <Planet post={post} key={i} />
                ))}
                <OrbitControls />
              </Canvas>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
  // extract the data
  let data = await response.json();

  return {
    props: {
      posts: data["message"],
    },
  };
}

import Head from "next/head";
import { useRef, useState } from "react";
import Nav from "../components/Nav";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Planet from "../components/Planet";
// import Sun from "../components/Sun";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />

      <main>
        {/* <div className="max-w-3xl my-5 mx-auto p-3"> */}
        {posts.length === 0 ? (
          <h2 className="max-w-3xl mx-auto px-2 pt-4">No planets added yet</h2>
        ) : (
          <>
            <Canvas
              // figure out how to center camera
              camera={{
                fov: 100,
                near: 1,
                far: 1000,
                position: [0, 0, 50],
              }}
              // camera={{ fov: 90, near: 1, far: 1000, position: [0, 0, 10] }}
              style={{ height: "100vh", width: "100vw" }}
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

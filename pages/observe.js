import Head from "next/head";
import useSWR from "swr";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { TrackballControls, Stars } from "@react-three/drei";
import Planet from "../components/Planet";
import Sun from "../components/Sun";

// // TODO figure out dev/prod api url
// let dev = process.env.NODE_ENV !== "production";
// let DEV_URL = process.env.DEV_URL;
// let PROD_URL = process.env.PROD_URL;
// const API_URL = `${dev ? DEV_URL : PROD_URL}/api/posts`;
const API_URL = "/api/posts";

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return {
    posts: json["message"],
  };
}
function Observe() {
  // Allows for hot reload of planets
  const { data, error } = useSWR(API_URL, fetcher);
  const posts = data?.posts;
  console.log(posts);
  if (!error) {
    console.log("No Error:");
    console.log(!error);
  }
  if (error) {
    console.log("Error:");
    console.log(error);
  }
  if (!data) {
    console.log("No Data:");
    console.log(!data);
  }
  if (data) {
    console.log("Data:");
    console.log(data);
  }

  const random = (a, b) => a + Math.random() * b;
  const radius = (length) => {
    for (let index = 0; index < length; index++) {
      return index + 1.5 * 24;
    }
  };
  const speed = (length) => {
    for (let index = 0; index < length; index++) {
      return random(0.1, 0.6);
    }
  };
  const offset = (length) => {
    for (let index = 0; index < length; index++) {
      return random(0, Math.PI * 2);
    }
  };

  let renderPlanets;
  if (posts) {
    let length = posts.length;
    renderPlanets = posts.map((post, i) => (
      <Planet
        post={post}
        key={i}
        xRadius={radius(length)}
        zRadius={radius(length)}
        speed={speed(length)}
        offset={offset(length)}
      />
    ));
  }
  console.log(renderPlanets);
  return (
    <>
      <Head>
        <title>Orbital | Observe</title>
      </Head>
      <div>
        {/* {posts.length === 0 ? (
          <h2 className="mx-auto px-2 pt-4 font-primary">
            No planets added yet
          </h2>
        ) : ( */}
        <div className="mx-auto">
          <Canvas
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
            camera={{ fov: 50, position: [100, 50, 0] }}
            style={{ height: "100vh" }}
          >
            {/* <Stats /> */}
            <Suspense fallback={null}>
              <Stars />
              <ambientLight intensity={1} />
              {/* <pointLight position={[0, 0, 0]} shadow intensity={1} /> */}
              <Sun />
              {renderPlanets}
              {/* {posts.map((post, i) => (
                <Planet
                  post={post}
                  key={i}
                  xRadius={radius() * 24}
                  zRadius={radius() * 16}
                  speed={speed()}
                  offset={offset()}
                />
              ))} */}
              {/* <OrbitControls enableZoom={false} /> */}
              <TrackballControls />
            </Suspense>
          </Canvas>
        </div>
        {/* )} */}
      </div>
    </>
  );
}

// export async function getStaticProps(ctx) {
//   // get the current environment
//   let dev = process.env.NODE_ENV !== "production";
//   let { DEV_URL, PROD_URL } = process.env;

//   // request posts from api
//   // TODO figure out way to refresh this request every 'x' seconds
//   const res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
//   // extract the data
//   const data = await res.json();

//   return {
//     props: {
//       posts: data["message"],
//     },
//     revalidate: 10, // In seconds
//   };
// }

export default Observe;

import Head from "next/head";
import Nav from "../components/Nav";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PostCard from "../components/PostCard";
import Planet from "../components/Planet";

export default function Home({ posts }) {
  // Hook into index and create threejs canvas for planets
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
          <h2>No planets added yet</h2>
        ) : (
          <>
            <Canvas
              camera={{ fov: 90, near: 1, far: 1000, position: [0, 0, 5] }}
              className="js-canvas"
            >
              <ambientLight intensity={1} />
              <pointLight position={[100, 100, 100]} />
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

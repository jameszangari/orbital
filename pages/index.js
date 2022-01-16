import Head from "next/head";
import Nav from "../components/Nav";
import PostCard from "../components/PostCard";
import Planet from "../components/Planet";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />

      <main>
        <div className="max-w-3xl my-5 mx-auto p-3">
          {posts.length === 0 ? (
            <h2>No planets added yet</h2>
          ) : (
            <ul>
              {posts.map((post, i) => (
                // <PostCard post={post} key={i} />
                <Planet post={post} key={i} />
              ))}
            </ul>
          )}
        </div>
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

import Head from "next/head";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Orbital | Observe</title>
      </Head>

      <main>
        {posts
          ? posts.map((planet, i) => {
              {
                console.log(planet);
              }
              return (
                <div key={i} className="py-4 max-w-3xl m-auto">
                  <p className="flex flex-row w-full">
                    <span className="w-1/2">ID: </span>
                    <span className="w-1/2 text-right">{planet._id}</span>
                  </p>
                  <p className="flex flex-row w-full">
                    <span className="w-1/2">Created: </span>
                    <span className="w-1/2 text-right">{planet.createdAt}</span>
                  </p>
                  <p className="flex flex-row w-full">
                    <span className="w-1/2">type: </span>
                    <span className="w-1/2 text-right">{planet.pType}</span>
                  </p>
                  <p className="flex flex-row w-full">
                    <span className="w-1/2">size: </span>
                    <span className="w-1/2 text-right">{planet.pSize}</span>
                  </p>
                  <p className="flex flex-row w-full">
                    <span className="w-1/2">core: </span>
                    <span className="w-1/2 text-right">
                      {planet.pCoreColor.hex}
                    </span>
                  </p>
                  <p className="flex flex-row w-full">
                    <span className="w-1/2">atmos: </span>
                    <span className="w-1/2 text-right">
                      {planet.pAtmosColor.hex}
                    </span>
                  </p>
                  <p className="flex flex-row w-full">
                    <span className="w-1/2">core texture: </span>
                    <span className="w-1/2 text-right">
                      {planet.pCoreTexture}
                    </span>
                  </p>
                  <p className="flex flex-row w-full">
                    <span className="w-1/2">cloud texture: </span>
                    <span className="w-1/2 text-right">
                      {planet.pCloudTexture}
                    </span>
                  </p>
                  <p className="flex flex-row w-full">
                    <span className="w-1/2">cloud alpha: </span>
                    <span className="w-1/2 text-right">
                      {planet.pCloudAlpha}
                    </span>
                  </p>
                </div>
              );
            })
          : null}
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

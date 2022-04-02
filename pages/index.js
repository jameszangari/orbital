import Head from "next/head";
import React from "react";
import Image from "next/image";
import Link from "../components/Link";
import Icon from "../components/Icon";

export default function Index({ posts }) {
  const description =
    "Orbital is an interactive art exhibit where visitors can create a custom planet and add it to our collaborative solar system and see it projected in real-time. Through the individual contributions of our visitors, our solar system will be filled with unique and vibrant planets for all to see.";
  return (
    <>
      <Head>
        <title>Orbital | Welcome</title>
      </Head>
      {/* TODO password protect this page */}
      <div className="py-4 max-w-3xl m-auto grid place-items-center h-screen">
        <div className="flex flex-col justify-center">
          <Icon />
          <h1 className="text-center pb-8 pt-24 text-3xl">Welcome!</h1>
          <p>{description}</p>
          <Link
            variant={"link"}
            url={"/create"}
            label={"Create Your Planet!"}
            className={"mt-8"}
          />
        </div>
      </div>
      {/* {posts
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
                  <span className="w-1/2 text-right">{planet.pCloudAlpha}</span>
                </p>
              </div>
            );
          })
        : null} */}
    </>
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

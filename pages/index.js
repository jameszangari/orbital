import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "../components/Link";

export default function Index({ posts }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Orbital | Welcome</title>
      </Head>
      {/* TODO password protect this page */}
      <h1 className="text-center pt-24 pb-8 text-3xl max-w-3xl m-auto">
        Welcome to Orbital!
      </h1>
      <div className="py-4 max-w-3xl m-auto">
        <p>
          Enim magna amet cillum exercitation nulla aliqua ullamco minim duis.
          Reprehenderit cupidatat occaecat do sint ad dolor esse consequat est
          nulla. Aliqua nostrud aliqua incididunt. Aliqua dolor ad anim non
          irure laborum enim irure id quis elit. Dolor duis consequat esse elit.
          Reprehenderit reprehenderit eu ad sit tempor. Cupidatat pariatur duis
          occaecat sint aliqua laboris elit aliqua pariatur labore consequat
          incididunt. Consequat aliqua elit adipisicing tempor in consectetur
          minim pariatur magna est nisi consequat enim irure. Eiusmod incididunt
          pariatur dolor quis ea duis duis sint do commodo veniam id in tempor
          aliquip. Elit laborum qui duis adipisicing aliqua anim consectetur.
        </p>
        <Link
          variant={"link"}
          url={"/create"}
          label={"Create Your Planet!"}
          className={"mt-8"}
        />
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

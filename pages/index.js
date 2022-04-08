import Head from "next/head";
import React from "react";
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
    </>
  );
}

import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "../components/Button";
import { server } from "../lib/server";

export default function Manage({ posts }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const deletePost = async (postId) => {
    setDeleting(true);
    try {
      // Delete post
      await fetch(`${server}/api/posts`, {
        method: "DELETE",
        body: postId,
      });
      // reset the deleting state
      setDeleting(false);
      // reload the page
      return router.push(router.asPath);
    } catch (error) {
      // stop deleting state
      return setDeleting(false);
    }
  };
  return (
    <>
      <Head>
        <title>Orbital | Manage</title>
      </Head>
      {/* TODO password protect this page */}
      <h1 className="text-center pt-24 pb-8 text-3xl max-w-3xl m-auto">
        Admin Panel
      </h1>
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
                  <span className="w-1/2 text-right">{planet.pCloudAlpha}</span>
                </p>
                <Button
                  label={deleting ? "Deleting" : "Delete"}
                  type={"button"}
                  className={"mt-4"}
                  click={() => deletePost(planet["_id"])}
                />
              </div>
            );
          })
        : null}
    </>
  );
}
export async function getServerSideProps(ctx) {
  let response = await fetch(`${server}/api/posts`);
  let data = await response.json();

  return {
    props: {
      posts: data["message"],
    },
  };
}

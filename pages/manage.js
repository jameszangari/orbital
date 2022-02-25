import Head from "next/head";
import useSWR from "swr";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "../components/Button";

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
function Manage() {
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

  let renderObjects;
  if (posts) {
    renderObjects = posts.map((post, i) => (
      <div key={i} className="py-4 max-w-3xl m-auto">
        <p>ID: {post._id}</p>
        <p>Created: {post.createdAt}</p>
        <p>Type: {post.pType}</p>
        <p>Size: {post.pSize}</p>
        <p>Core: {post.pCore}</p>
        <Button
          label={deleting ? "Deleting" : "Delete"}
          type={"button"}
          click={() => deletePost(post["_id"])}
        />
      </div>
    ));
  }

  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  // Delete post
  const deletePost = async (postId) => {
    //change deleting state
    setDeleting(true);

    try {
      // Delete post
      await fetch("/api/posts", {
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
      <h1 className="text-center pt-8 pb-4 text-3xl max-w-3xl m-auto">
        Admin Panel
      </h1>
      {renderObjects}
    </>
  );
}

export default Manage;

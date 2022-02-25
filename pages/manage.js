import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../components/Button";

export default function Manage({ posts }) {
  console.log(posts);
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
      {/* TODO password protect this page */}
      <h1 className="text-center pt-8 pb-4 text-3xl max-w-3xl m-auto">
        Admin Panel
      </h1>
      {posts.map((post, i) => (
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
      ))}
    </>
  );
}

export async function getStaticProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  // TODO figure out way to refresh this request every 'x' seconds
  const res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
  // extract the data
  const data = await res.json();

  return {
    props: {
      posts: data["message"],
    },
    revalidate: 10, // In seconds
  };
}

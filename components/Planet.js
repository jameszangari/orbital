export default function Planet({ post }) {
  // TODO: Add three.js
  return (
    <>
      <li className="planet flex flex-col mb-16">
        <h3>Name: {post.title}</h3>
        {post.type === "Gas Giant" && (
          <div className={"bg-red-500"}>{post.type}</div>
        )}
        {post.type === "Neptune-like" && (
          <div className={"bg-blue-500"}>{post.type}</div>
        )}
        {post.type === "Super-Earth" && (
          <div className={"bg-green-500"}>{post.type}</div>
        )}
        {post.type === "Terrestrial" && (
          <div className={"bg-amber-500"}>{post.type}</div>
        )}
        {post.core === "Metallic" && (
          <div className={"bg-gray-500"}>{post.core}</div>
        )}
        {post.core === "Rocky" && (
          <div className={"bg-yellow-900"}>{post.core}</div>
        )}
        <small>Created: {new Date(post.createdAt).toLocaleDateString()}</small>
      </li>
    </>
  );
}

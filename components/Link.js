import Link from "next/dist/client/link";

export default function Button({ label, url }) {
  return (
    <Link href={url} passHref>
      <a className="bg-white text-black border border-black py-2 px-4 font-semibold block hover:bg-black hover:transition-all hover:text-white">
        {label}
      </a>
    </Link>
  );
}

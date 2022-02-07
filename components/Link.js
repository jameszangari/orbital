import Link from "next/dist/client/link";

export default function Button({ label, url }) {
  return (
    <Link href={url} passHref>
      <a className="text-lg bg-levaElevation3 text-levaHighlight2 py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-levaElevation2 hover:text-white rounded-lg w-full">
        {label}
      </a>
    </Link>
  );
}

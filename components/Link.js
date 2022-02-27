import Link from "next/dist/client/link";

export default function Button({ label, url }) {
  return (
    <Link href={url} passHref>
      <a className="text-lg bg-oBlue bg-opacity-50 border-oBlue border-2 text-levaHighlight3 py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oPurple hover:bg-opacity-50 hover:border-oPurple w-full">
        {label}
      </a>
    </Link>
  );
}

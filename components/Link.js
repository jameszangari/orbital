import Link from "next/dist/client/link";

export default function Button({ label, click, variant, className }) {
  return (
    <>
      {variant === "button" && (
        <a
          className={
            "text-sm sm:text-md uppercase bg-oPurple bg-opacity-25 border-pink-border border-2 text-levaHighlight3 py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oPurple hover:bg-opacity-50 hover:border-oPurple w-full cursor-pointer text-center " +
            className
          }
          onClick={click || null}
          target="_blank"
        >
          {label}
        </a>
      )}
      {variant === "link" && (
        <Link href={url || null} passHref>
          <a
            className={
              "text-sm sm:text-md uppercase bg-oPurple bg-opacity-25 border-pink-border border-2 text-levaHighlight3 py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oPurple hover:bg-opacity-50 hover:border-oPurple w-full " +
              className
            }
            onClick={click || null}
            target="_blank"
          >
            {label}
          </a>
        </Link>
      )}
    </>
  );
}

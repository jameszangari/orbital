export default function Button({ label, type, className, click }) {
  return (
    <button
      className={
        "text-lg bg-oBlue bg-opacity-50 border-oBlue border-2 text-levaHighlight3 py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oPurple hover:bg-opacity-50 hover:border-oPurple w-full " +
        className
      }
      type={type}
      onClick={click}
    >
      {label}
    </button>
  );
}

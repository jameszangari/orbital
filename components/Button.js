export default function Button({ label, type, className, click }) {
  return (
    <button
      className={
        "text-sm sm:text-md bg-purple-bg bg-opacity-25 border-oPurple border-2 text-levaHighlight3 py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oPurple hover:bg-opacity-50 hover:border-oPurple cursor-pointer text-center uppercase " +
        className
      }
      type={type}
      onClick={click}
    >
      {label}
    </button>
  );
}

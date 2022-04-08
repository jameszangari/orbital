export default function Button({ label, type, className, click }) {
  return (
    <button
      className={
        "text-sm sm:text-md uppercase bg-purple-bg bg-opacity-25 border-pink-border border-2 text-text py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oPurple hover:bg-opacity-25 hover:border-oPurple w-full cursor-pointer text-center " +
        className
      }
      type={type}
      onClick={click}
    >
      {label}
    </button>
  );
}

export default function Button({ label, type, className, click }) {
  return (
    <button
      className={
        "text-sm sm:text-md uppercase bg-blue-bg bg-opacity-25 border-blue-border border-2 text-text py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-oBlue hover:bg-opacity-50 hover:border-oBlue w-full cursor-pointer text-center " +
        className
      }
      type={type}
      onClick={click}
    >
      {label}
    </button>
  );
}

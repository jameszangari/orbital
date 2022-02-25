export default function Button({ label, type, click }) {
  return (
    <button
      className="text-lg bg-levaElevation1 text-levaHighlight2 py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-levaElevation2 hover:text-white w-full"
      type={type}
      onClick={click}
    >
      {label}
    </button>
  );
}

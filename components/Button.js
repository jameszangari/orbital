export default function Button({ label, type, click }) {
  return (
    <button
      className="bg-levaElevation2 text-levaHighlight2 py-2 px-4 font-secondary block hover:transition-cubicCustom hover:bg-levaElevation1 hover:text-white rounded-lg w-full"
      type={type}
      onClick={click}
    >
      {label}
    </button>
  );
}

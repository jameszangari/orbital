export default function Button({ label, type }) {
  return (
    <button
      className="bg-white text-black border border-black py-2 px-4 font-semibold block hover:bg-black hover:transition-all hover:text-white"
      type={type}
    >
      {label}
    </button>
  );
}

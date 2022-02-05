import Link from "./Link";

export default function Nav() {
  return (
    <nav className="w-full border-b border-gray-300 p-2 max-w-3xl m-auto">
      <ul className="flex justify-evenly items-center w-full list-none">
        <li className="block">
          <Link label="Create" url="/create" />
        </li>
        <li className="block m-auto items-center">
          <h1 className="text-xl">Orbital</h1>
        </li>
        <li className="block">
          <Link label="Observe" url="/" />
        </li>
      </ul>
    </nav>
  );
}

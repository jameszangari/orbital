import Link from "./Link";

export default function Nav() {
  return (
    <nav className="w-full bg-levaElevation1 rounded-b-lg p-2 m-auto">
      <ul className="flex justify-evenly items-center w-full list-none">
        <li className="block">
          <Link label="Create" url="/create" />
        </li>
        <li className="block m-auto items-center">
          <h1 className="text-xl uppercase">Orbital</h1>
        </li>
        <li className="block">
          <Link label="Observe" url="/observe" />
        </li>
      </ul>
    </nav>
  );
}

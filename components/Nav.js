import Link from "./Link";

export default function Nav() {
  return (
    <nav className="absolute top-0 w-full p-2 m-auto z-50">
      <ul className="flex w-full list-none">
        <li className="block mr-4">
          <Link label="Create" url="/" />
        </li>
        {/* <li className="block m-auto items-center">
          <h1 className="text-xl uppercase">Orbital</h1>
        </li> */}
        <li className="block">
          <Link label="Observe" url="/observe" />
        </li>
      </ul>
    </nav>
  );
}

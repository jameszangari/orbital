import Link from "./Link";

export default function Nav() {
  return (
    <nav className="absolute top-0 p-2 m-auto z-50">
      <ul className="flex w-full list-none">
        <li className="block mr-2">
          <Link label="Create" url="/" />
        </li>
        <li className="block mr-2">
          <Link label="Observe" url="/observe" />
        </li>
        {/* <li className="block">
          <Link label="Manage" url="/manage" />
        </li> */}
      </ul>
    </nav>
  );
}

import Link from "./Link";

export default function Nav() {
  return (
    <nav className="w-full border-b border-gray-300">
      <ul className="flex justify-around list-none">
        <li className="flex items-center">
          <Link label="Create" url="/create" />
        </li>
        <li className="flex items-center">
          <h1 className="text-xl">take pART</h1>
        </li>
        <li className="flex items-center">
          <Link label="Observe" url="/" />
        </li>
      </ul>
    </nav>
  );
}

import Link from "next/link";

import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link href="/create">
            <a className={styles.button}>Create</a>
          </Link>
        </li>
        <li>
          <b>take pART</b>
        </li>
        <li className={styles.item}>
          <Link href="/">
            <a className={styles.button}>Observe</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

import Head from "next/head";
import Logo from "./Logo";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Orbital | Coming Soon</title>
      </Head>
      <main className="h-screen w-screen flex flex-col justify-center items-center p-8">
        <Logo className="w-96 max-w-full" />
      </main>
    </div>
  );
}

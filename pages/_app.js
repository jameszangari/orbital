import "../styles/globals.css";
import Head from "next/head";

const seo = {
  title: "Orbital: UXID Senior Project",
  url: "https://orbital-webapp.vercel.app/",
  image: "/orbital-cover.jpg",
  description:
    "Orbital is a covid-safe interactive art installation allowing for the collaboration of visitors to manipulate and create a one-of-a-kind experience in real time.",
  author: "The Orbital Team",
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta property="og:title" content={seo.title} />
        <meta property="description" content={seo.description} />
        <meta property="og:description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:image" content={seo.image} />
        <meta name="msapplication-TileColor" content="#000" />
        <meta name="theme-color" content="#000" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/meta/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/meta/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/meta/favicon-16x16.png"
        />
        <link rel="manifest" href="/meta/site.webmanifest" />
        <link rel="mask-icon" href="/meta/safari-pinned-tab.svg" color="#000" />
        <link rel="icon" href={seo.image} />
      </Head>
      <main className="overflow-x-hidden">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;

import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import A2HS from "./../components/A2HS";
import NProgress from "nprogress";
import "../public/nprogress.css";
import "../styles/globals.css";
import "../public/fonts/fonts.css";

const title = "Orbital";
const url = "https://orbitalteam.app/";
const image = "/orbital-icon.png";
const description =
  "Orbital is an interactive art exhibit where visitors can create a custom planet and add it to our collaborative solar system and see it projected in real-time. Through the individual contributions of our visitors, our solar system will be filled with unique and vibrant planets for all to see.";
const author = "The Orbital Team";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // PWA
    var customServiceWorkerUrl = "/sw.js";
    navigator.serviceWorker
      .register(customServiceWorkerUrl, { scope: "." })
      .then(
        function (registration) {
          // Registration was successful
          console.log(
            "CustomServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          // registration failed
          console.log("CustomServiceWorker registration failed: ", err);
        }
      );

    // NProgress
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        {/* Recommended Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="language" content="english" />
        <meta httpEquiv="content-type" content="text/html" />
        <meta name="author" content={author} />
        <meta name="designer" content={author} />
        <meta name="publisher" content={author} />
        {/* Search Engine Optimization Meta Tags */}
        <meta name="description" content={description} />
        <meta name="keywords" content="" />
        <meta name="robots" content="index,follow" />
        <meta name="distribution" content="web" />
        {/* Facebook Open Graph meta tags
          documentation: https://developers.facebook.com/docs/sharing/opengraph */}
        <meta name="og:title" content={title} />
        <meta name="og:type" content="site" />
        <meta name="og:url" content={url} />
        <meta name="og:image" content={image} />
        <meta name="og:site_name" content={title} />
        <meta name="og:description" content={description} />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="32x32" href="/favicon-32x32.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" color="#000000" href="/safari-pinned-tab.svg" />
        <link rel="apple-touch-startup-image" href="/orbital-icon.png" />
        {/* Meta Tags for HTML pages on Mobile */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta content="width=device-width, height=device-height, minimum-scale=1, initial-scale=1.0, user-scalable=no, user-scalable=0" />
        <meta name="theme-color" content="#000" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* Twitter Summary card
          documentation: https://dev.twitter.com/cards/getting-started
          Be sure validate your Twitter card markup on the documentation site. */}
        <meta name="twitter:card" content="summary" />
        <link
          rel="preload"
          href="/api/posts"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>
      <A2HS />
      {/* Figure out custom popup to install web app, add window close option to cookies */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

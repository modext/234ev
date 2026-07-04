import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import Head from "next/head";
import NavBar from "../components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>234ev — Find charging spots, shops & tips</title>
        <meta
          name="description"
          content="Find EV charging and battery-swap spots, trusted maintenance shops, and practical tips for EV owners in Nigeria."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

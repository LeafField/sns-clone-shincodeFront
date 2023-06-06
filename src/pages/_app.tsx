import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SNS Udemy</title>
        <meta name="description" content="UdemyのSNSアプリ作成講座です" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </>
  );
}

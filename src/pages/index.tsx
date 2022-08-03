import type { NextPage } from "next";
import Dashboard from "./dashboard";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CukQA</title>
      </Head>
      <Dashboard />
    </>

  );
};

export default Home;

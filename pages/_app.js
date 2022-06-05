import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/Layout";
import client from "../apollo-client";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <Toaster />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;

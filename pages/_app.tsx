import React from "react";
import "@/styles/globals.css";
import { GlobalContextProvider } from '@/stores/globalStore';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout ? (Component as any).Layout : React.Fragment;

  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  )
}

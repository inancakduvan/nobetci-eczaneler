import React, { useEffect } from "react";
import GoogleAnalytics from "@bradgarropy/next-google-analytics";

import { GlobalContextProvider } from '@/stores/globalStore';
import type { AppProps } from "next/app";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout ? (Component as any).Layout : React.Fragment;

  useEffect(() => {
    const resizeOps = () => {
      document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
    };
  
    resizeOps();
    window.addEventListener("resize", resizeOps);
  }, [])

  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <GoogleAnalytics measurementId="G-LJ3G0FWS7N" />
    </GlobalContextProvider>
  )
}

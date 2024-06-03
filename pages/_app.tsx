import React, { useEffect } from "react";
import "@/styles/globals.css";
import { GlobalContextProvider } from '@/stores/globalStore';
import type { AppProps } from "next/app";

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
    </GlobalContextProvider>
  )
}

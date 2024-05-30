import React from "react";
import { GlobalContextProvider } from '@/stores/globalStore';

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const MainLayout: React.FC <{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GlobalContextProvider>
      <div className={`${inter.className}`}>
        {children}
      </div>
    </GlobalContextProvider>
  )
}

export default MainLayout;
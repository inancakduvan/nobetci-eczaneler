import React from "react";
import { GlobalContextProvider } from '@/stores/globalStore';

import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

const MainLayout: React.FC <{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GlobalContextProvider>
      <div className={`${urbanist.className}`}>
        {children}
      </div>
    </GlobalContextProvider>
  )
}

export default MainLayout;
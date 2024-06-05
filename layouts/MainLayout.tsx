import React from "react";

import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

const MainLayout: React.FC <{ children: React.ReactNode }> = ({ children }) => {
  return (
      <div className={`${urbanist.className}`}>
        {children}
      </div>
  )
}

export default MainLayout;
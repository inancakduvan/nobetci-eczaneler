import React from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const MainLayout: React.FC <{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={`${inter.className}`}>
      {children}
    </div>
  )
}

export default MainLayout;
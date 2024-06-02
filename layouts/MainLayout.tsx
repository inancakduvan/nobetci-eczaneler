import React, { useEffect } from "react";

import { Urbanist } from "next/font/google";
import { useGlobalContext } from "@/stores/globalStore";

import { constants } from "@/constants";

const urbanist = Urbanist({ subsets: ["latin"] });

const MainLayout: React.FC <{ children: React.ReactNode }> = ({ children }) => {
  const { CITIES_ENDPOINT } = constants;
  
  const { setCities } = useGlobalContext();

  useEffect(() => {
    fetch(CITIES_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        setCities(data);
      })
  }, [])

  return (
      <div className={`${urbanist.className}`}>
        <div className="-z-50 block fixed left-0 top-0 bg-gradient-greenToWhite225deg text-semantic-light w-full h-[400px]"></div>
        {children}
      </div>
  )
}

export default MainLayout;
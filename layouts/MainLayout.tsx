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
        {children}
      </div>
  )
}

export default MainLayout;
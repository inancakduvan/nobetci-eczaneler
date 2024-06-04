import React, { useEffect } from "react";

import { Urbanist } from "next/font/google";
import { constants } from "@/constants";
import { useRouter } from "next/router";

const urbanist = Urbanist({ subsets: ["latin"] });

const MainLayout: React.FC <{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const { SELECTED_CITY_KEY, SELECTED_DISTRICT_KEY } = constants; 

  useEffect(() => {
    if(window) {
      const _selectedCity = localStorage.getItem(SELECTED_CITY_KEY); 
      const _selectedDistrict = localStorage.getItem(SELECTED_DISTRICT_KEY); 

      console.log(_selectedCity, _selectedDistrict);

      // if (_selectedCity || _selectedDistrict) {
      //   router.push("/city");
      // }
    }
  }, [])

  return (
      <div className={`${urbanist.className}`}>
        {children}
      </div>
  )
}

export default MainLayout;
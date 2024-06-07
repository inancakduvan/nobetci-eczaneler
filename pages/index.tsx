import { StorageKeys } from "@/enums";
import Skeletton from "@/elements/Skeletton/Skeletton";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Pharmacies from "@/components/Pharmacies";

export default function Home()  {
  const router = useRouter();
  
  const { SELECTED_CITY_KEY, SELECTED_DISTRICT_KEY } = StorageKeys; 

  // useEffect(() => {
  //   if(window) {
  //     const _selectedCity = localStorage.getItem(SELECTED_CITY_KEY); 
  //     const _selectedDistrict = localStorage.getItem(SELECTED_DISTRICT_KEY); 

  //     if(!_selectedCity) {
  //       router.push("/city");
  //       return;
  //     }

  //     if(!_selectedDistrict) {
  //       router.push("/district/" + _selectedCity.toLowerCase());
  //       return;
  //     }

  //     router.push("/pharmacies/" + _selectedCity.toLowerCase() + "/" + _selectedDistrict.toLowerCase());
  //   }
  // }, [])

  return (
    <>
      <Pharmacies city="izmir" district="konak" />
    </>
  );
}

Home.Layout = MainLayout;
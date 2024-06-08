import { StorageKeys } from "@/enums";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PharmaciesList from "@/components/PharmaciesList";

export default function Home()  {
  const router = useRouter();
  
  const { SELECTED_CITY_KEY, SELECTED_DISTRICT_KEY } = StorageKeys; 

  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  useEffect(() => {
    if(window) {
      const _selectedCity = localStorage.getItem(SELECTED_CITY_KEY); 
      const _selectedDistrict = localStorage.getItem(SELECTED_DISTRICT_KEY); 

      if(!_selectedCity) {
        router.push("/city");
        return;
      }

      if(!_selectedDistrict) {
        router.push("/district/" + _selectedCity.toLocaleLowerCase('tr-TR'));
        return;
      }

      setCity(_selectedCity);
      setDistrict(_selectedDistrict);
    }
  }, [])

  return (
    <>
      {(city && district) && <PharmaciesList city={city.toLocaleLowerCase('tr-TR')} district={district.toLocaleLowerCase('tr-TR')} />}
    </>
  );
}

Home.Layout = MainLayout;
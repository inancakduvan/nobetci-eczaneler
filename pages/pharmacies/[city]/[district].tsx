import MainLayout from "@/layouts/MainLayout";
import { useGlobalContext } from "@/stores/globalStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { fetchPharmacies } from "@/utils/fetch";
import PharmaciesList, { TPharmaciesResponse } from "@/components/PharmaciesList";


export default function Pharmacies()  {
  const router = useRouter();

  const cityParamater = router.query.city?.toString();
  const districtParamater = router.query.district?.toString();

  const { selectedCity, selectedDistrict, pharmacies, setPharmacies } = useGlobalContext();

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if(cityParamater && districtParamater) {
      const _city = (selectedCity.toLocaleLowerCase('tr-TR') || cityParamater.toLocaleLowerCase('tr-TR'));
      const _district = (selectedDistrict.toLocaleLowerCase('tr-TR') || districtParamater.toLocaleLowerCase('tr-TR'));

      fetchPharmacies(_city, _district, 
        (response: TPharmaciesResponse) => {
          setPharmacies(response.data);
        },
        () => {
          setHasError(true);
        }
      );
    } else {
        setHasError(true);
    }
  }, [])

  if(!(cityParamater && districtParamater)) {
    return null;
  }

  return <PharmaciesList city={cityParamater} district={districtParamater} />;
}

Pharmacies.Layout = MainLayout;
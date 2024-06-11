import Skeletton from "@/elements/Skeletton/Skeletton";
import MainLayout from "@/layouts/MainLayout";
import { useGlobalContext } from "@/stores/globalStore";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/elements/Button";

import { IconArrowLeft } from "@tabler/icons-react";
import { fetchPharmacies } from "@/utils/fetch";
import PharmaciesList, { TPharmaciesResponse } from "@/components/PharmaciesList";


export default function Pharmacies()  {
  const { t } = useTranslation('common');
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
    return "";
  }

  return (
    <>
       <PharmaciesList city={cityParamater} district={districtParamater} />
    </>
  );
}

Pharmacies.Layout = MainLayout;
import Skeletton from "@/elements/Skeletton/Skeletton";
import MainLayout from "@/layouts/MainLayout";
import { TPharmacies, useGlobalContext } from "@/stores/globalStore";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/elements/Button";

import { IconArrowLeft } from "@tabler/icons-react";
import { fetchPharmacies } from "@/utils/fetch";

type TPharmaciesResponse = {
  success: boolean;
  result: TPharmacies[];
}

export default function Pharmacies()  {
  const { t } = useTranslation('common');
  const router = useRouter();

  const cityParamater = router.query.city?.toString();
  const districtParamater = router.query.district?.toString();

  const { selectedCity, selectedDistrict, pharmacies, setPharmacies } = useGlobalContext();

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if(cityParamater && districtParamater) {
      const _city = (selectedCity.toLowerCase() || cityParamater.toLowerCase());
      const _district = (selectedDistrict.toLowerCase() || districtParamater.toLowerCase());

      fetchPharmacies(_city, _district, 
        (data: TPharmaciesResponse) => {
          setPharmacies(data.result);
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
       {
        (pharmacies && pharmacies.length > 0) ? <>
        <div className="text-heading-large mb-2">{t("pharmaciesOnDuty")}</div>
        {
          pharmacies.map((pharmacy) => <div key={"pharmacy-" + pharmacy.name + pharmacy.loc} className="shadow border border-muted-700 bg-muted-500 p-3 border-solid mb-4 pointer" onClick={() => console.log(pharmacy)}>
            {pharmacy.name} <br/>
            {pharmacy.dist} <br/>
            {pharmacy.address} <br/>
            {pharmacy.phone} <br/>
            {pharmacy.loc} <br/>
          </div>)
        }
        </>
        :
        <>
        {
          hasError ?
          <div className="w-full h-fit-screen flex items-center justify-center bg-black/10">
            <div className="inline-flex flex-col px-large py-medium bg-white shadow-ultra-soft rounded">
              <div className="text-body-medium mb-medium">
                {t("errorMessage")}
              </div>

              <Button type="primary" Icon={IconArrowLeft} text={t("goBack")} onClick={() => router.push("/city")} />
            </div>
          </div>
          :
          <Skeletton />
        }
        </>
      }
    </>
  );
}

Pharmacies.Layout = MainLayout;
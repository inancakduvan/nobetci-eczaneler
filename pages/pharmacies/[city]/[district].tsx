import { EndPoints } from "@/enums";
import Skeletton from "@/elements/Skeletton/Skeletton";
import MainLayout from "@/layouts/MainLayout";
import { useGlobalContext } from "@/stores/globalStore";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/elements/Button";

export default function Pharmacies()  {
  const { t } = useTranslation('common');
  const router = useRouter();

  const cityParamater = router.query.city?.toString();
  const districtParamater = router.query.district?.toString();

  const { PHARMACIES_ENDPOINT } = EndPoints;

  const { cities, setCities, districts, setDistricts, selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict, pharmacies, setPharmacies } = useGlobalContext();

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if(cityParamater && districtParamater) {
        fetch(PHARMACIES_ENDPOINT + "?city=" + (selectedCity.toLowerCase() || cityParamater.toLowerCase()) + "&district=" + (selectedDistrict.toLowerCase() || districtParamater.toLowerCase()))
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setPharmacies(data.result);
            } else {
                setHasError(true);
            }
        })
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
        (pharmacies.length > 0) ? <>
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

              <Button type="primary" text={t("goBack")} onClick={() => router.push("/city")} />
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
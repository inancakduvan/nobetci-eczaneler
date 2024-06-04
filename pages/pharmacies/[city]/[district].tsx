import { constants } from "@/constants";
import MainLayout from "@/layouts/MainLayout";
import { useGlobalContext } from "@/stores/globalStore";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Pharmacies()  {
  const { t } = useTranslation('common');
  const router = useRouter();

  const cityParamater = router.query.city?.toString();
  const districtParamater = router.query.district?.toString();

  const { PHARMACIES_ENDPOINT } = constants;

  const { cities, setCities, districts, setDistricts, selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict, pharmacies, setPharmacies } = useGlobalContext();

  useEffect(() => {
    if(cityParamater && districtParamater) {
        fetch(PHARMACIES_ENDPOINT + "?city=" + (selectedCity.toLowerCase() || cityParamater.toLowerCase()) + "&district=" + (selectedDistrict.toLowerCase() || districtParamater.toLowerCase()))
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setPharmacies(data.result);
            } else {
                router.push("/city");
            }
        })
    } else {
        router.push("/city");
    }
  }, [])

  if(!(cityParamater && districtParamater)) {
    return "";
  }

  return (
    <>
       {
        (pharmacies.length > 0) && <>
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
      }
    </>
  );
}

Pharmacies.Layout = MainLayout;
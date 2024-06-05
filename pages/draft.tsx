import MainLayout from "@/layouts/MainLayout";

import { Button } from '@/elements/Button';

import useTranslation from "next-translate/useTranslation";
import setLanguage from 'next-translate/setLanguage'
import { useGlobalContext } from "@/stores/globalStore";
import { useEffect } from "react";
import { EndPoints, StorageKeys } from "@/enums";

export default function Draft()  {
  const { DISTRICTS_ENDPOINT, PHARMACIES_ENDPOINT } = EndPoints;

  const { t } = useTranslation('common');
  const { selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict, pharmacies, setPharmacies, cities, districts, setDistricts } = useGlobalContext();

  useEffect(() => {
    if(selectedCity) {
      fetch(DISTRICTS_ENDPOINT + "?city=" + selectedCity)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const result = data.result.map((district: {text: string}) => district.text);
          setDistricts(result);
        }
      })
    }
  }, [selectedCity]);

  useEffect(() => {
    if(selectedDistrict) {
      fetch(PHARMACIES_ENDPOINT + "?city=" + selectedCity + "&district=" + selectedDistrict )
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPharmacies(data.result);
        }
      })
    }
  }, [selectedDistrict]);

  return (
    <main
      className={`flex flex-col items-center p-24`}>

      <p className="bg-helper-yellow-400 border border-solid border-helper-yellow-700 inline-flex text-semantic-warning p-16 text-body-medium shadow-ultra-soft">{t("testTitle")}</p>

      <br />
      <br />

      {selectedCity && <p>Selected city: {selectedCity}</p>}

      <Button 
        type="primary"
        text="Change Lang"
        icon="phone"
        className="mb-5"
        onClick={async () => await setLanguage('en')}
      />

      <Button 
        type="primary-light"
        icon="search"
        className="mb-5"
        onClick={async () => await setLanguage('en')}
      />

      <Button 
        type="secondary"
        text="Haritada Gör"
        icon="arrow-right"
        iconPosition="right"
        className="mb-5"
        onClick={async () => await setLanguage('tr')}
      />

      <Button 
        type="rounded"
        icon="search"
        onClick={async () => await setLanguage('tr')}
      />

      <div className="pt-10">
      {
        (cities.length > 0 && districts.length === 0) && cities.map((city) => <div key={"city-" + city} className="pt-1 pointer" onClick={() => setSelectedCity(city)}>{city}</div>)
      }

      {
        (districts.length > 0 && pharmacies.length === 0) && districts.map((district) => <div key={"district-" + district} className="pt-1 pointer" onClick={() => setSelectedDistrict(district)}>{district}</div>)
      }

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
      </div>
    </main>
  );
}

Draft.Layout = MainLayout;
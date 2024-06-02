import MainLayout from "@/layouts/MainLayout";

import { Button } from '@/components/Button';

import useTranslation from "next-translate/useTranslation";
import setLanguage from 'next-translate/setLanguage'
import { useGlobalContext } from "@/stores/globalStore";
import { useEffect } from "react";
import { constants } from "@/constants";

export default function Draft()  {
  const { DISTRICTS_ENDPOINT, PHARMACIES_ENDPOINT } = constants;

  const { t } = useTranslation('common');
  const { selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict, pharmacies, setPharmacies, cities, districts, setDistricts } = useGlobalContext();

  useEffect(() => {
    if(selectedCity) {
      fetch(DISTRICTS_ENDPOINT + "?city=" + selectedCity)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setDistricts(data.result);
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
      className={`p-24`}>

      <p className="bg-gradient-greenToWhite225deg text-semantic-warning p-16 text-body-medium shadow-ultra-soft">{t("testTitle")}</p>

      {selectedCity && <p>Selected city: {selectedCity}</p>}

      <Button 
        type="primary"
        text="Change Lang"
        icon="phone"
        onClick={async () => await setLanguage('en')}
      />

      <Button 
        type="primary-light"
        icon="search"
        onClick={async () => await setLanguage('en')}
      />

      <Button 
        type="secondary"
        text="Haritada Gör"
        icon="arrow-right"
        iconPosition="right"
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
        (districts.length > 0 && pharmacies.length === 0) && districts.map((district) => <div key={"district-" + district.text} className="pt-1 pointer" onClick={() => setSelectedDistrict(district.text)}>{district.text}</div>)
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
import MainLayout from "@/layouts/MainLayout";

import { Button } from '@/components/Button';

import useTranslation from "next-translate/useTranslation";
import setLanguage from 'next-translate/setLanguage'
import { useGlobalContext } from "@/stores/globalStore";
import { useEffect } from "react";
import { constants } from "@/constants";

export default function Draft()  {
  const { DISTRICTS_ENDPOINT } = constants;

  const { t } = useTranslation('common');
  const { selectedCity, setSelectedCity, cities, districts, setDistricts } = useGlobalContext();

  useEffect(() => {
    if(selectedCity) {
      fetch(DISTRICTS_ENDPOINT + "?city=izmir")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // setDistricts(data);
      })
    }
  }, [selectedCity]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <p className="bg-gradient-whiteToBlack text-semantic-warning p-16 text-body-medium shadow-ultra-soft">{t("testTitle")}</p>

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
        cities.length > 0 && cities.map((city) => <div key={"city-" + city} className="pt-1 pointer" onClick={() => setSelectedCity(city)}>{city}</div>)
      }
      </div>
    </main>
  );
}

Draft.Layout = MainLayout;
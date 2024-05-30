import MainLayout from "@/layouts/MainLayout";

import { Button } from '@/components/Button';

import useTranslation from "next-translate/useTranslation";
import setLanguage from 'next-translate/setLanguage'
import { useGlobalContext } from "@/stores/globalStore";
import { useEffect } from "react";

export default function Draft()  {
  const { t } = useTranslation('common');
  const { selectedCity, setSelectedCity } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSelectedCity("izmir");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <p className="bg-gradient-whiteToBlack text-semantic-warning p-16 text-body-medium shadow-ultra-soft">{t("testTitle")}</p>

      <p>Selected city: {selectedCity}</p>

      <Button 
        text="Change Lang"
        onClick={async () => await setLanguage('en')}
      />
    </main>
  );
}

Draft.Layout = MainLayout;
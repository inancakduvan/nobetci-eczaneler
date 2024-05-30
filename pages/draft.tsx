import MainLayout from "@/layouts/MainLayout";

import useTranslation from "next-translate/useTranslation";
import setLanguage from 'next-translate/setLanguage'

export default function Draft()  {
  const { t } = useTranslation('common');

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <p className="bg-gradient-whiteToBlack text-semantic-warning p-16">{t("testTitle")}</p>

      <button onClick={async () => await setLanguage('en')}>Change Lang</button>
    </main>
  );
}

Draft.Layout = MainLayout;
import MainLayout from "@/layouts/mainLayout";

import useTranslation from "next-translate/useTranslation";
import setLanguage from 'next-translate/setLanguage'

export default function Draft()  {
  const { t } = useTranslation('common');

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {t("testTitle")}

      <button onClick={async () => await setLanguage('tr')}>Change Lang</button>
    </main>
  );
}

Draft.Layout = MainLayout;
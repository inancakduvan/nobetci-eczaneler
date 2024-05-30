import useTranslation from "next-translate/useTranslation";
import setLanguage from 'next-translate/setLanguage'
import { useRouter } from "next/router";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t } = useTranslation('common');
  let router = useRouter();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {t("testTitle")}

      <button onClick={async () => await setLanguage('tr')}>Change Lang</button>
    </main>
  );
}

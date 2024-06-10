import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Nöbetçi Eczaneler</title>
        <meta name="description" content="Nöbetçi eczaneleri bul ve konumlarını görüntüle." />
        <meta name="keywords" content="Eczane, nöbetçi, nöbetçi eczane, nöbetçi eczaneler, eczaneler" />
        <meta name="author" content="İnanç Akduvan" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className="overflow-hidden">
        <div id="appContainer" className="h-fit-screen w-full overflow-auto bg-no-repeat bg-muted-400 text-onText-primary">
          <div className="max-w-[640px] my-0 mx-auto">
            <Main />
          </div>
        </div>
        <NextScript />
      </body>
    </Html>
  );
}

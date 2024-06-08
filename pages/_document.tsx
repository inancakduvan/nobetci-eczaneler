import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
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

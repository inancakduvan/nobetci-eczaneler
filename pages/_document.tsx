import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="appContainer" className="max-h-screen max-w-[640px] my-0 mx-auto w-full overflow-auto bg-no-repeat bg-muted-400 text-onText-primary">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}

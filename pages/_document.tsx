import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="appContainer" className="max-h-screen w-full overflow-auto bg-no-repeat bg-gradient-greenToWhite225deg">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}

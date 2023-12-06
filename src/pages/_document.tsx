import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      {/* @ts-expect-error Server Component */}
      <Head>
        <title>Energy Management System</title>
        <link rel="icon" href="/img/favicon.ico" sizes="any" type="image/png" />
      </Head>
      <body>
        <Main />
        {/* @ts-expect-error Server Component */}
        <NextScript />
      </body>
    </Html>
  );
}

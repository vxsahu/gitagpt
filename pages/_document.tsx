import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/gita-gpt.svg" />
          
         <title>Gita GPT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Unlock the power of AI with GitaGPT.in – 18 Chapters and 700 Verses of Bhagavad Gita.">
        <meta property="og:title" content="Gita GPT">
        <meta property="og:description" content="Unlock the power of AI with GitaGPT.in – 18 Chapters and 700 Verses of Bhagavad Gita.">
        <meta property="og:url" content="https://www.gitagpt.in/">
        <meta property="og:type" content="website">
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="GitaGPT" />
          <meta property="og:image" content="https://www.gitagpt.in/og-image.png" />
          <meta name="twitter:image" content="https://www.gitagpt.in/og-image.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

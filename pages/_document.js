import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    const { publicRuntimeConfig } = getConfig();

    return (
      <Html lang="fr">
        <Head>
        <link rel="canonical" href="https://weneedlove.fr/" />
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="N'ayez plus peur, partagez vos histoires anonymement et recevez le soutien de la communauté!"
          />
          <meta name="brand" content="WeNeedLove" />
          <meta
            name="keywords"
            content="Partage d'histoires, Soutien communautaire, Histoires anonymes, Relation d'aide, Communauté d'amour, Soutien en ligne, Soutien émotionnel"
          />
          <meta name="robots" content="index, follow" />
          <meta
            name="image"
            property="og:image"
            content="https://www.weneedlove.fr/assets/weneedlove_og.png"
          />
          <meta property="og:image:width" content="1650" />
          <meta property="og:image:height" content="798" />
          <meta property="og:title" content="weNeedLove" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://weneedlove.fr/" />
          <meta
            property="og:description"
            content="N'ayez plus peur, partagez vos histoires anonymement et recevez le soutien de la communauté!"
          />
          <meta property="og:site_name" content="WeNeedLove" />
          <link rel="shortcut icon" href="https://www.weneedlove.fr/assets/weNeedLove_logo.png" />
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${publicRuntimeConfig.analyticsId}`}
          />

          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${publicRuntimeConfig.analyticsId}');
              `,
            }}
          />

          <Script
            strategy="afterInteractive"
            id="gtm"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5T4KV72');
              `,
            }}
          />
        </Head>

        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${publicRuntimeConfig.analyticsId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

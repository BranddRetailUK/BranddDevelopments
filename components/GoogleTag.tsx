import Script from "next/script";

function readPublicEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function jsonString(value: string) {
  return JSON.stringify(value);
}

export function GoogleTag() {
  const tagManagerId = readPublicEnv("NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID");
  const gaMeasurementId = readPublicEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID");
  const googleAdsId = readPublicEnv("NEXT_PUBLIC_GOOGLE_ADS_ID");
  const tagId = gaMeasurementId || googleAdsId;

  if (!tagManagerId && !tagId) {
    return null;
  }

  return (
    <>
      <script
        id="google-consent-default"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
        `,
        }}
      />

      {tagManagerId ? (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer',${jsonString(tagManagerId)});
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${tagManagerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      ) : (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              ${
                gaMeasurementId
                  ? `gtag('config', ${jsonString(gaMeasurementId)}, { send_page_view: true });`
                  : ""
              }
              ${
                googleAdsId && googleAdsId !== gaMeasurementId
                  ? `gtag('config', ${jsonString(googleAdsId)});`
                  : ""
              }
            `}
          </Script>
        </>
      )}
    </>
  );
}

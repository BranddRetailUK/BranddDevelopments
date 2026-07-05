/* eslint-disable @next/next/next-script-for-ga -- Google Ads installer needs the raw tag in the initial head HTML. */

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
        data-cfasync="false"
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
        <script
          id="google-tag-manager"
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer',${jsonString(tagManagerId)});
            `,
          }}
        />
      ) : (
        <>
          <script
            data-cfasync="false"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`}
          />
          <script
            id="google-tag-config"
            data-cfasync="false"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              ${
                gaMeasurementId
                  ? `gtag('config', ${jsonString(gaMeasurementId)}, { send_page_view: false });`
                  : ""
              }
              ${
                googleAdsId && googleAdsId !== gaMeasurementId
                  ? `gtag('config', ${jsonString(googleAdsId)});`
                  : ""
              }
            `,
            }}
          />
        </>
      )}
    </>
  );
}

export function GoogleTagManagerNoScript() {
  const tagManagerId = readPublicEnv("NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID");

  if (!tagManagerId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${tagManagerId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

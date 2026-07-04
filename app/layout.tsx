import "./globals.css";
import { ConsentBanner } from "@/components/ConsentBanner";
import { GoogleTag, GoogleTagManagerNoScript } from "@/components/GoogleTag";
import { SiteShell } from "@/components/SiteShell";
import { StructuredData } from "@/components/StructuredData";
import { organizationJsonLd, rootMetadata, websiteJsonLd } from "@/content/seo";

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTag />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <StructuredData data={[organizationJsonLd, websiteJsonLd]} />
        <SiteShell>{children}</SiteShell>
        <ConsentBanner />
      </body>
    </html>
  );
}

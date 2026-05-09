import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "Brandd | Websites, Product Platforms & Business Systems",
    template: "%s | Brandd",
  },
  description:
    "Brandd designs and builds websites, product platforms, backend systems, databases, MVPs, ecommerce workflows, integrations, and operational tools.",
  icons: {
    icon: [{ url: "/icon", sizes: "128x128", type: "image/png" }],
    apple: [{ url: "/icon", sizes: "128x128", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

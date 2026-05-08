import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "BRANDD Developments | Web Design, Development & Commerce Systems",
    template: "%s | BRANDD Developments",
  },
  description:
    "BRANDD Developments designs and builds websites, backend systems, databases, MVPs, retail tools, and ecommerce platforms for ambitious brands.",
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

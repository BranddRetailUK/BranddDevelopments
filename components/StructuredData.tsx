type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

function serializeJsonLd(data: JsonLdValue) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export async function StructuredData({ data }: { data: JsonLdValue }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <script
      nonce={nonce}
      suppressHydrationWarning
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
import { headers } from "next/headers";

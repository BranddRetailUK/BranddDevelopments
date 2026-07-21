import { NextResponse, type NextRequest } from "next/server";

const canonicalHost = "brandd.co.uk";
const healthPath = "/api/health";

function getHostname(request: NextRequest) {
  const host = request.headers.get("host")?.trim().toLowerCase() ?? "";

  if (host.startsWith("[")) {
    return host.slice(1, host.indexOf("]"));
  }

  return host.split(":", 1)[0];
}

function isAllowedHost(hostname: string) {
  if (hostname === canonicalHost || hostname === `www.${canonicalHost}`) {
    return true;
  }

  if (
    process.env.NODE_ENV !== "production" &&
    (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1")
  ) {
    return true;
  }

  const configuredHosts = process.env.ALLOWED_HOSTS?.split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  return configuredHosts?.includes(hostname) ?? false;
}

function createContentSecurityPolicy() {
  const developmentScriptSource =
    process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'";
  const developmentConnectSource = process.env.NODE_ENV === "production" ? "" : " ws:";
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${developmentScriptSource} https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://pagead2.googlesyndication.com https://challenges.cloudflare.com`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://res.cloudinary.com https://www.acehitstcg.co.uk https://www.google-analytics.com https://www.googleadservices.com https://pagead2.googlesyndication.com https://*.g.doubleclick.net",
    "font-src 'self' data:",
    "media-src 'self' https://res.cloudinary.com",
    `connect-src 'self'${developmentConnectSource} https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.googleadservices.com https://pagead2.googlesyndication.com https://*.g.doubleclick.net https://challenges.cloudflare.com`,
    "frame-src https://www.googletagmanager.com https://www.googleadservices.com https://*.g.doubleclick.net https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];

  if (process.env.NODE_ENV === "production") {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

function applyContentSecurityPolicy(response: NextResponse, policy: string) {
  response.headers.set("Content-Security-Policy", policy);
  return response;
}

function getCanonicalDestination(request: NextRequest) {
  const destination = request.nextUrl.clone();
  destination.protocol = "https:";
  destination.hostname = canonicalHost;
  destination.port = "";
  return destination;
}

export function middleware(request: NextRequest) {
  const policy = createContentSecurityPolicy();
  const hostname = getHostname(request);
  const isHealthRequest = request.nextUrl.pathname === healthPath;

  if (!isHealthRequest && !isAllowedHost(hostname)) {
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return applyContentSecurityPolicy(
        new NextResponse("Misdirected request.", {
          status: 421,
          headers: { "Cache-Control": "no-store" },
        }),
        policy,
      );
    }

    return applyContentSecurityPolicy(
      NextResponse.redirect(getCanonicalDestination(request), 308),
      policy,
    );
  }

  if (hostname === `www.${canonicalHost}`) {
    return applyContentSecurityPolicy(
      NextResponse.redirect(getCanonicalDestination(request), 308),
      policy,
    );
  }

  return applyContentSecurityPolicy(NextResponse.next(), policy);
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

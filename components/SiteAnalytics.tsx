"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  captureCampaignAttribution,
  analyticsSessionActivityStorageKey,
  analyticsSessionStorageKey,
  analyticsVisitorStorageKey,
  consentChangeEventName,
  consentStorageKey,
  getLeadAttribution,
  readBrowserStorage,
  type LeadAttribution,
} from "@/lib/clientAttribution";

type ConsentChoice = "accepted" | "essential";
type AnalyticsProperties = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    branddTrackEvent?: (eventName: string, properties?: Record<string, unknown>) => void;
  }
}

const sessionTimeoutMs = 30 * 60 * 1000;
const scrollMilestones = [25, 50, 75, 90];

function createAnalyticsId(prefix: string) {
  const randomId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

  return `${prefix}_${randomId}`;
}

function readSessionStorage(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionStorage(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in hardened/private browser modes.
  }
}

function readConsentChoice(): ConsentChoice | null {
  const choice = readBrowserStorage(consentStorageKey);
  return choice === "accepted" || choice === "essential" ? choice : null;
}

function writeVisitorId(visitorId: string) {
  try {
    window.localStorage.setItem(analyticsVisitorStorageKey, visitorId);
  } catch {
    // Storage can be unavailable in hardened/private browser modes.
  }
}

function getAnalyticsIdentity() {
  let visitorId = readBrowserStorage(analyticsVisitorStorageKey);

  if (!visitorId) {
    visitorId = createAnalyticsId("visitor");
    writeVisitorId(visitorId);
  }

  const now = Date.now();
  const lastActivity = Number(readSessionStorage(analyticsSessionActivityStorageKey));
  let sessionId = readSessionStorage(analyticsSessionStorageKey);

  if (!sessionId || !Number.isFinite(lastActivity) || now - lastActivity > sessionTimeoutMs) {
    sessionId = createAnalyticsId("session");
    writeSessionStorage(analyticsSessionStorageKey, sessionId);
  }

  writeSessionStorage(analyticsSessionActivityStorageKey, String(now));

  return {
    visitorId,
    sessionId,
  };
}

function getCurrentPagePath() {
  return `${window.location.pathname}${window.location.search}`;
}

function cleanText(value: string | null | undefined, maxLength = 180) {
  return value?.replace(/\s+/g, " ").trim().slice(0, maxLength) ?? "";
}

function toAnalyticsProperties(properties?: Record<string, unknown>): AnalyticsProperties {
  if (!properties) {
    return {};
  }

  const cleanProperties: AnalyticsProperties = {};

  for (const [key, value] of Object.entries(properties).slice(0, 40)) {
    if (typeof value === "string") {
      cleanProperties[key] = cleanText(value, 1000) || null;
    } else if (typeof value === "number" && Number.isFinite(value)) {
      cleanProperties[key] = value;
    } else if (typeof value === "boolean" || value === null) {
      cleanProperties[key] = value;
    }
  }

  return cleanProperties;
}

function attributionToPayload(attribution: LeadAttribution) {
  return {
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    utmTerm: attribution.utmTerm,
    utmContent: attribution.utmContent,
    gclid: attribution.gclid,
    gbraid: attribution.gbraid,
    wbraid: attribution.wbraid,
  };
}

function pushGoogleEvent({
  eventName,
  pagePath,
  pageUrl,
  pageTitle,
  properties,
}: {
  eventName: string;
  pagePath: string;
  pageUrl: string;
  pageTitle: string;
  properties: AnalyticsProperties;
}) {
  if (eventName === "page_view") {
    window.dataLayer?.push({
      event: "page_view",
      page_location: pageUrl,
      page_path: pagePath,
      page_title: pageTitle,
    });

    window.gtag?.("event", "page_view", {
      page_location: pageUrl,
      page_path: pagePath,
      page_title: pageTitle,
    });

    return;
  }

  const googleProperties = Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== null),
  );

  window.dataLayer?.push({
    event: eventName,
    page_path: pagePath,
    ...googleProperties,
  });

  window.gtag?.("event", eventName, {
    event_category: "Site interaction",
    page_path: pagePath,
    ...googleProperties,
  });
}

function classifyLink(anchor: HTMLAnchorElement) {
  const url = new URL(anchor.href, window.location.href);

  if (url.origin !== window.location.origin) {
    return "outbound";
  }

  if (url.pathname === window.location.pathname && url.hash) {
    return "anchor";
  }

  return "internal";
}

function getInteractionArea(element: Element) {
  if (element.closest(".site-header")) {
    return "header";
  }

  if (element.closest(".site-footer")) {
    return "footer";
  }

  if (element.closest(".contact-form")) {
    return "contact_form";
  }

  return "content";
}

function getLinkEventName(anchor: HTMLAnchorElement) {
  if (anchor.closest(".nav-link, .brand-mark, .mobile-nav")) {
    return "nav_click";
  }

  if (anchor.closest(".button")) {
    return "cta_click";
  }

  if (classifyLink(anchor) === "outbound") {
    return "outbound_link_click";
  }

  return "link_click";
}

export function SiteAnalytics() {
  const pathname = usePathname();
  const [consentChoice, setConsentChoice] = useState<ConsentChoice | null>(null);
  const previousPagePathRef = useRef<string | null>(null);
  const lastTrackedPageRef = useRef<string | null>(null);
  const trackedScrollDepthsRef = useRef<Set<number>>(new Set());
  const trackedFormsRef = useRef<Set<string>>(new Set());

  const trackSiteEvent = useCallback(
    (
      eventName: string,
      properties?: Record<string, unknown>,
      options?: {
        previousPagePath?: string | null;
        sendGoogle?: boolean;
      },
    ) => {
      const currentConsentChoice = readConsentChoice();

      if (currentConsentChoice !== "accepted") {
        return;
      }

      const identity = getAnalyticsIdentity();
      const attribution = getLeadAttribution();
      const pagePath = getCurrentPagePath();
      const pageUrl = window.location.href;
      const pageTitle = document.title;
      const cleanProperties = toAnalyticsProperties(properties);

      if (options?.sendGoogle !== false) {
        pushGoogleEvent({
          eventName,
          pagePath,
          pageUrl,
          pageTitle,
          properties: cleanProperties,
        });
      }

      const payload = {
        eventName,
        visitorId: identity.visitorId,
        sessionId: identity.sessionId,
        pageUrl,
        pagePath,
        pageTitle,
        referrer: document.referrer || null,
        landingPage: attribution.landingPage || null,
        previousPagePath: options?.previousPagePath ?? null,
        attribution: attributionToPayload(attribution),
        consentChoice: currentConsentChoice,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        properties: cleanProperties,
      };

      void fetch("/api/site-analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => undefined);
    },
    [],
  );

  useEffect(() => {
    const updateConsentChoice = (event?: Event) => {
      const detail =
        event instanceof CustomEvent
          ? (event.detail as { choice?: ConsentChoice } | undefined)
          : undefined;

      setConsentChoice(detail?.choice ?? readConsentChoice());
    };

    updateConsentChoice();
    window.addEventListener(consentChangeEventName, updateConsentChoice);

    return () => window.removeEventListener(consentChangeEventName, updateConsentChoice);
  }, []);

  useEffect(() => {
    window.branddTrackEvent = (eventName, properties) => {
      trackSiteEvent(eventName, properties, { sendGoogle: false });
    };

    return () => {
      if (window.branddTrackEvent) {
        delete window.branddTrackEvent;
      }
    };
  }, [trackSiteEvent]);

  useEffect(() => {
    captureCampaignAttribution();

    if (consentChoice !== "accepted") {
      return;
    }

    const pagePath = getCurrentPagePath();

    if (lastTrackedPageRef.current === pagePath) {
      return;
    }

    trackSiteEvent("page_view", undefined, {
      previousPagePath: previousPagePathRef.current,
    });

    previousPagePathRef.current = pagePath;
    lastTrackedPageRef.current = pagePath;
    trackedScrollDepthsRef.current = new Set();
  }, [consentChoice, pathname, trackSiteEvent]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a, button") : null;

      if (!target) {
        return;
      }

      if (target instanceof HTMLAnchorElement) {
        const linkType = classifyLink(target);
        const url = new URL(target.href, window.location.href);
        const eventName = getLinkEventName(target);

        trackSiteEvent(eventName, {
          link_text:
            cleanText(target.getAttribute("aria-label")) ||
            cleanText(target.textContent) ||
            cleanText(target.title) ||
            "Unlabelled link",
          link_url: target.href,
          link_path: linkType === "outbound" ? null : `${url.pathname}${url.search}${url.hash}`,
          link_type: linkType,
          interaction_area: getInteractionArea(target),
          opens_new_tab: target.target === "_blank",
          is_cta: Boolean(target.closest(".button")),
        });

        return;
      }

      if (target instanceof HTMLButtonElement && !target.closest(".contact-form")) {
        trackSiteEvent("button_click", {
          button_label:
            cleanText(target.getAttribute("aria-label")) ||
            cleanText(target.textContent) ||
            "Unlabelled button",
          button_type: target.type || "button",
          interaction_area: getInteractionArea(target),
        });
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [trackSiteEvent]);

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const form = target?.closest<HTMLFormElement>("form.contact-form");

      if (!form || trackedFormsRef.current.has("contact")) {
        return;
      }

      trackedFormsRef.current.add("contact");
      trackSiteEvent("form_start", {
        form_name: "contact",
      });
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target instanceof Element ? event.target.closest("form.contact-form") : null;

      if (!form) {
        return;
      }

      trackSiteEvent("form_submit_attempt", {
        form_name: "contact",
      });
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("submit", handleSubmit);
    };
  }, [trackSiteEvent]);

  useEffect(() => {
    trackedScrollDepthsRef.current = new Set();
    let frame = 0;

    const handleScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;

        if (readConsentChoice() !== "accepted") {
          return;
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollableHeight <= 0) {
          return;
        }

        const scrollDepth = Math.min(
          100,
          Math.round((window.scrollY / scrollableHeight) * 100),
        );

        for (const milestone of scrollMilestones) {
          if (
            scrollDepth >= milestone &&
            !trackedScrollDepthsRef.current.has(milestone)
          ) {
            trackedScrollDepthsRef.current.add(milestone);
            trackSiteEvent("scroll_depth", {
              scroll_depth: milestone,
            });
          }
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [consentChoice, pathname, trackSiteEvent]);

  return null;
}

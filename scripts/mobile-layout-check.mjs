/* global process, console, URL */
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3321";
const outputDir =
  process.env.MOBILE_CHECK_DIR || "/private/tmp/brandd-mobile-pass/playwright";
const browserChannel = process.env.PLAYWRIGHT_CHANNEL || "chrome";

const routes = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects" },
  { name: "good-game", path: "/projects#good-game-apparel" },
  { name: "ace-hits", path: "/projects/ace-hits-tcg" },
  { name: "mvps", path: "/mvps" },
  { name: "services", path: "/services" },
  { name: "contact", path: "/contact" },
];

const viewports = [
  { name: "phone-390", width: 390, height: 844 },
  { name: "phone-430", width: 430, height: 932 },
];

await mkdir(outputDir, { recursive: true });

let browser;

try {
  browser = await chromium.launch({ channel: browserChannel, headless: true });
} catch (error) {
  console.error(
    `Could not launch Playwright browser channel "${browserChannel}". ` +
      "Set PLAYWRIGHT_CHANNEL to an installed channel, or run `npx playwright install chromium`.",
  );
  throw error;
}

const failures = [];

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });

  for (const route of routes) {
    const page = await context.newPage();
    const url = new URL(route.path, baseUrl).toString();

    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    await revealPage(page);

    const screenshotPath = join(outputDir, `${viewport.name}-${route.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const result = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const offenders = [];

      if (scrollWidth > viewportWidth + 1) {
        offenders.push(
          `document overflow: scrollWidth ${scrollWidth}px exceeds viewport ${viewportWidth}px`,
        );
      }

      const textSelector =
        "h1, h2, h3, p, a, button, span, strong, label, input, textarea, select";

      for (const element of document.querySelectorAll(textSelector)) {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();

        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          Number(style.opacity) === 0 ||
          rect.width === 0 ||
          rect.height === 0
        ) {
          continue;
        }

        const text = (element.textContent || element.getAttribute("aria-label") || "")
          .replace(/\s+/g, " ")
          .trim();

        if (!text && !["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)) {
          continue;
        }

        if (rect.left < -1 || rect.right > viewportWidth + 1) {
          const tag = element.tagName.toLowerCase();
          const className = element.className
            ? `.${String(element.className).trim().replace(/\s+/g, ".")}`
            : "";

          offenders.push(
            `${tag}${className} "${text.slice(0, 80)}" spans ${Math.round(
              rect.left,
            )}-${Math.round(rect.right)}px in ${viewportWidth}px viewport`,
          );
        }

        if (
          ["H1", "H2"].includes(element.tagName) &&
          text.length > 24 &&
          rect.width < viewportWidth * 0.45 &&
          rect.height > rect.width * 2.2
        ) {
          const tag = element.tagName.toLowerCase();
          offenders.push(
            `${tag} "${text.slice(0, 80)}" is compressed into a ${Math.round(
              rect.width,
            )}px column`,
          );
        }
      }

      return offenders;
    });

    if (result.length > 0) {
      failures.push({
        route: route.path,
        viewport: viewport.name,
        screenshotPath,
        issues: result,
      });
    }

    await page.close();
  }

  await context.close();
}

await browser.close();

if (failures.length > 0) {
  console.error("Mobile layout check found issues:");

  for (const failure of failures) {
    console.error(`\n${failure.viewport} ${failure.route}`);
    console.error(`screenshot: ${failure.screenshotPath}`);

    for (const issue of failure.issues.slice(0, 12)) {
      console.error(`- ${issue}`);
    }

    if (failure.issues.length > 12) {
      console.error(`- ${failure.issues.length - 12} more issues`);
    }
  }

  process.exitCode = 1;
} else {
  console.log(`Mobile layout check passed. Screenshots saved to ${outputDir}`);
}

async function revealPage(page) {
  await page.waitForTimeout(600);

  await page.evaluate(async () => {
    const delay = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const step = Math.max(360, Math.floor(window.innerHeight * 0.72));

    for (let y = 0; y <= maxScroll; y += step) {
      window.scrollTo(0, y);
      await delay(140);
    }

    window.scrollTo(0, Math.max(0, maxScroll));
    await delay(260);
    window.scrollTo(0, 0);
    await delay(500);
  });
}

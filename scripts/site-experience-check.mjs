/* global process, console, URL */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";
import { chromium, expect } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3321";
assert.ok(
  ["127.0.0.1", "localhost", "[::1]"].includes(new URL(baseUrl).hostname),
  "Run enquiry checks against a local preview only.",
);

const source = await readFile(
  new URL("../lib/contactOptions.ts", import.meta.url),
  "utf8",
);
const options = {};
vm.runInNewContext(
  ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  { exports: options },
);
assert.equal(options.isContactBudgetOption("£5,000 to under £10,000"), true);
assert.equal(options.isContactBudgetOption("Not sure yet"), true);
assert.equal(
  options.isContactBudgetOption("£1,000-£5,000"),
  true,
  "An older open form remains accepted.",
);
assert.equal(options.isContactBudgetOption("arbitrary budget"), false);
assert.equal(options.isContactFocusOption("Shopify app"), true);
assert.equal(
  options.isContactFocusOption("Website design and frontend build"),
  true,
);
assert.equal(options.isContactFocusOption("toString"), false);

const routes = [
  "/",
  "/services",
  "/projects",
  "/projects/upforit",
  "/projects/good-game-apparel",
  "/projects/ace-hits-tcg",
  "/projects/sonacrate",
  "/projects/dtf-designer",
  "/legacy-systems",
  "/contact",
  "/privacy",
];
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
  headless: true,
});
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  context.setDefaultTimeout(15000);
  // No analytics, security or enquiry API calls can reach the application during this check.
  await context.route("**/api/**", (route) => route.abort());
  const page = await context.newPage();
  const renderingErrors = [];
  page.on("pageerror", (error) => renderingErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && /hydrat/i.test(message.text())) {
      renderingErrors.push(message.text());
    }
  });
  const localLinks = new Set();
  for (const path of routes) {
    const response = await page.goto(new URL(path, baseUrl).href, {
      waitUntil: "networkidle",
    });
    assert.equal(response.status(), 200, path);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h1")).toBeVisible();
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
      if (href.startsWith("/")) localLinks.add(new URL(href, baseUrl).pathname);
    }
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      false,
      `${path} desktop overflow`,
    );
  }
  for (const path of localLinks) {
    const response = await context.request.get(new URL(path, baseUrl).href);
    assert.equal(response.status(), 200, `Internal link ${path}`);
  }
  await page.goto(new URL("/mvps", baseUrl).href);
  await expect(page).toHaveURL(new URL("/projects", baseUrl).href);

  await page.goto(baseUrl);
  const consent = page.getByRole("button", {
    name: "Use essential only",
    exact: true,
  });
  if (await consent.isVisible()) await consent.click();
  await page
    .locator("main")
    .getByRole("link", { name: "Discuss a project", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(new URL("/contact", baseUrl).href);
  await expect(
    page.getByRole("heading", { name: "Tell us about your project." }),
  ).toBeVisible();

  await page.goto(new URL("/contact?service=shopify", baseUrl).href);
  await expect(page.getByRole("combobox")).toHaveValue("Shopify app");
  await page.goto(new URL("/contact?service=toString", baseUrl).href);
  await expect(page.getByRole("combobox")).toHaveValue("Not sure yet");

  const submissions = [];
  await page.route("**/api/contact", async (route) => {
    const request = route.request();
    submissions.push({
      body: request.postDataJSON(),
      key: request.headers()["idempotency-key"],
    });
    const first = submissions.length === 1;
    await route.fulfill({
      status: first ? 503 : 201,
      contentType: "application/json",
      body: JSON.stringify(
        first
          ? { message: "Please try again shortly." }
          : { submissionId: "local-check", message: "Received." },
      ),
    });
  });
  await page.getByLabel("Name", { exact: true }).fill("Local check");
  await page
    .getByLabel("Email", { exact: true })
    .fill("local-check@example.com");
  await page
    .locator(".budget-option")
    .filter({ hasText: "£5,000 to under £10,000" })
    .click();
  await expect(
    page.getByRole("radio", { name: "£5,000 to under £10,000", exact: true }),
  ).toBeChecked();
  await page
    .getByRole("textbox", {
      name: "What are you building, improving or trying to fix?",
    })
    .fill("Checking the enquiry journey locally.");
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(page.locator(".form-error a")).toHaveAttribute(
    "href",
    "mailto:enquiries@brandd.co.uk",
  );
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
    "Local check",
  );
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Enquiry sent", exact: true }),
  ).toBeDisabled();
  await expect(page.locator(".form-success")).toContainText("reply by email");
  assert.equal(submissions.length, 2);
  assert.equal(
    submissions[0].key,
    submissions[1].key,
    "Retry keeps its idempotency key.",
  );
  assert.ok(submissions[0].key);
  assert.equal(submissions[0].body.budget, "£5,000 to under £10,000");
  assert.equal(submissions[0].body.focus, "Not sure yet");

  for (const width of [320, 390, 768, 1100]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(new URL("/services", baseUrl).href, {
      waitUntil: "networkidle",
    });
    await expect(page.locator("main h1")).toBeVisible();
    await expect(
      page.locator(".service-groups-section .service-card"),
    ).toHaveCount(4);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      false,
      `Services overflow at ${width}px`,
    );
    const navLinks =
      width <= 1080
        ? [
            page.locator(".mobile-enquiry-link"),
            page.locator(".brand-mark"),
            page.locator(".mobile-menu-button"),
          ]
        : [
            page.locator(".nav-side-left"),
            page.locator(".brand-mark"),
            page.locator(".nav-side-right"),
          ];
    const bounds = await Promise.all(
      navLinks.map((link) => link.boundingBox()),
    );
    assert.ok(
      bounds[0].x + bounds[0].width <= bounds[1].x,
      `Left navigation overlap at ${width}px`,
    );
    assert.ok(
      bounds[1].x + bounds[1].width <= bounds[2].x,
      `Right navigation overlap at ${width}px`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator(".mobile-nav")
    .getByRole("link", { name: "Our work", exact: true })
    .click();
  await expect(page).toHaveURL(new URL("/projects", baseUrl).href);
  await expect(page.locator(".mobile-nav")).toHaveCount(0);
  await page.goto(baseUrl);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator(".mobile-nav")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(new URL("/#about", baseUrl).href);
  await expect(page.locator(".mobile-nav")).toHaveCount(0);
  await expect(page.locator("#about")).toBeInViewport();
  assert.deepEqual(
    renderingErrors,
    [],
    "Pages render without browser or hydration errors.",
  );
  await context.close();
  console.log(
    "Passed: routes, internal links, redirect, responsive navigation, mobile services, form options, recovery and idempotent retry. No enquiries were sent.",
  );
} finally {
  await browser.close();
}

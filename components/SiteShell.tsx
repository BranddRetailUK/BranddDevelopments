"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { darkLogo, navItems, routeTones, whiteLogo } from "@/content/site";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleTone, setVisibleTone] = useState<"light" | "dark" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const routeTone = routeTones[pathname] ?? "light";
  const headerTone = visibleTone ?? (pathname === "/" ? (isScrolled ? "dark" : "light") : routeTone);

  const splitNav = useMemo(() => {
    const splitAt = Math.max(1, Math.floor(navItems.length / 2));

    return {
      left: navItems.slice(0, splitAt),
      right: navItems.slice(splitAt),
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateVisibleTone = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = document
          .elementFromPoint(Math.round(window.innerWidth / 2), 126)
          ?.closest<HTMLElement>("[data-nav-tone]");
        const tone = marker?.dataset.navTone;
        setVisibleTone(tone === "dark" || tone === "light" ? tone : null);
      });
    };

    updateVisibleTone();
    window.addEventListener("scroll", updateVisibleTone, { passive: true });
    window.addEventListener("resize", updateVisibleTone);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibleTone);
      window.removeEventListener("resize", updateVisibleTone);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dataset.routeTone = routeTone;
  }, [routeTone]);

  return (
    <div className={`site-shell tone-${routeTone}`}>
      <header className={`site-header header-${headerTone}`}>
        <nav className="nav-shell" aria-label="Main navigation">
          <div className="nav-side nav-side-left">
            {splitNav.left.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                pathname={pathname}
              />
            ))}
          </div>

          <Link className="brand-mark" href="/" aria-label="Brandd home">
            <Image
              src={headerTone === "dark" ? whiteLogo : darkLogo}
              width={886}
              height={205}
              priority
              alt="Brandd"
            />
          </Link>

          <div className="nav-side nav-side-right">
            {splitNav.right.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                pathname={pathname}
              />
            ))}
          </div>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <HiOutlineXMark aria-hidden="true" /> : <HiOutlineBars3 aria-hidden="true" />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              className="mobile-nav"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              {navItems.map((item) => (
                <div className="mobile-nav-group" key={item.href}>
                  <NavLink
                    item={item}
                    pathname={pathname}
                  />
                </div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -18, filter: "blur(8px)" }}
          transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <motion.div
        className={`route-wash route-wash-${routeTone}`}
        key={`wash-${pathname}`}
        initial={prefersReducedMotion ? { opacity: 0 } : { y: "-100%" }}
        animate={prefersReducedMotion ? { opacity: 0 } : { y: ["-100%", "0%", "100%"] }}
        transition={{ duration: 0.92, times: [0, 0.48, 1], ease: [0.83, 0, 0.17, 1] }}
        aria-hidden="true"
      />

      <SiteFooter />
    </div>
  );
}

function NavLink({
  item,
  pathname,
}: {
  item: (typeof navItems)[number];
  pathname: string;
}) {
  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  return (
    <Link className={active ? "nav-link active" : "nav-link"} href={item.href}>
      {item.label}
    </Link>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer" data-nav-tone="dark">
      <div>
        <Image src={whiteLogo} width={886} height={205} alt="Brandd" />
        <p>Websites, product platforms, backend systems, databases, projects, ecommerce, integrations, and operational tools.</p>
      </div>
      <div className="footer-links">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}

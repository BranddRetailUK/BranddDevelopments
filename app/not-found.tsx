import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";

export default function NotFound() {
  return (
    <section className="page-hero page-hero-light not-found" data-nav-tone="light">
      <p className="eyebrow">404</p>
      <h1>This page is not in the current build.</h1>
      <p>Head back to the main site and keep moving.</p>
      <Link className="button button-dark" href="/">
        Back home <HiArrowLongRight aria-hidden="true" />
      </Link>
    </section>
  );
}

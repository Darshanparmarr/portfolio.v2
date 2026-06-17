import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Wraps the app in Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync.
 * Exposes the instance on window.__lenis so the nav / buttons can scrollTo().
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return children;
}

/** Smoothly scroll to a CSS selector or element (used by nav links). */
export function scrollTo(target, opts = {}) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -10, duration: 1.2, ...opts });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }
}

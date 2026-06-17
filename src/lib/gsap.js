/* Central GSAP entry — register plugins once, re-export everywhere. */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Ignore mobile URL-bar show/hide resizes so scroll-triggers don't jump/jank.
ScrollTrigger.config({ ignoreMobileResize: true });

/* Honor reduced-motion: components can check this before building timelines. */
export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };

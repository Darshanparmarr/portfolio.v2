/* Central GSAP entry — register plugins once, re-export everywhere. */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Honor reduced-motion: components can check this before building timelines. */
export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };

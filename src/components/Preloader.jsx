import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { site } from "../data/site";
import "./Preloader.css";

/**
 * Cinematic intro: a 0→100 counter with the name revealing, then the curtain
 * lifts to expose the hero. Calls onComplete() so the hero can run its intro.
 */
export default function Preloader({ onComplete }) {
  const root = useRef(null);
  const count = useRef(null);
  const name = useRef(null);
  const bar = useRef(null);
  const built = useRef(false);

  useEffect(() => {
    // Build the intro exactly once, even if the effect is ever re-invoked.
    if (built.current) return;
    built.current = true;

    if (prefersReducedMotion) {
      gsap.set(root.current, { display: "none" });
      onComplete?.();
      return;
    }

    document.body.style.overflow = "hidden";
    const counter = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        gsap.set(root.current, { display: "none" });
        onComplete?.();
      },
    });

    tl.fromTo(
      name.current.children,
      { yPercent: 120 },
      { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.08 }
    )
      .to(
        counter,
        {
          v: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        },
        0.1
      )
      .to(bar.current, { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0.1)
      .to(name.current.children, { yPercent: -120, duration: 0.7, ease: "power3.in", stagger: 0.05 }, "+=0.25")
      .to([count.current, bar.current], { autoAlpha: 0, duration: 0.4 }, "<")
      .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.1");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div className="preloader" ref={root}>
      <div className="preloader__name" ref={name} aria-hidden="true">
        <span>{site.firstName}</span>
        <span>{site.lastName}</span>
      </div>
      <div className="preloader__bar-track">
        <div className="preloader__bar" ref={bar} />
      </div>
      <div className="preloader__count" ref={count}>000</div>
    </div>
  );
}

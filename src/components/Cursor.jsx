import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import "./Cursor.css";

/**
 * Custom amber cursor: a difference-blended trailing ring + a precise dot.
 * Interactive elements grow the ring; [data-cursor-text="View"] shows a solid
 * amber label pill on the (unblended) dot layer so it stays legible over any
 * backdrop, including project preview images.
 */
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    gsap.set(label.current, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });

    const xToRing = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const yToRing = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const xToDot = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const yToDot = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });

    let visible = false;
    const move = (e) => {
      if (!visible) {
        visible = true;
        gsap.to([ring.current, dot.current], { autoAlpha: 1, duration: 0.3 });
      }
      xToRing(e.clientX); yToRing(e.clientY);
      xToDot(e.clientX); yToDot(e.clientY);
    };

    const over = (e) => {
      const t = e.target.closest('[data-cursor="hover"], a, button');
      const txt = e.target.closest("[data-cursor-text]");
      gsap.to(ring.current, {
        scale: txt ? 2.2 : t ? 2.4 : 1,
        borderColor: t || txt ? "var(--accent)" : "var(--line-2)",
        duration: 0.35, ease: "power3",
      });
      if (txt) {
        label.current.textContent = txt.getAttribute("data-cursor-text");
        gsap.to(label.current, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3" });
      } else {
        gsap.to(label.current, { autoAlpha: 0, scale: 0.6, duration: 0.2 });
      }
    };

    const leave = () => gsap.to([ring.current, dot.current], { autoAlpha: 0, duration: 0.3 });
    const down = () => gsap.to(ring.current, { scale: 0.8, duration: 0.2 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3 });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true">
        <span ref={label} className="cursor-label" />
      </div>
    </>
  );
}

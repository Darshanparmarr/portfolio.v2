import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { scrollTo } from "../../lib/SmoothScroll";
import { site } from "../../data/site";
import "./Hero.css";

export default function Hero({ ready }) {
  const root = useRef(null);
  const role = useRef(null);

  // Intro reveal — animates FROM hidden, so the resting state is always
  // visible (if the timeline never runs, the hero still shows).
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.05 });
      tl.from(".hero__line-inner", { yPercent: 115, duration: 1.1, stagger: 0.12 })
        .from(".hero__top > *", { autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.1 }, "-=0.8")
        .from(".hero__meta > *", { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.12 }, "-=0.5")
        .from(".hero__cue", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.3");
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // Scroll parallax — content drifts up & fades as you leave the hero
  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero__inner", {
        yPercent: -12, autoAlpha: 0.25, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero__glow", {
        yPercent: 28, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Rotating role (always on its own line → no layout reflow)
  useEffect(() => {
    if (!role.current) return;
    let i = 0;
    const el = role.current;
    const id = setInterval(() => {
      i = (i + 1) % site.roles.length;
      gsap.to(el, {
        autoAlpha: 0, y: -10, duration: 0.3, ease: "power2.in",
        onComplete: () => {
          el.textContent = site.roles[i];
          gsap.fromTo(el, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" });
        },
      });
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="home" ref={root}>
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner container">
        <div className="hero__top">
          <p className="hero__intro">
            Full-stack developer crafting<br />
            clean, scalable web experiences.
          </p>
        </div>

        <h1 className="hero__title">
          {site.heroLines.map((line, i) => (
            <span className="hero__line" key={i}>
              <span className="hero__line-inner">
                {line}
                {i === site.heroLines.length - 1 && <em className="hero__dot">.</em>}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__meta">
          <p className="hero__lead">
            <span className="hero__lead-name">{site.firstName} {site.lastName} — a</span>
            <span className="hero__role accent" ref={role}>{site.roles[0]}</span>
            <span className="hero__tagline">{site.tagline}</span>
          </p>
          <div className="hero__meta-side">
            <span className="hero__loc">{site.location}</span>
            <a className="btn" href="#work" onClick={(e) => { e.preventDefault(); scrollTo("#work"); }} data-cursor="hover">
              View work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>

      <button
        className="hero__cue"
        onClick={() => scrollTo("#about")}
        aria-label="Scroll to content"
        data-cursor="hover"
      >
        <span className="hero__cue-line" />
        Scroll
      </button>
    </section>
  );
}

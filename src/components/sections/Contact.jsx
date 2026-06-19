import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { scrollTo } from "../../lib/SmoothScroll";
import { site, socials } from "../../data/site";
import "./Contact.css";

export default function Contact() {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact__line-inner", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".contact__cta", start: "top 80%" },
      });
      gsap.from(".contact__reveal", {
        autoAlpha: 0, y: 30, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".contact__details", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="contact section" id="contact" ref={root}>
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <span className="eyebrow contact__reveal">( Contact )</span>

        <a
          className="contact__cta"
          href={`mailto:${site.email}`}
          data-cursor-text="Email"
          data-cursor="hover"
        >
          <span className="contact__line"><span className="contact__line-inner">Let’s build</span></span>
          <span className="contact__line"><span className="contact__line-inner">something<em> ✦ </em>great</span></span>
        </a>

        <div className="contact__details">
          <div className="contact__block contact__reveal">
            <span className="contact__label">Email</span>
            <a href={`mailto:${site.email}`} className="contact__email" data-cursor="hover">{site.email}</a>
          </div>

          <div className="contact__block contact__reveal">
            <span className="contact__label">Socials</span>
            <ul className="contact__socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" data-cursor="hover">
                    <span>{s.label}</span>
                    <span className="contact__handle">{s.handle} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact__block contact__reveal">
            <span className="contact__label">Elsewhere</span>
            <ul className="contact__socials">
              <li><a href={site.resume} target="_blank" rel="noreferrer" data-cursor="hover"><span>Résumé</span><span className="contact__handle">PDF ↗</span></a></li>
              <li><button onClick={() => scrollTo("#home")} data-cursor="hover"><span>Back to top</span><span className="contact__handle">↑</span></button></li>
            </ul>
          </div>
        </div>

        <div className="contact__foot">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Designed &amp; built by {site.firstName}</span>
          <span>{site.location} — {site.timezone}</span>
        </div>
      </div>
    </footer>
  );
}

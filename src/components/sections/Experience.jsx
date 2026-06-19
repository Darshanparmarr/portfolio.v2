import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { experience } from "../../data/site";
import "./Experience.css";

export default function Experience() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Draw the vertical rail as the user scrolls through the list.
      const rail = root.current.querySelector(".experience__rail-fill");
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: ".experience__list",
              start: "top 70%",
              end: "bottom 75%",
              scrub: true,
            },
          }
        );
      }

      // Staggered reveal of each timeline entry.
      gsap.from(".experience__item", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".experience__list", start: "top 82%" },
      });

      // Heading mask reveal.
      gsap.from(".experience__heading-inner", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".experience__head", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="experience section section--alt" id="experience" ref={root}>
      <div className="container">
        <div className="experience__head">
          <span className="eyebrow">( 04 / Experience )</span>
          <h2 className="experience__heading">
            <span className="experience__heading-line">
              <span className="experience__heading-inner">Where I&rsquo;ve</span>
            </span>
            <span className="experience__heading-line">
              <span className="experience__heading-inner">
                <em className="accent">worked</em>
              </span>
            </span>
          </h2>
        </div>

        <div className="experience__timeline">
          <span className="experience__rail" aria-hidden="true">
            <span className="experience__rail-fill" />
          </span>

          <ol className="experience__list">
            {experience.map((item, i) => (
              <li
                className={
                  "experience__item" +
                  (item.current ? " experience__item--current" : "")
                }
                key={`${item.company}-${i}`}
              >
                <span className="experience__marker" aria-hidden="true">
                  <span className="experience__dot" />
                  {item.current && <span className="experience__pulse" />}
                </span>

                <div className="experience__content">
                  <div className="experience__meta">
                    <span className="experience__period">{item.period}</span>
                    {item.current && (
                      <span className="experience__now">Current</span>
                    )}
                  </div>

                  <h3 className="experience__role">{item.role}</h3>

                  <p className="experience__company">
                    <strong>{item.company}</strong>
                    {item.location && (
                      <span className="experience__loc">/ {item.location}</span>
                    )}
                  </p>

                  {item.summary && (
                    <p className="experience__summary">{item.summary}</p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <ul className="experience__tags">
                      {item.tags.map((tag) => (
                        <li className="experience__tag" key={tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

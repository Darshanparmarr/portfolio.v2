import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { site, about } from "../../data/site";
import "./About.css";

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word color scrub on the big statement
      gsap.to(".about__word", {
        color: "var(--fg)",
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".about__statement",
          start: "top 80%",
          end: "center 60%",
          scrub: true,
        },
      });

      // Portrait parallax — gentle scale settle
      gsap.fromTo(
        ".about__img",
        { scale: 1.14 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".about__portrait",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Right-column fade-up on enter
      gsap.from(".about__reveal", {
        y: 30,
        autoAlpha: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: ".about__body", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Split the statement into words while preserving spaces
  const words = about.statement.split(" ");

  return (
    <section className="about section" id="about" ref={root}>
      <div className="container">
        <span className="eyebrow about__eyebrow">( 01 / About )</span>

        <h2 className="about__statement">
          <span className="about__sr-only">{about.statement}</span>
          {words.map((word, i) => (
            <span className="about__word" key={i} aria-hidden="true">
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        <div className="about__grid">
          <figure className="about__portrait">
            <div className="about__frame">
              <img
                className="about__img"
                src={site.profileImage}
                alt={site.name}
                loading="lazy"
              />
              <span className="about__tint" aria-hidden="true" />
            </div>
            <figcaption className="about__cap">
              <span className="about__cap-dot" aria-hidden="true" />
              {site.location}
            </figcaption>
          </figure>

          <div className="about__body">
            {about.paragraphs.map((p, i) => (
              <p className="about__p about__reveal" key={i}>
                {p}
              </p>
            ))}

            <blockquote className="about__quote about__reveal">
              <span className="about__quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              {about.quote}
            </blockquote>

            <dl className="about__facts about__reveal">
              {about.facts.map((f) => (
                <div className="about__fact" key={f.label}>
                  <dt className="about__fact-label">{f.label}</dt>
                  <dd className="about__fact-value">{f.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="about__tags about__reveal" aria-label="Interests">
              {about.interests.map((it) => (
                <li className="about__tag" key={it}>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

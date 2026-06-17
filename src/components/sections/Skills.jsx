import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { skills } from "../../data/site";
import "./Skills.css";

export default function Skills() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".skills__row").forEach((row) => {
        const st = { trigger: row, start: "top 85%" };

        gsap.from(row, {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: st,
        });

        const line = row.querySelector(".skills__line");
        if (line) {
          gsap.from(line, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: st,
          });
        }

        const tags = row.querySelectorAll(".skills__tag");
        if (tags.length) {
          gsap.from(tags, {
            y: 14,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.04,
            scrollTrigger: st,
          });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="skills section section--alt" id="skills" ref={root}>
      <div className="container">
        <header className="skills__head">
          <span className="eyebrow">( 02 / Capabilities )</span>
          <h2 className="skills__title">
            Stack &amp; <span className="accent">tooling</span>
          </h2>
        </header>

        <ul className="skills__list">
          {skills.map((entry, i) => (
            <li className="skills__row" key={entry.group}>
              <span className="skills__line" aria-hidden="true" />

              <span className="skills__index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="skills__group">{entry.group}</h3>

              <ul className="skills__tags" aria-label={`${entry.group} skills`}>
                {entry.items.map((item) => (
                  <li className="skills__tag" key={item} data-cursor="hover">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

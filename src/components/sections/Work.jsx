import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { projects } from "../../data/projects";
import "./Work.css";

export default function Work() {
  const root = useRef(null);
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const previewImgRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  // Detect hover-incapable (touch) devices — drives the inline-image fallback.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: none)");
    const apply = () => setIsTouch(mq.matches);
    apply();
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  // Scroll reveal for every row + the heading mask.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".work__head-inner", {
        yPercent: 110,
        duration: 1.05,
        ease: "power4.out",
        scrollTrigger: { trigger: ".work__head", start: "top 85%" },
      });
      gsap.from(".work__row", {
        y: 60,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: listRef.current, start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Desktop signature interaction: one shared cursor-following image preview.
  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;
    if (!previewRef.current || !listRef.current || !previewImgRef.current) return;

    const ctx = gsap.context(() => {
      const preview = previewRef.current;
      const img = previewImgRef.current;
      const list = listRef.current;

      gsap.set(preview, { autoAlpha: 0, scale: 0.85, xPercent: -50, yPercent: -50 });

      const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3" });

      const onMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const show = (src) => {
        if (!src) return;
        if (img.getAttribute("src") !== src) img.setAttribute("src", src);
        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" });
      };
      const hide = () => {
        gsap.to(preview, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: "power3.out" });
      };

      window.addEventListener("mousemove", onMove);

      const rows = Array.from(list.querySelectorAll("[data-preview]"));
      const cleanups = rows.map((row) => {
        const src = row.getAttribute("data-preview");
        const enter = () => show(src);
        const leave = () => hide();
        row.addEventListener("mouseenter", enter);
        row.addEventListener("mouseleave", leave);
        return () => {
          row.removeEventListener("mouseenter", enter);
          row.removeEventListener("mouseleave", leave);
        };
      });

      return () => {
        window.removeEventListener("mousemove", onMove);
        cleanups.forEach((fn) => fn());
      };
    }, root);

    return () => ctx.revert();
  }, [isTouch]);

  const heading = "Selected work";

  return (
    <section className="work section" id="work" ref={root}>
      <div className="container">
        <span className="eyebrow">( 03 / Selected Work )</span>

        <h2 className="work__head">
          <span className="work__head-inner">{heading}</span>
        </h2>

        <div className="work__list" ref={listRef}>
          {projects.map((p) => {
            const meta = (
              <>
                <span className="work__index">{p.index}</span>

                <span className="work__title-wrap">
                  <span className="work__title">{p.title}</span>
                  {p.link ? <span className="work__arrow" aria-hidden="true">↗</span> : null}
                </span>

                {isTouch && (
                  <span className="work__inline-wrap">
                    <img
                      className="work__inline"
                      src={p.image}
                      alt={`${p.title} preview`}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                )}

                <span className="work__info">
                  <span className="work__meta">
                    {p.category} <span className="work__sep" aria-hidden="true">·</span> {p.year}{" "}
                    <span className="work__sep" aria-hidden="true">·</span> {p.role}
                  </span>
                  <span className="work__stack">
                    {p.stack.map((s) => (
                      <span className="work__tag" key={s}>{s}</span>
                    ))}
                  </span>
                </span>
              </>
            );

            return p.link ? (
              <a
                key={p.id}
                className="work__row"
                href={p.link}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                data-cursor-text="View"
                data-preview={p.image}
                aria-label={`${p.title} — open project (opens in new tab)`}
              >
                {meta}
              </a>
            ) : (
              <div
                key={p.id}
                className="work__row work__row--static"
                data-preview={p.image}
              >
                {meta}
              </div>
            );
          })}
        </div>
      </div>

      {!isTouch && (
        <div className="work__preview" ref={previewRef} aria-hidden="true">
          <img className="work__preview-img" ref={previewImgRef} alt="" />
        </div>
      )}
    </section>
  );
}

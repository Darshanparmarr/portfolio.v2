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

  // Preload project screenshots on mount to ensure instant responsiveness on hover
  useEffect(() => {
    projects.forEach((p) => {
      if (p.image) {
        const img = new Image();
        img.src = p.image;
      }
    });
  }, []);

  // Desktop signature interaction: one shared cursor-following image preview.
  useEffect(() => {
    if (!previewRef.current || !listRef.current || !previewImgRef.current) {
      console.warn("Work Section: Missing refs for preview interaction.", {
        previewRef: !!previewRef.current,
        listRef: !!listRef.current,
        previewImgRef: !!previewImgRef.current
      });
      return;
    }

    const ctx = gsap.context(() => {
      const preview = previewRef.current;
      const img = previewImgRef.current;
      const list = listRef.current;

      console.log("Work Section: Initializing desktop cursor-following image preview interaction.");

      // Position center of preview at 0, 0 (transform-wise)
      gsap.set(preview, { autoAlpha: 0, scale: 0.85, xPercent: -50, yPercent: -50 });

      // Create quickTo functions for ultra-smooth tracking
      const xTo = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
      const rotateTo = gsap.quickTo(img, "rotation", { duration: 0.5, ease: "power3" });
      const skewXTo = gsap.quickTo(img, "skewX", { duration: 0.5, ease: "power3" });

      let lastX = window.innerWidth / 2;
      let lastY = window.innerHeight / 2;
      let lastTime = performance.now();
      let tiltTimeout = null;

      const onMove = (e) => {
        lastX = e.clientX;
        lastY = e.clientY;

        if (prefersReducedMotion) {
          // If reduced motion is enabled, position instantly without smooth ease
          gsap.set(preview, { x: e.clientX, y: e.clientY });
        } else {
          xTo(e.clientX);
          yTo(e.clientY);

          // Calculate horizontal velocity for the tilt effect
          const now = performance.now();
          const dt = now - lastTime;
          if (dt > 0) {
            const dx = e.clientX - lastX;
            const speedX = dx / dt; // pixels per millisecond
            
            // Clamp values for a clean, premium tilt
            const targetRot = gsap.utils.clamp(-12, 12, speedX * 8);
            const targetSkew = gsap.utils.clamp(-8, 8, speedX * 5);
            
            rotateTo(targetRot);
            skewXTo(targetSkew);
          }
          lastTime = now;
        }

        // Reset tilt back to 0 when the mouse stops moving
        if (tiltTimeout) clearTimeout(tiltTimeout);
        tiltTimeout = setTimeout(() => {
          rotateTo(0);
          skewXTo(0);
        }, 80);
      };

      // Listen to mousemove globally
      window.addEventListener("mousemove", onMove);

      const show = (src) => {
        if (!src) return;
        console.log(`Work Section: Hover ENTER, loading preview image: ${src}`);

        // Set position instantly to current mouse coordinates to prevent lag from 0, 0
        gsap.set(preview, { x: lastX, y: lastY });
        xTo(lastX);
        yTo(lastY);

        if (img.getAttribute("src") !== src) {
          // Snappy image swap transition
          gsap.timeline()
            .to(img, { scale: 0.92, opacity: 0.4, duration: 0.12, ease: "power2.in" })
            .call(() => {
              console.log(`Work Section: Setting image src to ${src}`);
              img.setAttribute("src", src);
            })
            .to(img, { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" });
        } else {
          gsap.to(img, { scale: 1, opacity: 1, duration: 0.2 });
        }

        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
      };

      const hide = () => {
        console.log("Work Section: Hover LEAVE, hiding preview image.");
        gsap.to(preview, { autoAlpha: 0, scale: 0.85, duration: 0.35, ease: "power3.out" });
        gsap.to(img, { rotation: 0, skewX: 0, scale: 1, opacity: 1, duration: 0.35 });
      };

      const rows = Array.from(list.querySelectorAll("[data-preview]"));
      console.log(`Work Section: Binding events to ${rows.length} project items.`);

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
        if (tiltTimeout) clearTimeout(tiltTimeout);
        cleanups.forEach((fn) => fn());
      };
    }, root);

    return () => ctx.revert();
  }, []); // Run once on mount; handles dynamically and does not rely on isTouch dependency.

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

      {/* Render preview DOM element always to prevent React mounting race conditions */}
      <div className="work__preview" ref={previewRef} aria-hidden="true">
        <img className="work__preview-img" ref={previewImgRef} alt="" />
      </div>
    </section>
  );
}

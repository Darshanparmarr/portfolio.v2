import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import { scrollTo } from "../lib/SmoothScroll";
import "./Navbar.css";

const LINKS = [
  { label: "About", target: "#about" },
  { label: "Skills", target: "#skills" },
  { label: "Projects", target: "#work" },
  { label: "Experience", target: "#experience" },
  { label: "Contact", target: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + manage focus while the fullscreen menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    window.__lenis?.[open ? "stop" : "start"]?.();

    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => menuRef.current?.querySelector("a")?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  const go = (e, target) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    setTimeout(() => scrollTo(target), wasOpen ? 350 : 0);
  };

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-menu-open" : ""}`}>
        <a href="#home" className="nav__brand" onClick={(e) => go(e, "#home")} data-cursor="hover">
          {site.firstName}<span>°</span>
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.target} href={l.target} onClick={(e) => go(e, l.target)} data-cursor="hover">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <span className="nav__status">
            <i /> {site.available ? "Available" : "Busy"}
          </span>
          <button
            ref={burgerRef}
            className={`nav__burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="menu__links">
          {LINKS.map((l, i) => (
            <a
              key={l.target}
              href={l.target}
              onClick={(e) => go(e, l.target)}
              style={{ transitionDelay: `${0.06 * i + 0.1}s` }}
              tabIndex={open ? 0 : -1}
              data-cursor="hover"
            >
              <span className="menu__index">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <span>{site.location}</span>
          <a href={site.resume} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} data-cursor="hover">
            Résumé ↗
          </a>
        </div>
      </div>
    </>
  );
}

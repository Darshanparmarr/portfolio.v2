import { useState, useEffect, useCallback } from "react";
import { ScrollTrigger } from "./lib/gsap";
import SmoothScroll from "./lib/SmoothScroll";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Work from "./components/sections/Work";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";

function App() {
  const [ready, setReady] = useState(false);

  // Stable callback — keeps Preloader's effect from re-running (and re-locking
  // scroll) when `ready` flips and App re-renders.
  const onReady = useCallback(() => setReady(true), []);

  // Safety net: reveal the hero even if the preloader never reports completion.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 6000);
    return () => clearTimeout(t);
  }, []);

  // Recompute ScrollTrigger start/end positions once the intro hands over and
  // async layout (fonts, lazy images) has settled — they were created while the
  // preloader pinned the page at scroll 0.
  useEffect(() => {
    if (!ready) return;
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    const t = setTimeout(refresh, 600);
    window.addEventListener("load", refresh);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, [ready]);

  return (
    <SmoothScroll>
      <Preloader onComplete={onReady} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Cursor />
    </SmoothScroll>
  );
}

export default App;

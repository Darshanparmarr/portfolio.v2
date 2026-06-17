# portfolio.v2

Personal portfolio of **Darshan Parmar** — Software Developer (Mumbai, India).

A bespoke, single-page, motion-driven site: cinematic dark theme with a warm amber accent,
smooth scrolling (Lenis) and scroll-driven animation (GSAP/ScrollTrigger). Built with React (CRA).

## Tech
- React 17 (Create React App)
- GSAP + ScrollTrigger (animation)
- Lenis (smooth scroll)
- Plain CSS with a token-based design system

## Run locally
```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build → /build
```

## Editing content
Everything is data-driven — no JSX edits needed:
- `src/data/site.js` — name, roles, bio, skills, experience, socials, email
- `src/data/projects.js` — projects (add an entry + a screenshot in `public/work/`)
- `src/styles/tokens.css` — colors, fonts, spacing, motion

See `PORTFOLIO_GUIDE.md` for full editing notes.

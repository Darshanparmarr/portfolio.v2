# Portfolio — editing guide

A bespoke single-page portfolio: **React (CRA) + GSAP/ScrollTrigger + Lenis** smooth scroll.
Dark "cinematic" theme with a warm amber accent. Everything content-related is **data-driven** — you edit data files, not JSX.

## Run it

```bash
npm install      # first time only
npm start        # dev server → http://localhost:3000
npm run build    # production build into /build
```

> The deploy treats lint warnings as errors. Before pushing, sanity-check with
> `CI=true npm run build` (PowerShell: `$env:CI="true"; npm run build`).

## Where to edit things

| Want to change…                         | Edit                                   |
|-----------------------------------------|----------------------------------------|
| Name, roles, bio, quote, email, socials | `src/data/site.js`                     |
| Skills & tools                          | `src/data/site.js` → `skills`          |
| Work experience / timeline              | `src/data/site.js` → `experience`      |
| **Projects** (the Work section)         | `src/data/projects.js`                 |
| Colors, fonts, spacing, motion          | `src/styles/tokens.css`                |

### Add a new project
1. Drop a screenshot in `public/work/`, e.g. `public/work/my-app.png`.
2. Copy the template block at the bottom of `src/data/projects.js`, fill it in,
   set `image: "/work/my-app.png"`. The layout adapts automatically.

### Swap in your real assets (placeholders are in place now)
- **Your photo:** add `public/profile.jpg`, then set `profileImage: "/profile.jpg"` in `src/data/site.js`.
- **Project shots:** replace `public/work/techupgrad.png` / `thirtysix.png` (or add new ones).
- **Email:** set the real address in `site.js` (`email:`), used by the Contact section.
- **Résumé:** replace `public/DarshanParmarResume.pdf`.

## Notes
- Respects `prefers-reduced-motion` (animations/smooth-scroll soften or disable).
- Custom cursor + floating project preview show on pointer devices; touch gets inline images.
- Unused template files left in `src/Assets/` are safe to delete.

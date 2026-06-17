/* =========================================================================
   PROJECTS — the centerpiece. Fully data-driven.

   ▸ To ADD a project: copy the template at the bottom, drop a screenshot in
     public/work/your-image.png, and add the object to the array.
   ▸ The Work section adapts its layout to however many projects exist.
   ▸ `image` is a path inside /public (no import needed).
   ========================================================================= */

export const projects = [
  {
    id: "techupgrad",
    index: "01",
    title: "TechUpgrad",
    year: "2025",
    category: "E-Learning Platform",
    role: "Full-Stack Developer",
    description:
      "A full-featured e-learning portal supporting both online and offline learning — built for a seamless student experience with robust course management and secure data handling.",
    stack: ["Laravel", "PHP", "Tailwind CSS", "PostgreSQL"],
    image: "/work/techupgrad.png",
    link: "https://www.techupgrad.in/",
    featured: true,
  },
  {
    id: "thirtysix",
    index: "02",
    title: "Thirtysix Studios",
    year: "2024",
    category: "Creative Front-End",
    role: "Front-End Developer",
    description:
      "A pixel-faithful, 100% React.js recreation of an Awwwards-recognised studio site — focused on premium UI/UX, smooth scroll-driven animation and modern interactivity.",
    stack: ["React.js", "GSAP", "JavaScript"],
    image: "/work/thirtysix.png",
    link: "https://thirtysixstudiosclone.vercel.app/",
    featured: true,
  },

  /* ----- TEMPLATE — copy this block to add a new project ------------------
  {
    id: "unique-slug",
    index: "03",
    title: "Project Name",
    year: "2026",
    category: "Web App",
    role: "Full-Stack Developer",
    description: "One or two punchy sentences on what it does and your role.",
    stack: ["React.js", "Node.js", "MySQL"],
    image: "/work/your-screenshot.png", // file lives in public/work/
    link: "https://live-url.com",        // omit / set "" if no live link
    featured: true,
  },
  ------------------------------------------------------------------------- */
];

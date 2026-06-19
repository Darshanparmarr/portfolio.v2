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
  {
    id: "homemade-desi-rasoi",
    index: "02",
    title: "Akshar ECommerce",
    year: "2025",
    category: "E-Commerce",
    role: "Full-Stack Developer",
    description:
      "Developed a MERN-based e-commerce platform with secure authentication, invoice generation, WhatsApp integration, AI chatbot support, and order management.",
    stack: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    image: "/work/AksharFruitsLaptop.png",
    link: "https://homemade-desi-rasoi.vercel.app/",
    featured: true,
  },
  {
    id: "akshar-connect",
    index: "03",
    title: "Akshar Connect",
    year: "2026",
    category: "Organization Management System",
    role: "Full-Stack Developer",
    description:
      "Built a large-scale management platform serving 5,000+ users with attendance tracking, approval workflows, hierarchy management, and real-time notifications.",
    stack: ["React.js", "PHP", "Laravel", "MySQL", "Bootstrap"],
    image: "/work/AksharConnectLaptop.png",
    link: "https://aksharmandal.in/aksharconnect/",
    featured: true,
  },
  {
    id: "positive-quadrant",
    index: "04",
    title: "Positive Quadrant",
    year: "2025",
    category: "Business Website",
    role: "Full-Stack Developer",
    description:
      "Developed a dynamic business website with responsive design, animations, optimized media delivery, and engaging user experiences.",
    stack: ["PHP", "JavaScript", "MySQL", "Bootstrap"],
    image: "/work/PQLaptop.png",
    link: "https://www.positivequadrant.in/",
    featured: true,
  },
  {
    id: "binary-power",
    index: "06",
    title: "Binary Power",
    year: "2026",
    category: "Client Website",
    role: "Freelance Developer",
    description:
      "Designed and developed a responsive corporate website for an industrial power solutions company with product showcases and lead generation features.",
    stack: ["React.js", "JavaScript", "Bootstrap"],
    image: "/work/binarypowerlaptop.png",
    link: "https://www.binarypower.in/",
    featured: false,
  },
  {
    id: "travel-trend-research",
    index: "07",
    title:
      "Research Paper - Travel",
    year: "2026",
    category: "Research Publication",
    role: "Research Author",
    description:
      "Published research exploring AI, NLP, sentiment analysis, and Named Entity Recognition to predict emerging tourism destinations from travel vlog content.",
    stack: ["Python", "NLP", "Machine Learning", "NER", "Data Analysis"],
    image: "/work/researchpaper1.png",
    link: "https://iaraedu.com/about-journal/ijair-volume-13-issue-1-v-january-march-2026.php",
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

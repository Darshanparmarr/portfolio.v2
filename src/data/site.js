/* =========================================================================
   SITE CONTENT — your single editable source of truth.
   Update text here and it flows into every section. No JSX edits required.
   ========================================================================= */

export const site = {
  name: "Darshan Parmar",
  firstName: "Darshan",
  lastName: "Parmar",
  initials: "DP",

  // Rotating hero roles
  roles: ["Full-Stack Developer", "Frontend Developer", "Freelancer", "Backend Developer"],
  // Two-line monumental hero statement
  heroLines: ["SOFTWARE", "DEVELOPER"],
  tagline: "Turning ideas into meaningful digital experiences.",

  location: "Mumbai, India",
  timezone: "IST (GMT+5:30)",

  // Availability pill in the hero / contact
  available: true,
  availabilityNote: "Open to freelance & full-time roles",

  // TODO ▸ replace with your real public email
  email: "darshuparmar67@gmail.com",

  // Lives in /public — drop the file there and the link just works
  resume: "/DarshanParmarResume.pdf",

  profileImage: "/DarshanParmar.jpeg",
};

export const about = {
  // Big intro statement, rendered word-by-word with a scroll reveal
  statement:
    "I’m a full-stack developer who loves turning ideas into clean, scalable products — crafting responsive interfaces in React and dependable backends with Laravel & PHP.",
  paragraphs: [
    "Based in Mumbai, India, I work across the whole stack: building user-friendly front-ends with React.js and engineering robust server-side logic, REST APIs and databases with Laravel, PHP and MySQL.",
    "I care about the details — smooth interactions, clean code and experiences that feel considered. Currently pursuing my MSc IT at SVKM’s UPG College while taking on freelance work.",
  ],
  quote: "Discipline works even when motivation doesn’t.",
  facts: [
    { label: "Based in", value: "Mumbai, India" },
    { label: "Education", value: "MSc IT — SVKM’s UPG College" },
    { label: "Focus", value: "Full-Stack Web Apps" },
    { label: "Status", value: "Available for work" },
  ],
  interests: ["Music", "Spiritual Assembly", "Travelling"],
};

export const socials = [
  { label: "GitHub",    handle: "Darshanparmarr",  url: "https://github.com/Darshanparmarr" },
  { label: "LinkedIn",  handle: "darshanparmarr",  url: "https://www.linkedin.com/in/darshanparmarr" },
  { label: "Instagram", handle: "darshanparmar._", url: "https://www.instagram.com/darshanparmar._/" },
];

/* Skill groups — add/remove freely; the grid adapts to the number of groups. */
export const skills = [
  {
    group: "Frontend",
    items: [
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Next.js"
    ]
  },
  {
    group: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "Microservices",
      "PHP",
      "Laravel",
      "Node.js",
      "Python"
    ]
  },
  {
    group: "Database",
    items: [
      "MySQL",
      "PostgreSQL",
      "JPA"
    ]
  },
  {
    group: "Tooling & AI",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Canva",
      "Cursor",
      "Windsurf",
      "Claude CLI",
      "Antigravity",
      "Version Control System"
    ]
  }
];

/* Experience timeline — newest first. */
export const experience = [
  {
    role: "Full-Stack Developer Intern",
    company: "Avadhan Softtech",
    period: "November 2025 – April 2026",
    location: "Remote",
    current: false,
    summary:
      "Developed responsive web applications by contributing to both frontend and backend development. Built user-friendly interfaces, implemented backend logic using Core Java and Python, integrated APIs, and ensured cross-browser compatibility. Collaborated in an agile environment to deliver scalable, high-performance solutions while maintaining clean, efficient, and maintainable code.",
    tags: ["React.js","Next.js" , "Java", "Python", "MySQL", "Git"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Positive Quadrant Technologies LLP",
    period: "Apr 2025 — Oct 2025",
    location: "Remote",
    current: false,
    summary:
      "Built dynamic web apps with React.js, PHP & Laravel — RESTful APIs, authentication and MySQL integration. Refined UI/UX, collaborated via Git/GitHub in an Agile workflow, and owned end-to-end tasks from branding and logo design to client documentation.",
    tags: ["React.js", "PHP", "Python", "MySQL", "Git"],
  },
  {
    role: "Python Developer Intern",
    company: "Codsoft",
    period: "Feb 2024 — Mar 2024",
    location: "Remote",
    current: false,
    summary:
      "Delivered structured Python projects within deadlines, applying strong problem-solving skills and quickly picking up new tools. Communicated clearly with stakeholders to ensure on-time delivery.",
    tags: ["Python", "Problem Solving"],
  },
];

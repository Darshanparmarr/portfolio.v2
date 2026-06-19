import "./Marquee.css";

const WORDS = [
  "React.js", "Microservices", "Java", "Spring Boot", "MySQL",
  "JPA", "Bootstrap", "Tailwind", "Next.js", "Git", "Node.js"
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS]; // duplicate for a seamless loop
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((w, i) => (
          <span className="marquee__item" key={i}>
            {w}
            <i className="marquee__star">✦</i>
          </span>
        ))}
      </div>
    </section>
  );
}

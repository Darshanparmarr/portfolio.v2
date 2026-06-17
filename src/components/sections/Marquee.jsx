import "./Marquee.css";

const WORDS = [
  "React.js", "Laravel", "PHP", "Full-Stack", "MySQL",
  "UI / UX", "JavaScript", "Freelance", "Clean Code", "Tailwind",
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

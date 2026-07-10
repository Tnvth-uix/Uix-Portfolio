import Link from "next/link";

export default function DeckCard({ deck, index }) {
  return (
    <Link href={`/projects/${deck.slug}`} className="deck-card">
      <div className="cover" />
      <div className="idx">{String(index + 1).padStart(2, "0")}</div>
      <div>
        <div className="client">{deck.client}</div>
        <h3>{deck.title}</h3>
        <p>{deck.subtitle}</p>
        <div className="tag-row">
          {deck.slides.slice(0, 4).map((s, i) => (
            <span className="tag" key={i}>
              {s.title}
            </span>
          ))}
        </div>
      </div>
      <span className="go">
        Ver presentación <span className="arw">→</span>
      </span>
    </Link>
  );
}

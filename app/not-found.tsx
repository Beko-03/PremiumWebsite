import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: "center" }}>
      <p className="eyebrow" style={{ justifyContent: "center" }}>
        404
      </p>
      <h1>Seite nicht gefunden</h1>
      <p className="page-hero__lede" style={{ marginInline: "auto" }}>
        Diese Seite gibt es nicht (mehr). Vielleicht hilft dir der Shop oder die Startseite weiter.
      </p>
      <p style={{ marginTop: "2rem" }}>
        <Link className="btn btn--primary" href="/">
          Zur Startseite
        </Link>
      </p>
    </div>
  );
}

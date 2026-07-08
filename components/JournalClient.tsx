"use client";

import Link from "next/link";
import PostCard from "@/components/PostCard";
import { sortedArticles } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

const T = {
  eyebrow: { de: "Brühwissen · Herkunft · Neues", en: "Brew knowledge · Origin · News" },
  title: { de: "Das Marlow-Journal", en: "The Marlow journal" },
  lede: {
    de: "Alles, was wir über Kaffee wissen, gehört nicht in einen Tresor, sondern in deine Küche: Rezepte, Reiseberichte und ehrliche Einblicke in die Rösterei.",
    en: "Nothing we know about coffee belongs in a vault — it belongs in your kitchen: recipes, travel notes and honest looks inside the roastery.",
  },
};

export default function JournalClient() {
  const { L, t } = useI18n();
  const articles = sortedArticles();

  return (
    <div className="container">
      <nav className="breadcrumbs" aria-label="Brotkrumen">
        <ol>
          <li>
            <Link href="/">{t("crumb.home")}</Link>
          </li>
          <li aria-current="page">{t("nav.journal")}</li>
        </ol>
      </nav>

      <header className="page-hero">
        <p className="eyebrow">{L(T.eyebrow)}</p>
        <h1>{L(T.title)}</h1>
        <p className="page-hero__lede">{L(T.lede)}</p>
      </header>

      <div className="post-grid" style={{ paddingBottom: "var(--section-pad)" }}>
        {articles.map((article) => (
          <PostCard key={article.id} article={article} headingTag="h2" />
        ))}
      </div>
    </div>
  );
}

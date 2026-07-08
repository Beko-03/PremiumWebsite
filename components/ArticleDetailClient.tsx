"use client";

import Link from "next/link";
import PostCard from "@/components/PostCard";
import { articles, type Article } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

const T = {
  moreEyebrow: { de: "Weiterlesen", en: "Keep reading" },
  moreTitle: { de: "Das könnte dir auch schmecken", en: "You might like these too" },
};

export default function ArticleDetailClient({ article }: { article: Article }) {
  const { L, t, fmtDate } = useI18n();
  const related = articles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Brotkrumen">
          <ol>
            <li>
              <Link href="/">{t("crumb.home")}</Link>
            </li>
            <li>
              <Link href="/journal/">{t("nav.journal")}</Link>
            </li>
            <li aria-current="page">{L(article.title)}</li>
          </ol>
        </nav>

        <article className="prose">
          <header className="prose__head">
            <p className="post-card__meta" style={{ justifyContent: "center" }}>
              <span className="post-card__tag">{L(article.tag)}</span>
              <span>{fmtDate(article.date)}</span>
              <span>·</span>
              <span>{article.minutes} min</span>
            </p>
            <h1>{L(article.title)}</h1>
          </header>
          <div className="media-band">
            <img src={article.img} alt="" width={1280} height={720} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: L(article.body) }} />
        </article>
      </div>

      <section className="quotes section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">{L(T.moreEyebrow)}</p>
            <h2>{L(T.moreTitle)}</h2>
          </div>
          <div className="post-grid">
            {related.map((a) => (
              <PostCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

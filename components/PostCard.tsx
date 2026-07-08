"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import type { Article } from "@/lib/data";

export default function PostCard({
  article,
  headingTag: H = "h3",
}: {
  article: Article;
  headingTag?: "h2" | "h3";
}) {
  const { L, lang, fmtDate } = useI18n();
  const href = `/artikel/${article.id}/`;

  return (
    <article className="post-card reveal is-visible">
      <Link className="post-card__img" href={href} tabIndex={-1} aria-hidden="true">
        <img src={article.img} alt="" loading="lazy" width={640} height={360} />
      </Link>
      <div className="post-card__body">
        <p className="post-card__meta">
          <span className="post-card__tag">{L(article.tag)}</span>
          <span>{fmtDate(article.date)}</span>
          <span>·</span>
          <span>{article.minutes} min</span>
        </p>
        <H>
          <Link href={href}>{L(article.title)}</Link>
        </H>
        <p>{L(article.excerpt)}</p>
        <span className="post-card__more">{lang === "de" ? "Weiterlesen →" : "Read more →"}</span>
      </div>
    </article>
  );
}

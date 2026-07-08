import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailClient from "@/components/ArticleDetailClient";
import { articleById, articles, loc } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = articleById(id);
  if (!article) return {};
  const title = loc(article.title, "de");
  return {
    title,
    description: loc(article.excerpt, "de"),
    alternates: { canonical: `/artikel/${article.id}/` },
    openGraph: {
      type: "article",
      title: `${title} — Marlow Journal`,
      description: loc(article.excerpt, "de"),
      images: [article.img],
    },
  };
}

export default async function ArtikelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = articleById(id);
  if (!article) notFound();

  return <ArticleDetailClient article={article} />;
}

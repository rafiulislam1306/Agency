import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { blogPlaybooks } from "@/lib/blogData";
import CTAButton from "@/components/CTAButton";

interface BlogArticleProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPlaybooks.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPlaybooks.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Playbook Not Found" };
  }
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogArticlePage({ params }: BlogArticleProps) {
  const { slug } = await params;
  const post = blogPlaybooks.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-canvas min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-ink-secondary hover:text-trust transition-colors group"
          >
            <ArrowLeft
              className="w-4 h-4 mr-2 transition-transform duration-150 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to All Playbooks
          </Link>
        </div>

        <header className="space-y-4 border-b border-border-hairline pb-8">
          <div className="text-xs font-mono font-medium text-ink-muted">
            <span className="text-kpi-positive font-semibold">
              {post.category}
            </span>
            <span aria-hidden="true"> · </span>
            <span>{post.readTime}</span>
            <span aria-hidden="true"> · </span>
            <span>Updated {post.updatedAt}</span>
          </div>

          <h1 className="type-hero font-display font-extrabold text-ink">
            {post.title}
          </h1>

          <p className="type-lead text-ink-secondary">
            {post.summary}
          </p>
        </header>

        {/* Key Takeaway Callout */}
        <div className="bg-subtle border border-border-hairline rounded-tile p-5 sm:p-6 space-y-1.5">
          <span className="eyebrow-mono text-trust block">
            Key Takeaway
          </span>
          <p className="text-sm sm:text-base font-medium text-ink leading-relaxed">
            {post.keyTakeaway}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="type-h3 font-display font-bold text-ink">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p}
                  className="text-base text-ink-secondary leading-relaxed prose-measure"
                >
                  {p}
                </p>
              ))}
              {section.checklist ? (
                <ul className="space-y-3 pt-2 bg-subtle border border-border-hairline rounded-tile p-5 sm:p-6">
                  {section.checklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm sm:text-base text-ink"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-kpi-positive shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-border-hairline pt-10 text-center space-y-4">
          <h3 className="type-h3 font-display font-bold text-ink">
            Want Help Implementing This?
          </h3>
          <p className="text-sm sm:text-base text-ink-secondary max-w-md mx-auto">
            Reserve a 30-minute audit and we will walk through every item on your live account.
          </p>
          <div className="pt-2">
            <CTAButton href="/contact" variant="primary" size="lg">
              Book Free 30-Min Audit
            </CTAButton>
          </div>
        </div>
      </div>
    </article>
  );
}

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
    <article className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft
              className="w-4 h-4 mr-2 transition-transform duration-150 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to All Playbooks
          </Link>
        </div>

        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="text-xs font-medium text-slate-500">
            <span className="text-brand-green-hover font-semibold">
              {post.category}
            </span>
            <span aria-hidden="true"> · </span>
            <span>{post.readTime}</span>
            <span aria-hidden="true"> · </span>
            <span>Updated {post.updatedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {post.summary}
          </p>
        </header>

        {/* Key Takeaway Callout */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 space-y-1.5">
          <span className="text-xs font-semibold text-brand-blue block">
            Key Takeaway
          </span>
          <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
            {post.keyTakeaway}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-slate-900">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p}
                  className="text-base text-slate-700 leading-relaxed"
                >
                  {p}
                </p>
              ))}
              {section.checklist ? (
                <ul className="space-y-3 pt-2 bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6">
                  {section.checklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm sm:text-base text-slate-800"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-brand-green shrink-0 mt-1"
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
        <div className="border-t border-slate-200 pt-10 text-center space-y-4">
          <h3 className="text-2xl font-display font-bold text-slate-900">
            Want Help Implementing This?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
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

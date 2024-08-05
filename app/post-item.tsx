"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export function PostItem({
  post,
}: {
  post: {
    slug: string;
    frontmatter: Record<string, unknown>;
    rawContent: string;
  };
}) {
  const publishedAtDate = new Date(post.frontmatter.publishedAt as string);
  const timeAgo = formatDistanceToNow(publishedAtDate, {
    addSuffix: true,
  });

  return (
    <article
      key={post.slug}
      className="flex flex-col items-start justify-between first:mt-0 mt-8 max-w-xl mx-auto"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <p className="text-foreground/70">{timeAgo}</p>
      </div>
      <div className="group relative">
        <h3 className="mt-1 scroll-m-20 text-xl font-semibold tracking-tight">
          <Link href={post.slug}>
            <span className="absolute inset-0" />
            {post.frontmatter.title as string}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-3 text-sm leading-6 text-foreground/70">
          {post.frontmatter.summary as string}
        </p>
      </div>
    </article>
  );
}

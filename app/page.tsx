import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { getBlogPosts } from "@/lib/mdx";
import {
  BookText,
  Github,
  Link as LinkIcon,
  Sparkles,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import profilePicture from "./profile-picture.png";

const BADGES = [
  {
    name: "Working at Antartida",
    url: "https://antartida.io",
    icon: LinkIcon,
  },
  {
    name: "Twitter (X)",
    url: "https://twitter.com/guido_vizoso",
    icon: Twitter,
  },
  {
    name: "Github",
    url: "https://github.com/guidovizoso",
    icon: Github,
  },
  {
    name: "Learning ML/AI",
    icon: Sparkles,
  },
  {
    name: "Focusing on blogging",
    icon: BookText,
  },
];

export const metadata = {
  title: "Guido Vizoso",
  description: "Product Engineer and Frontend Team Lead",
};

export default async function Home() {
  // get posts sorted by publishedAt date
  const posts = await getBlogPosts().then((posts) =>
    posts.sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt as string).getTime() -
        new Date(a.frontmatter.publishedAt as string).getTime()
    )
  );

  return (
    <main className="mx-auto max-w-screen-md w-full px-4 md:px-0 pb-12 md:p-0">
      <Image
        className="mx-auto w-24 h-24 rounded-full mt-20"
        src={profilePicture}
        alt="Profile picture"
        priority
      />
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mt-6 text-center">
        Guido Vizoso
      </h1>
      <p className="text-center mt-2 text-foreground/70">
        Product Engineer and Frontend Team Lead at{" "}
        <Link href="https://antartida.io" target="_blank">
          Antartida
        </Link>
      </p>
      <div className="flex mx-auto flex-row flex-wrap gap-2 items-center justify-center max-w-md mt-6">
        {BADGES.map((badge) => {
          const Icon = badge.icon;

          const containerClassNames = cn(
            "bg-foreground/5 px-2 py-0.5 text-sm border border-border rounded-xl flex flex-row gap-1.5 items-center",
            {
              "hover:bg-foreground/10 transition-all": !!badge.url,
              "cursor-default": !badge.url,
            }
          );

          if (!badge.url)
            return (
              <div key={badge.name} className={containerClassNames}>
                <Icon size={14} />
                {badge.name}
              </div>
            );

          return (
            <Link
              key={badge.name}
              href={badge.url}
              target="_blank"
              className={containerClassNames}
            >
              <Icon size={14} />
              {badge.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-20">
        {posts.map((post) => {
          const publishedAtDate = new Date(
            post.frontmatter.publishedAt as string
          );
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
        })}
      </div>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { getBlogPosts } from "@/lib/mdx";

export const metadata = {
  title: "Guido Vizoso",
  description: "Product Engineer and Frontend Team Lead",
};

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <main className="mx-auto max-w-screen-md w-full px-4 md:px-0">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mt-16">
        Hello there, I&apos;m <span>Guido</span>
      </h1>
      <p>
        I&apos;m a Product Engineer and Frontend Team Lead currently working at{" "}
        <Button
          asChild
          variant="secondary"
          className="px-1.5 py-0.5 h-auto border border-border w-fit inline-flex flex-row items-center gap-1"
        >
          <Link href="https://antartida.io" target="_blank">
            <Image
              src="antartida.svg"
              alt="Antartida logo"
              width={14}
              height={14}
              className="inline-block"
            />
            Antartida
          </Link>
        </Button>
        .
      </p>
      <p>I specialize in Typescript, React and Next.</p>
      <div className="mt-12">
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
              className="flex max-w-xl flex-col items-start justify-between"
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

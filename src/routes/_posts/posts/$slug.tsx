import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import { mdxComponents } from "@/components/mdx-components";

export const Route = createFileRoute("/_posts/posts/$slug")({
  loader: ({ params }) => {
    const { slug } = params;
    const post = allPosts.find((p) => p._meta.path === slug);
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post?.title} | G` },
          { description: loaderData.post?.summary },
        ]
      : undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { post } = useLoaderData({ from: "/_posts/posts/$slug" });
  return (
    <div className="prose">
      <MDXContent code={post?.mdx || ""} components={mdxComponents} />
    </div>
  );
}

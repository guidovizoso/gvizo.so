import { createFileRoute, Link } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

export const Route = createFileRoute("/_posts/posts/")({
	head: () => ({
		meta: [
			{ title: "Articles | G" },
			{ description: "Articles by Guido Vizoso" },
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1 className="font-serif text-3xl leading-relaxed -mt-2">Articles</h1>
			<div className="mt-16">
				{allPosts.map((post, index) => (
					<>
						<Link
							key={post._meta.path}
							params={{ slug: post._meta.path }}
							to={"/posts/$slug"}
							className="flex flex-col"
						>
							<time className="text-muted-foreground text-sm">
								{format(new Date(post.publishedAt), "MMM d, yyyy")}
							</time>
							<div className="flex flex-col-reverse justify-between md:flex-row md:items-center mt-1">
								<h2 className="">{post.title}</h2>
							</div>
							<p className="text-muted-foreground text-sm mt-1">
								{post.summary}
							</p>
						</Link>
						{index !== allPosts.length - 1 && <Separator className="my-4" />}
					</>
				))}
			</div>
		</div>
	);
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format, formatDistanceToNow } from "date-fns";
import { getBlogPosts } from "@/lib/mdx";
import { components } from "./components";
import { config } from "@/config";
import { Stats } from "./stats";

type PageParams = {
	slug: string;
};

type FrontMatter = {
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
};

export async function generateMetadata({
	params,
}: {
	params: Promise<PageParams>;
}): Promise<Metadata | undefined> {
	const { slug } = await params;
	const post = (await getBlogPosts()).find((post) => post.slug === slug);

	if (!post) {
		return;
	}

	const { title, publishedAt, summary, image } =
		post.frontmatter as FrontMatter;

	const ogImage = image
		? `${config.domain}${image}`
		: `${config.domain}/og?title=${title}`;

	return {
		title,
		description: summary,
		openGraph: {
			title,
			description: summary,
			type: "article",
			publishedTime: publishedAt,
			url: `${config.domain}/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: summary,
			images: [{ url: ogImage }],
		},
	};
}

export default async function Post({
	params,
}: {
	params: Promise<PageParams>;
}) {
	const { slug } = await params;
	const post = (await getBlogPosts()).find((post) => post.slug === slug) as {
		slug: string;
		frontmatter: FrontMatter;
		rawContent: string;
	};

	if (!post) {
		return notFound();
	}

	const publishedAtDate = new Date(post.frontmatter.publishedAt);
	const publishedAt = format(publishedAtDate, "MMMM d, yyyy");
	const publishedAgo = formatDistanceToNow(publishedAtDate, {
		addSuffix: true,
	});

	return (
		<main className="mx-auto max-w-screen-md w-full px-4 pb-48 md:px-0">
			<div className="mt-16">
				<h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
					{post.frontmatter.title}
				</h1>
				<div className="flex items-center justify-between gap-x-4 text-sm mt-4">
					<p className="text-foreground/70">
						{publishedAt} ({publishedAgo})
					</p>
					<Stats slug={post.slug} />
				</div>
			</div>
			<div className="mt-12">
				<MDXRemote
					source={post.rawContent}
					components={{ ...components }}
					options={{
						parseFrontmatter: true,
					}}
				/>
			</div>
		</main>
	);
}

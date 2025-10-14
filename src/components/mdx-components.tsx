"use client";

import { Check, Copy } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	CodeBlock,
	CodeBlockCode,
	CodeBlockGroup,
} from "@/components/ui/code-block";

function parseMeta(meta?: string) {
	const out: Record<string, string> = {};
	if (!meta) {
		return out;
	}
	for (const part of meta.split(/\s+/)) {
		const [k, v] = part.split("=");
		if (k && v) {
			out[k] = v.replace(/^"|"$/g, "");
		}
	}
	return out;
}

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = React.useState(false);
	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1600);
		} catch {
			console.error("Failed to copy code");
		}
	};
	return (
		<Button
			aria-label="Copy code"
			className="h-8 w-8"
			onClick={onCopy}
			size="icon"
			title="Copy code"
			type="button"
			variant="ghost"
		>
			{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
		</Button>
	);
}

function LanguagePill({ language }: { language?: string }) {
	if (!language) {
		return null;
	}
	return (
		<span className="rounded bg-primary/10 px-2 py-1 font-medium text-[10px] text-primary uppercase tracking-wide">
			{language}
		</span>
	);
}

function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
	const child = React.Children.only(props.children) as React.ReactElement<{
		children: React.ReactNode;
		className?: string;
	}>;

	// Extract raw code text
	const rawCode =
		typeof child?.props?.children === "string" ? child.props.children : "";

	// Extract language from className
	const className: string = child?.props?.className ?? "";
	const language = className.replace(/^language-/, "") || undefined;

	const metastring = (child?.props as any)?.["data-meta"] || "";
	const meta = parseMeta(metastring);
	const title = meta.title || meta.filename;
	const theme = (meta.theme as any) || "github-light";

	return (
		<CodeBlock className="not-prose my-6">
			{(title || language) && (
				<CodeBlockGroup className="flex items-center justify-between px-4 py-2">
					<div className="flex min-w-0 items-center gap-2">
						{language && <LanguagePill language={language} />}
						{title && (
							<span className="truncate text-muted-foreground text-xs sm:text-sm">
								{title}
							</span>
						)}
					</div>
					<CopyButton text={rawCode} />
				</CodeBlockGroup>
			)}

			<CodeBlockCode
				className="dark:[&_pre]:!bg-background"
				code={rawCode}
				language={language as any}
				theme={theme}
			/>
		</CodeBlock>
	);
}

function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
	return (
		<code
			className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm"
			{...props}
		/>
	);
}

export const mdxComponents = {
	pre: Pre,
	code: InlineCode,
};

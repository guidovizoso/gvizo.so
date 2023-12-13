import { config } from "@/config";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Tweet as CustomTweet } from "@/components/tweet";
import { highlight } from "sugar-high";
import { GithubRepo } from "@/components/github-repo";

// borrowed from https://leerob.io/blog/2023#remark-and-rehype
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}
const SlugifiedLink = ({
  children,
  slugChildren,
}: {
  children: React.ReactNode;
  slugChildren: React.ReactNode;
}) => {
  const slug = slugify(slugChildren as string);

  return (
    <a href={`#${slug}`} id={slug}>
      {children}
    </a>
  );
};

export const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <SlugifiedLink slugChildren={props.children}>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-16">
        {props.children}
      </h2>
    </SlugifiedLink>
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <SlugifiedLink slugChildren={props.children}>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-16">
        {props.children}
      </h3>
    </SlugifiedLink>
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <SlugifiedLink slugChildren={props.children}>
      <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mt-12">
        {props.children}
      </h4>
    </SlugifiedLink>
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="leading-7 [&:not(:first-child)]:mt-6">
      {props.children}
    </p>
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = !props.href?.startsWith(config.domain);

    return (
      <Link {...props} href={props.href || ""}>
        <span className="border-foreground/50 border-b">{props.children}</span>
        {isExternal && <ArrowUpRight className="inline h-4 w-4" />}
      </Link>
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{props.children}</ul>
  ),
  ol: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{props.children}</ol>
  ),
  pre: (props: React.HTMLAttributes<HTMLElement>) => (
    <pre {...props} className="sugar-high">
      {props.children}
    </pre>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const codeHTML = highlight(props.children as string);
    const { children, ..._props } = props;
    return (
      <code
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {..._props}
        className="leading-4 font-mono"
      />
    );
  },
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote {...props} className="mt-6 border-l-2 pl-6 italic" />
  ),
  Text: (
    props: React.HTMLAttributes<HTMLElement> & {
      variant: "lead" | "large" | "small" | "muted";
    }
  ) => {
    const classNames = cn("mt-6", {
      "text-xl text-muted-foreground": props.variant === "lead",
      "text-lg font-semibold": props.variant === "large",
      "text-sm font-medium leading-none": props.variant === "small",
      "text-sm text-muted-foreground": props.variant === "muted",
    });

    return (
      <p {...props} className={classNames}>
        {props.children}
      </p>
    );
  },
  Callout: (
    props: React.HTMLAttributes<HTMLElement> & {
      emoji?: string;
      type?: "info" | "warning" | "danger";
      title?: React.ReactNode;
    }
  ) => {
    const { type, title, emoji } = props;

    return (
      <div
        className={cn("relative rounded-lg border p-4 pr-16 mt-6", {
          "pr-16": props.emoji,
          "border-boder": type === "info" || type === "warning" || !type,
          "border-danger": type === "danger",
        })}
      >
        <div className="flex items-start space-x-2.5">
          {props.emoji && (
            <div className="h-8 w-8 flex-shrink-0 text-2xl">{emoji}</div>
          )}
          <div>
            {title && <div className="mt-0.5 font-semibold">{title}</div>}
            <div className="mt-1 text-sm text-foreground/70">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    );
  },
  Tweet: ({ id }: { id: string }) => <CustomTweet id={id} />,
  GithubRepo: ({ owner, name }: { owner: string; name: string }) => (
    <GithubRepo owner={owner} name={name} />
  ),
};

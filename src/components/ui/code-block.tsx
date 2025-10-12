import * as React from "react";
// ✅ Use the web bundle in the browser (Vite/Next):
import {
  type BundledLanguage,
  type BundledTheme,
  createHighlighter,
  type Highlighter,
} from "shiki";
import { cn } from "@/lib/utils";

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

// Build a single highlighter and reuse it (perf!)
const highlighterPromise: Promise<Highlighter> = createHighlighter({
  themes: ["github-light"],
  langs: [
    "typescript",
    "javascript",
    "tsx",
    "jsx",
    "json",
    "css",
    "html",
    "bash",
    "python",
    "sql",
    "markdown",
  ],
});

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {}
export function CodeBlock({ className, ...props }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-card",
        className
      )}
      {...props}
    />
  );
}

interface CodeBlockGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
export function CodeBlockGroup({ className, ...props }: CodeBlockGroupProps) {
  return <div className={cn("", className)} {...props} />;
}

interface CodeBlockCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: BundledLanguage;
  theme?: BundledTheme;
}

export function CodeBlockCode({
  code,
  language = "typescript",
  theme = "github-light",
  className,
  ...props
}: CodeBlockCodeProps) {
  const metastring = (props as any)?.["data-meta"] || "";
  const meta = parseMeta(metastring);
  const title = meta.title || meta.filename;
  console.log({ props });

  const [html, setHtml] = React.useState<string>("");

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const highlighter = await highlighterPromise;
        if (!mounted) return;

        const highlighted = highlighter.codeToHtml(code, {
          lang: language,
          theme,
        });

        setHtml(highlighted);
      } catch (err) {
        console.error("[CodeBlock] Shiki error:", err);
        // Safe, escaped fallback
        const escaped = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        setHtml(`<pre class="shiki"><code>${escaped}</code></pre>`);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [code, language, theme]);

  if (!html) {
    return (
      <div className="p-4">
        <pre className="text-sm">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "[&_pre]:!bg-transparent overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}

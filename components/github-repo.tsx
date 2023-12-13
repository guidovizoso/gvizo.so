import { Eye, GitFork, Github, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

async function getGithubRepo({ owner, name }: { owner: string; name: string }) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${name}`);
  if (res.ok) {
    return res.json();
  }
  return false;
}

export async function GithubRepo({
  owner,
  name,
}: {
  owner: string;
  name: string;
}) {
  const repo = await getGithubRepo({ owner, name });
  if (!repo) {
    return <div>Repo not found</div>;
  }

  return (
    <div className="max-w-lg border border-border rounded-lg mx-auto mt-6 p-6 bg-background relative">
      <Link
        href={repo.html_url}
        target="_blank"
        className="absolute top-4 right-4"
      >
        <Github className="h-6 w-6" />
      </Link>
      <Link
        href={repo.html_url}
        target="_blank"
        className="flex flex-row gap-3 items-center"
      >
        <div>
          <Image
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            width={48}
            height={48}
            className="rounded-full border border-border"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold flex flex-row items-center gap-1">
            {repo.name}
          </span>
          <span className="text-sm text-foreground/50">
            by <span className="font-semibold">{repo.owner.login}</span>
          </span>
        </div>
      </Link>
      <div className="mt-4">
        <p className="text-foreground/50 text-sm">{repo.description}</p>
      </div>
      <div className="flex flex-row items-center justify-between gap-4 mt-6">
        {repo.language ? (
          <p className="text-sm px-2 py-0.5 font-medium text-foreground/70 rounded-lg bg-secondary border border-border">
            {repo.language}
          </p>
        ) : (
          <div />
        )}

        <div className="flex flex-row gap-4">
          <span className="text-foreground/70 text-sm flex items-center gap-1 font-medium">
            <Eye className="h-4 w-4" />
            {formatter.format(repo.watchers_count)}
          </span>
          <span className="text-foreground/70 text-sm flex items-center gap-1 font-medium">
            <Star className="h-4 w-4" />
            {formatter.format(repo.stargazers_count)}
          </span>
          <span className="text-foreground/70 text-sm flex items-center gap-1 font-medium">
            <GitFork className="h-4 w-4" />
            {formatter.format(repo.forks_count)}
          </span>
        </div>
      </div>
      <div className="mt-6">
        <Button className="w-full" variant="outline" asChild>
          <Link href={repo.html_url} target="_blank">
            View on Github
          </Link>
        </Button>
      </div>
    </div>
  );
}

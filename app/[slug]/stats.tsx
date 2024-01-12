import { PostStat, getPostStats, incrementPostStat } from "@/lib/redis";

const isProd = process?.env?.NODE_ENV === "production";

export async function Stats({ slug }: { slug: string }) {
  const stats = await getPostStats(slug);

  if (isProd) {
    incrementPostStat(slug, PostStat.Views);
  }

  return (
    <div className="flex flex-row gap-2 text-sm">
      <span className="text-foreground/70">{stats.views}</span> stat
    </div>
  );
}

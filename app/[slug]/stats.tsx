import { config } from "@/config";
import { PostStat, getPostStats, incrementPostStat } from "@/lib/redis";
import { headers } from "next/headers";

export async function Stats({ slug }: { slug: string }) {
  const fullUrl = headers().get("referer");
  const stats = await getPostStats(slug);

  const isProd = fullUrl?.startsWith(config.domain);
  if (isProd) {
    incrementPostStat(slug, PostStat.Views);
  }

  return (
    <div className="flex flex-row gap-2 text-sm">
      <span className="text-foreground/70">{stats.views}</span>
    </div>
  );
}

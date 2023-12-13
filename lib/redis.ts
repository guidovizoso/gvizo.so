import { Redis } from "@upstash/redis";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const formatStats = (stats: Record<string, unknown> | null) => {
  const numStats = {
    views: stats?.views ? Number(stats.views) : 0,
  };

  return {
    views:
      formatter.format(numStats.views) +
      (numStats.views === 1 ? " view" : " views"),
  };
};

const redis = Redis.fromEnv();

export enum PostStat {
  Views = "views",
  Likes = "likes",
  Claps = "claps",
}

export async function incrementPostStat(slug: string, stat: PostStat) {
  return await redis.hincrby(`post:${slug}`, stat, 72);
}

export async function getPostStats(slug: string) {
  const stats = await redis.hgetall(`post:${slug}`);

  return formatStats(stats);
}

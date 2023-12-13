import { format } from "date-fns";
import { BadgeCheck, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EnrichedTweet, enrichTweet } from "react-tweet";
import { getTweet } from "react-tweet/api";

export async function Tweet({ id }: { id: string }) {
  let error;
  const tweet = id
    ? await getTweet(id).catch((err) => {
        error = err;
      })
    : undefined;

  if (error) {
    return <div>error</div>;
  }
  if (!tweet) {
    return "Tweet not found";
  }

  const enrichedTweet = enrichTweet(tweet) as EnrichedTweet;

  const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
  const formattedDate = format(
    new Date(tweet.created_at),
    "hh:mm · MMM d, yyyy"
  );

  return (
    <div className="max-w-lg border border-border rounded-lg mx-auto mt-6 p-6 bg-background relative">
      <Link href={tweetUrl} target="_blank" className="absolute top-4 right-4">
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      </Link>
      <Link
        href={tweetUrl}
        target="_blank"
        className="flex flex-row gap-3 items-center"
      >
        <div>
          <Image
            src={tweet.user.profile_image_url_https}
            alt={tweet.user.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium flex flex-row items-center gap-1">
            {tweet.user.name}{" "}
            {tweet.user.is_blue_verified && (
              <BadgeCheck className="inline h-5 w-5 fill-sky-500 stroke-background" />
            )}
          </span>
          <span className="text-sm text-foreground/50 font-medium">
            @{tweet.user.screen_name}
          </span>
        </div>
      </Link>
      <div className="mt-4">
        <p>
          {enrichedTweet.entities.map((item, i) => {
            switch (item.type) {
              case "hashtag":
              case "mention":
              case "url":
              case "symbol":
                return (
                  <Link
                    key={i}
                    href={item.href}
                    target="_bank"
                    className="border-border font-medium border-b"
                  >
                    {item.text}
                  </Link>
                );
              case "media":
                // Media text is currently never displayed, some tweets however might have indices
                // that do match `display_text_range` so for those cases we ignore the content.
                return;
              default:
                // We use `dangerouslySetInnerHTML` to preserve the text encoding.
                // https://github.com/vercel-labs/react-tweet/issues/29
                return (
                  <span
                    key={i}
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                );
            }
          })}
        </p>
      </div>
      <div className="mt-1">
        <span className="text-foreground/50 text-sm font-medium">
          {formattedDate}
        </span>
      </div>
      <div className="w-full border-t border-border mt-2 mb-3" />
      <div className="flex flex-row gap-4">
        <span className="text-foreground/70 text-sm flex items-center gap-1 font-medium">
          <MessageCircle className="h-4 w-4" />
          {enrichedTweet.conversation_count}
        </span>
        <span className="text-foreground/70 text-sm flex items-center gap-1 font-medium">
          <Heart className="h-4 w-4" /> {tweet.favorite_count}
        </span>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import ImageResponse from "@takumi-rs/image-response";

function OgImage({ title }: { title: string }) {
  return (
    <div>
      <h1>Hello from {title}!</h1>
    </div>
  );
}

export const Route = createFileRoute("/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new ImageResponse(<OgImage title="Tanstack Start" />, {
          width: 1200,
          height: 630,
        });
      },
    },
  },
});

import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../index.css?url";
import "@fontsource-variable/inter";
import "@fontsource-variable/lora";

export type RouterAppContext = {};

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Guido Vizoso",
      },
      {
        name: "description",
        content: "Building systems that make products shine.",
      },
      {
        name: "og:title",
        content: "Guido Vizoso",
      },
      {
        name: "og:description",
        content: "Building systems that make products shine.",
      },
      {
        name: "og:image",
        content: "https://www.gvizo.so/og",
      },

      {
        name: "og:url",
        content: "https://www.gvizo.so",
      },
      {
        name: "og:type",
        content: "website",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "favicon",
        href: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  // const isFetching = useRouterState({ select: (s) => s.isLoading });
  return (
    <html lang="en">
      {/** biome-ignore lint/style/noHeadElement: Required by TanStack Router */}
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="grid h-svh grid-rows-[auto_1fr]">
          {/* <Header /> */}
          {/* {isFetching ? <Loader /> : <Outlet />} */}
          <Outlet />
        </div>
        <Toaster richColors />
        <TanStackRouterDevtools position="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}

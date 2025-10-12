import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Loader from "@/components/loader";
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
        title: "Guido",
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
  const isFetching = useRouterState({ select: (s) => s.isLoading });
  return (
    <html lang="en">
      {/** biome-ignore lint/style/noHeadElement: Required by TanStack Router */}
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="grid h-svh grid-rows-[auto_1fr]">
          {/* <Header /> */}
          {isFetching ? <Loader /> : <Outlet />}
        </div>
        <Toaster richColors />
        <TanStackRouterDevtools position="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}

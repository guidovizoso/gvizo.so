import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    contentCollections(),
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        filter: ({ path }) => {
          console.log(path);
          // return path.includes("/posts");
          return true;
        },
        onSuccess: ({ page }) => {
          // biome-ignore lint/suspicious/noConsole: Safety check
          console.log(`Rendered ${page.path}!`);
        },
      },
    }),
    nitro(),
    viteReact(),
  ],
  nitro: {
    preset: "vercel",
  },
});

import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import tsconfigPaths from "vite-tsconfig-paths";
import arraybuffer from "vite-plugin-arraybuffer";

export default defineConfig({
  plugins: [
    wasm(),
    arraybuffer(),
    contentCollections(),
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        filter: ({ path }) => {
          // console.log(path);
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
    externals: {
      traceInclude: [
        "node_modules/@takumi-rs/core",
        "node_modules/@takumi-rs/image-response",
        "node_modules/@takumi-rs/helpers",
        "node_modules/@takumi-rs/core-linux-x64-gnu",
        "node_modules/@takumi-rs/core-linux-arm64-gnu",
        "node_modules/@takumi-rs/core-darwin-arm64",
        "node_modules/@takumi-rs/core-darwin-x64",
      ],
    },
  },
  optimizeDeps: {
    exclude: [
      "@takumi-rs/core",
      "@takumi-rs/image-response",
      "@takumi-rs/helpers",
      "@takumi-rs/core-linux-x64-gnu",
      "@takumi-rs/core-linux-arm64-gnu",
      "@takumi-rs/core-darwin-arm64",
      "@takumi-rs/core-darwin-x64",
    ],
  },
  ssr: {
    external: [
      "@takumi-rs/core",
      "@takumi-rs/image-response",
      "@takumi-rs/helpers",
      "@takumi-rs/core-linux-x64-gnu",
      "@takumi-rs/core-linux-arm64-gnu",
      "@takumi-rs/core-darwin-arm64",
      "@takumi-rs/core-darwin-x64",
    ],
  },
});

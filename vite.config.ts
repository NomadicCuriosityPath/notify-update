import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/lib/index.ts",
      name: "notify-update",
      fileName: () => {
        return "index.js";
      },
      formats: ["cjs"],
    },
  },
  plugins: [svelte()],
});

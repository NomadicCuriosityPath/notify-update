import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/lib/index.ts",
      name: "raiden-compare",
      fileName: "index",
      formats: ["cjs"],
    },
  },
  plugins: [svelte()],
});

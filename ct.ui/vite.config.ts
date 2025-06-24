import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  server: {
    port: 59710,
  },
  resolve: {
    alias: {
      "@mixins": path.resolve(__dirname, "src/mixins"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
});

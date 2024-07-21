import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "date-fns": path.resolve(__dirname, "node_modules/date-fns"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendors": ["react", "react-dom"],
          "date-fns": ["date-fns"],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});

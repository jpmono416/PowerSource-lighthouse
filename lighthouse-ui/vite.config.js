import { configDefaults } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.js"],
    testMatch: ["./tests/**/*.test.jsx$?"],
    globals: true,
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "**/*config.js",
        "**/*eslintrc.cjs",
        "**/test.utils.jsx",
        "**/main.jsx",
      ],
    },
  },
  server: {
    port: 5173,
  },
});

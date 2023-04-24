/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ["@nighttrax/foo", "@nighttrax/lib", "node_modules"],
  },
  build: {
    commonjsOptions: {
      include: [/@nighttrax\/lib/, /node_modules/],
    },
  },
});

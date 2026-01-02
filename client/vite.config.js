import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["59j8kd-5173.csb.app"],
    proxy: {
      // Forward same-origin GraphQL requests to the backend during `vite dev`.
      "/graphql": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
      },
    },
  },
});

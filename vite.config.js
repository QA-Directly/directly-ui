import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {
        target: "https://directly-core.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "https://directly-core.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    allowedHosts: ["cloud-lab-frontend-236167.onrender.com"],

    proxy: {
      "/api": {
        target: "http://host.docker.internal:5000",
        changeOrigin: true
      }
    }
  }
});

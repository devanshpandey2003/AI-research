import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/app/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // 1. Expose server to all network interfaces
    host: "0.0.0.0",
    proxy: {
      // Proxy API requests to the backend server
      "/api": {
        // 2. Corrected port for the development server
        target: "http://127.0.0.1:2024",
        changeOrigin: true,
      },
    },
    // 3. Allow requests from any Replit preview URL
    allowedHosts: [".replit.dev"],
  },
});

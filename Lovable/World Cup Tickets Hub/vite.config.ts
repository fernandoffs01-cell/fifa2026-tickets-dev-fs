import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Em dev, faz proxy de /api para o backend local.
    // Permite que `api.ts` use a URL relativa /api e funcione tanto em
    // dev (via este proxy) quanto em produção (via web.config do IIS).
    proxy: {
      "/api": {
        target: process.env.VITE_DEV_BACKEND_URL || "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

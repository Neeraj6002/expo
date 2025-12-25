import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  // ✅ REQUIRED FOR VERCEL
  base: "/",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ✅ Fix for Supabase build issue
  optimizeDeps: {
    include: ['@supabase/supabase-js']
  },

  // ✅ Force Supabase to be bundled (fixes Vercel build)
  ssr: {
    noExternal: ['@supabase/supabase-js']
  },

  build: {
    // ✅ Silence chunk warning
    chunkSizeWarningLimit: 1500,

    // ✅ Better performance (recommended)
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["react-router-dom"],
        },
      },
    },
  },
}));

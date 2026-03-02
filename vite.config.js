import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  base: "/",           // ← cambia esto
  build: {
    outDir: "docs",
    emptyOutDir: true
  }
})
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/confi/
export default defineConfig({
  // Set the base to the final sub-path
  base: "/personalprojects/neuralife-ai-market/",
  plugins: [react()],
});

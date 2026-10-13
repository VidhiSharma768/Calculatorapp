
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["playgroup-delighted-consuming.ngrok-free.dev"]
  }
});

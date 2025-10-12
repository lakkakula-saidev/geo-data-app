import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

/**
 * GitHub Pages deployment:
 * - homepage: https://your-username.github.io/geo-data-app
 * - base must match repository name with leading & trailing slash
 * Vite injects import.meta.env.BASE_URL which we use as BrowserRouter basename.
 */
export default defineConfig({
  base: "/geo-data-app/",
  plugins: [tailwindcss(), react(), flowbiteReact()]
});
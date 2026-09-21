// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://blog.vritico.com",
	integrations: [react(), sitemap()],
	server: {
		host: "0.0.0.0",
		port: 4321,
	},
	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: true,
		},
		preview: {
			allowedHosts: true,
		},
	},

	output: "static",
});

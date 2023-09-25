/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: 'jsdom'
	},
	resolve: {
		alias: {
			'@screens': '/src/screens',
			'@interfaces': '/src/interfaces',
			'@atoms': '/src/components/atoms'
		}
	},
	build: {
		chunkSizeWarningLimit: 1600
	}
})

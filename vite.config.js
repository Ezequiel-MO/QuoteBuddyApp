/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	build: {
		chunkSizeWarningLimit: 1600,
		target: 'esnext',
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
					return
				}
				warn(warning)
			}
		}
	},
	server: {
		open: true,
		hmr: {
			overlay: false
		}
	}
})

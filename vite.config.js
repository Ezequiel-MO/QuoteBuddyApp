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
				// Skip certain warnings
				if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
					return
				}
				// Use default for everything else
				warn(warning)
			}
		}
	},
	optimizeDeps: {
		exclude: [
			'react-toastify',
			'framer-motion',
			'@mui/material',
			'@mui/system',
			'@mui/styled-engine',
			'@mui/utils',
			'react-pdf'
		]
	},
	server: {
		hmr: {
			overlay: false
		}
	}
})

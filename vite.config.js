import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			'@screens': '/src/screens',
			'@interfaces': '/src/interfaces',
			'@atoms': '/src/components/atoms'
			// ... other aliases
		}
	},
	build: {
		chunkSizeWarningLimit: 1600
	}
})

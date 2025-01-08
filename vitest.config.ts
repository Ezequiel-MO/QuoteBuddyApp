import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
	// Vitest-specific configurations
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/__tests__/setup.ts' // Assuming you're using TypeScript for your setup file
		// ... other test configurations
	},
	// ... other configurations
	resolve: {
		alias: {
			'@screens': resolve(__dirname, './src/screens'),
			'@interfaces': resolve(__dirname, './src/interfaces'),
			'src/components': resolve(__dirname, './src/components'),
			'src/context': resolve(__dirname, './src/context'),
			'src/constants': resolve(__dirname, './src/constants'),
			'src/hooks': resolve(__dirname, './src/hooks'),
			'src/axios': resolve(__dirname, './src/axios'),
			'src/helper': resolve(__dirname, './src/helper'),
			'src/redux': resolve(__dirname, './src/redux')
		}
	}
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import TanStackRouterVite from '@tanstack/router-plugin/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		TanStackRouterVite(),
		svgr({
			svgrOptions: {
				svgoConfig: {
					plugins: [
						{ name: 'preset-default', params: { overrides: { removeViewBox: false } } },
						{ name: 'convertColors', params: { currentColor: true } },
						{
							name: 'addAttributesToSVGElement', // Then add fill="currentColor"
							params: {
								attributes: [{ fill: 'currentColor' }],
							},
						},
					],
				},
			},
		}),
	],
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src'), // Maps 'src' to the src/ directory
		},
	},
})

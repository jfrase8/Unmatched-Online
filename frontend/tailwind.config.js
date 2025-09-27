/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				navBarButtons: ['Rubik Dirt'],
			},
			screens: {
				xxs: '420px',
				xs: '500px',
				'1.5xl': '1410px',
				'1.8xl': '1460px',

				long: { raw: '(min-height: 800px)' },
				short: { raw: '(min-height: 710px)' },
				shorter: { raw: '(min-height: 650px)' },
			},
			fontSize: {
				xxs: '0.725rem', // Custom size smaller than text-xs
			},
			keyframes: {
				wave: {
					'0%': { 'background-position': '0% 50%' },
					'25%': { 'background-position': '100% 50%' },
					'100%': { 'background-position': '0% 50%' },
				},
			},
			animation: {
				wave: 'wave 0.5s',
			},
		},
	},
	plugins: [require('tailwindcss-react-aria-components')],
}

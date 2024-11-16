/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				navBarButtons: ['Rubik Dirt'],
			},
			screens: {
				'xs': '500px',
				'xxs': '420px',
			},
			fontSize: {
				'xxs': '0.725rem',  // Custom size smaller than text-xs
			  },
		},
	},
	plugins: [],
}

import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

module.exports = {
	important: true,
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		fontSize: {
			xs: '.75rem',
			sm: '.875rem',
			tiny: '.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem',
			'7xl': '5rem',
			'8xl': '6rem'
		},
		fontFamily: {
			body: ['Barlow Condensed', 'sans-serif']
		},
		container: {
			center: true,
			padding: '2rem'
		},
		extend: {
			boxShadow: {
				xl: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
			},
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				tertiary: 'var(--color-tertiary)',
				orange: {
					50: '#ea5933'
				},
				black: {
					50: '#22281B'
				},
				gray: {
					50: '#7F847A'
				},
				white: {
					0: '#fff',
					50: '#C7BAAE',
					100: '#F5F1E9'
				},
				//mas adelante eleminar estos colores
				'cutt-orange': '#ea5933',
				'cutt-gray': '#7F847A',
				'cutt-sand': '#C7BAAE',
				'liberty-blue': '#0033A0',
				'liberty-gold': '#C7BAAE',
				'liberty-green': '#009E49'
			}
		}
	},
	safeList: {
		pattern: /h-\d+/,
		variants: ['responsive']
	},
	plugins: [forms, typography]
}

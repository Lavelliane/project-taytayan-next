import type { Config } from 'tailwindcss'
const {fontFamily} = require("tailwindcss/defaultTheme")

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/lib/**/*.js'
  ],
  theme: {
    screens: {
			xs: '475px',
			// => @media (min-width: 475px) { ... }

			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
    extend: {
      colors: {
				primary: '#002147',
				secondary: '#E3F6F5',
				tertiary: '#00AAFF',
				accent: '#FFC72C',
        dark: '#000C19',
			},
      fontFamily: {
        inter: ['var(--font-inter)', ...fontFamily.sans],
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
        lexendDeca: ['var(--font-lexendDeca)', ...fontFamily.serif],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      maxWidth: {
				'8xl': '88rem',
				'9xl': '96rem',
				'10xl': '104rem',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/typography'),],
}
export default config


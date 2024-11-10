import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js'
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			primary: 'var(--primary)',
  			secondary: 'var(--secondary)',
  			default: 'var(--default)'
  		},
  		keyframes: {
  			efecto: {
  				'0%': {
  					boxShadow: '0 0 0 0 rgba(9, 145, 5, 0.85)'
  				},
  				'100%': {
  					boxShadow: '0 0 0 25px rgba(50, 121, 3, 0)'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			}
  		},
  		animation: {
  			efecto: 'efecto 1s infinite',
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
  		},
  		boxShadow: {
  			'custom-blue': '0px 1px 10px 1px #104D7E'
  		}
  	}
  },
  darkMode: ["class", "class"],
  plugins: [nextui()]
};
export default config;
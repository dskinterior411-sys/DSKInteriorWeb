import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Dominant Brown/Golden (#A67449)
          50: '#faf7f4',
          100: '#f5ede6',
          200: '#ead9cd',
          300: '#d4b39b',
          400: '#be8d69',
          500: '#A67449', // Main dominant color
          600: '#8d5f3d',
          700: '#744a31',
          800: '#5b3a25',
          900: '#422b19',
        },
        accent: {
          // Light Pink/Coral (#F2C4C4)
          50: '#fefbfb',
          100: '#fdf7f7',
          200: '#fbefef',
          300: '#f7dfdf',
          400: '#f4cfcf',
          500: '#F2C4C4', // Main accent color
          600: '#c29d9d',
          700: '#927676',
          800: '#624f4f',
          900: '#322828',
        },
        dark: {
          // Very Dark Black (#0D0000)
          50: '#1a1a1a',
          100: '#141414',
          200: '#0f0f0f',
          300: '#0a0a0a',
          400: '#050505',
          500: '#0D0000', // Main dark color
          600: '#0a0000',
          700: '#080000',
          800: '#050000',
          900: '#030000',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;







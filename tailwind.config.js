/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Neutral colors using Zinc - Optimized for light/dark
        neutral: {
          50: '#fafafa',  // Lightest - Light mode background
          100: '#f4f4f5', // Light mode subtle background
          200: '#e4e4e7', // Light mode borders
          300: '#d4d4d8', // Light mode subtle borders
          400: '#a1a1aa', // Light mode muted text
          500: '#71717a', // Light mode text
          600: '#52525b', // Light mode strong text
          700: '#3f3f46', // Dark mode subtle text
          800: '#27272a', // Dark mode text
          900: '#18181b', // Dark mode strong text
          950: '#09090b', // Darkest - Dark mode background
        },
        // Ascender colors using Orange - Optimized for light/dark
        ascender: {
          50: '#fff7ed',  // Lightest - Light mode background
          100: '#ffedd5', // Light mode subtle background
          200: '#fed7aa', // Light mode borders
          300: '#fdba74', // Light mode subtle borders
          400: '#fb923c', // Light mode muted text
          500: '#f97316', // Light mode primary
          600: '#ea580c', // Light mode strong
          700: '#c2410c', // Dark mode primary
          800: '#9a3412', // Dark mode strong
          900: '#7c2d12', // Dark mode text
          950: '#431407', // Darkest - Dark mode background
        },
        // Neothinker colors using Amber - Optimized for light/dark
        neothinker: {
          50: '#fffbeb',  // Lightest - Light mode background
          100: '#fef3c7', // Light mode subtle background
          200: '#fde68a', // Light mode borders
          300: '#fcd34d', // Light mode subtle borders
          400: '#fbbf24', // Light mode muted text
          500: '#f59e0b', // Light mode primary
          600: '#d97706', // Light mode strong
          700: '#b45309', // Dark mode primary
          800: '#92400e', // Dark mode strong
          900: '#78350f', // Dark mode text
          950: '#451a03', // Darkest - Dark mode background
        },
        // Immortal colors using Red - Optimized for light/dark
        immortal: {
          50: '#fef2f2',  // Lightest - Light mode background
          100: '#fee2e2', // Light mode subtle background
          200: '#fecaca', // Light mode borders
          300: '#fca5a5', // Light mode subtle borders
          400: '#f87171', // Light mode muted text
          500: '#ef4444', // Light mode primary
          600: '#dc2626', // Light mode strong
          700: '#b91c1c', // Dark mode primary
          800: '#991b1b', // Dark mode strong
          900: '#7f1d1d', // Dark mode text
          950: '#450a0a', // Darkest - Dark mode background
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        // Light mode gradients
        'gradient-primary': 'linear-gradient(to right, rgb(245 158 11), rgb(249 115 22), rgb(239 68 68))',
        'gradient-primary-vertical': 'linear-gradient(to bottom, rgb(245 158 11), rgb(249 115 22), rgb(239 68 68))',
        'gradient-primary-diagonal': 'linear-gradient(to bottom right, rgb(245 158 11), rgb(249 115 22), rgb(239 68 68))',
        
        // Dark mode gradients
        'gradient-primary-dark': 'linear-gradient(to right, rgb(180 83 9), rgb(194 65 12), rgb(185 28 28))',
        'gradient-primary-dark-vertical': 'linear-gradient(to bottom, rgb(180 83 9), rgb(194 65 12), rgb(185 28 28))',
        'gradient-primary-dark-diagonal': 'linear-gradient(to bottom right, rgb(180 83 9), rgb(194 65 12), rgb(185 28 28))',
        
        // Product-specific gradients - Light mode
        'gradient-ascender': 'linear-gradient(to right, rgb(234 88 12), rgb(194 65 12))',
        'gradient-neothinker': 'linear-gradient(to right, rgb(245 158 11), rgb(217 119 6))',
        'gradient-immortal': 'linear-gradient(to right, rgb(239 68 68), rgb(220 38 38))',
        
        // Product-specific gradients - Dark mode
        'gradient-ascender-dark': 'linear-gradient(to right, rgb(154 52 18), rgb(124 45 18))',
        'gradient-neothinker-dark': 'linear-gradient(to right, rgb(180 83 9), rgb(146 64 14))',
        'gradient-immortal-dark': 'linear-gradient(to right, rgb(185 28 28), rgb(153 27 27))',
        
        // Vertical variations - Light mode
        'gradient-ascender-vertical': 'linear-gradient(to bottom, rgb(234 88 12), rgb(194 65 12))',
        'gradient-neothinker-vertical': 'linear-gradient(to bottom, rgb(245 158 11), rgb(217 119 6))',
        'gradient-immortal-vertical': 'linear-gradient(to bottom, rgb(239 68 68), rgb(220 38 38))',
        
        // Vertical variations - Dark mode
        'gradient-ascender-dark-vertical': 'linear-gradient(to bottom, rgb(154 52 18), rgb(124 45 18))',
        'gradient-neothinker-dark-vertical': 'linear-gradient(to bottom, rgb(180 83 9), rgb(146 64 14))',
        'gradient-immortal-dark-vertical': 'linear-gradient(to bottom, rgb(185 28 28), rgb(153 27 27))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        '4xs': '0.125rem', // 2px
        '3xs': '0.25rem',  // 4px
        '2xs': '0.375rem', // 6px
        'xs': '0.5rem',    // 8px
        'sm': '0.75rem',   // 12px
        'md': '1rem',      // 16px
        'lg': '1.5rem',    // 24px
        'xl': '2rem',      // 32px
        '2xl': '2.5rem',   // 40px
        '3xl': '3rem',     // 48px
        '4xl': '4rem',     // 64px
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "slide-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "pulse-subtle": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.85",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blob: "blob 7s infinite",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        "slide-in-left": "slide-in-left 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

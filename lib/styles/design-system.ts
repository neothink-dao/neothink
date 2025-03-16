// Neothink+ Design System
export const designSystem = {
  // Brand Colors
  colors: {
    // Primary Brand Colors
    neothinkPlus: {
      50: "#fafaf9",
      100: "#f5f5f4",
      200: "#e7e5e4",
      300: "#d6d3d1",
      400: "#a8a29e",
      500: "#78716c",
      600: "#57534e",
      700: "#44403c",
      800: "#292524",
      900: "#1c1917",
      950: "#0c0a09",
    },
    // Sub-brands
    ascender: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
      950: "#431407",
    },
    neothinker: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      950: "#451a03",
    },
    immortal: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a",
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ["Inter var", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  // Spacing
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
  },

  // Borders
  borders: {
    radius: {
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      full: "9999px",
    },
    width: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      4: "4px",
      8: "8px",
    },
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  // Brand Icons
  icons: {
    brand: {
      name: "Sparkles",
      color: "brand.500",
      darkColor: "brand.400",
    },
    ascender: {
      name: "Rocket",
      color: "ascender.500",
      darkColor: "ascender.400",
    },
    neothinker: {
      name: "Brain",
      color: "neothinker.500",
      darkColor: "neothinker.400",
    },
    immortal: {
      name: "Zap",
      color: "immortal.500",
      darkColor: "immortal.400",
    },
  },

  // Gradients
  gradients: {
    brand: {
      light: "linear-gradient(to right, var(--neothinker-500), var(--ascender-500), var(--immortal-500))",
      dark: "linear-gradient(to right, var(--neothinker-400), var(--ascender-400), var(--immortal-400))",
    },
  },

  // Theme
  theme: {
    light: {
      background: "neothinkPlus.50",
      text: "neothinkPlus.900",
      border: "neothinkPlus.200",
    },
    dark: {
      background: "neothinkPlus.900",
      text: "neothinkPlus.50",
      border: "neothinkPlus.800",
    },
  },
}

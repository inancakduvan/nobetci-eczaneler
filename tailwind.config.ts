import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'heading-medium': ['1rem', {
          lineHeight: '1rem',
          fontWeight: '600',
        }],
        'heading-large': ['1.25rem', {
          lineHeight: '1.25rem',
          fontWeight: '600',
        }],
        'subheading-xsmall': ['0.75rem', {
          lineHeight: '1rem',
          fontWeight: '500',
        }],
        'subheading-small': ['0.875rem', {
          lineHeight: '1.15rem',
          fontWeight: '500',
        }],
        'subheading-medium': ['1rem', {
          lineHeight: '1rem',
          fontWeight: '500',
        }],
        'body-xsmall': ['0.75rem', {
          lineHeight: '1rem',
          fontWeight: '500',
          letterSpacing: "0.25px"
        }],
        'body-small': ['0.875rem', {
          lineHeight: '1.15rem',
          fontWeight: '500',
          letterSpacing: "0.25px"
        }],
        'body-medium': ['1rem', {
          lineHeight: '1.5rem',
          fontWeight: '500',
          letterSpacing: "0.25px"
        }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-greenToWhite225deg": "linear-gradient(225deg, #E4FFF0, #FAFAFA 30%)",
        "gradient-whiteToTransparent90deg": "linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.3) 30%)",
        "gradient-whiteToBlack": "linear-gradient(0, rgba(187, 187, 187, 1), rgba(187, 187, 187, 0.3) 30%)",
      },
      colors: {
        primary: {
          300: "#CADCDB",
          400: "#18857D",
          700: "#024540",
        },
        helper: {
          yellow: {
            400: "#FFFDF1",
            700: "#FFBD4C",
          }
        },
        semantic: {
          warning: "#8E6241",
          info: "#0966F2",
          light: "#FFFFFF",
        },
        onText: {
          primary: "#1F211F",
          secondary: "#909090",
          light: "#FFFFFF",
          subdark: "#656565",
        },
        muted: {
          400: "#FAFAFA",
          500: "#F6F6F6",
          600: "#F4F4F4",
          700: "#E0E0E0",
        },
        overlay: {
          30: "rgba(0, 0, 0, 0.3)"
        }
      },
      boxShadow: {
        'soft': '0 4px 4px 0 rgba(0, 0, 0, 0.05)',
        'ultra-soft': '5px 10px 10px -10px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;

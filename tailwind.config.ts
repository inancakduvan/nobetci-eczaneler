import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./elements/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '767px',
      },
      fontSize: {
        'heading-medium': ['1rem', {
          lineHeight: '1rem',
          fontWeight: '600',
        }],
        'heading-large': ['1.25rem', {
          lineHeight: '1.25rem',
          fontWeight: '600',
        }],
        'subheading-xxsmall': ['0.65rem', {
          lineHeight: '1rem',
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
        'body-xxsmall': ['0.65rem', {
          lineHeight: '1rem',
          fontWeight: '400'
        }],
        'body-xsmall': ['0.75rem', {
          lineHeight: '1rem',
          fontWeight: '400',
          letterSpacing: "0.25px"
        }],
        'body-small': ['0.875rem', {
          lineHeight: '1.15rem',
          fontWeight: '400',
          letterSpacing: "0.25px"
        }],
        'body-medium': ['1rem', {
          lineHeight: '1.5rem',
          fontWeight: '400',
          letterSpacing: "0.25px"
        }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-greenToWhite225deg": "linear-gradient(225deg, #E4FFF0, #FAFAFA 10%)",
        "gradient-whiteToTransparent90deg": "linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.6) 70%)",
        "gradient-whiteToBlack": "linear-gradient(0, rgba(187, 187, 187, 1), rgba(187, 187, 187, 0) 50%)",
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
      },
      gap: {
        'xsmall': '4px',
        'small': '8px',
        'medium': '16px',
        'large': '24px',
        'xlarge': '32px',
        'xxlarge': '40px'
      },
      padding: {
        'xsmall': '4px',
        'small': '8px',
        'medium': '16px',
        'large': '24px',
        'xlarge': '32px',
        'xxlarge': '40px'
      },
      margin: {
        'xsmall': '4px',
        'small': '8px',
        'medium': '16px',
        'large': '24px',
        'xlarge': '32px',
        'xxlarge': '40px'
      },
      height: {
        'fit-screen': 'calc(var(--vh, 1vh) * 100)',
      },
      minHeight: {
        'fit-screen': 'calc(var(--vh, 1vh) * 100)',
      }
    },
  },
  plugins: [],
};
export default config;

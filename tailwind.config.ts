import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        primary: "#0575ff",
      },
      backgroundImage: {
        "gradient-red":
          "linear-gradient(84deg, #A070FF -15.41%, #D951D9 3.43%, #FA2EA9 31.27%, #FF1A76 71.52%, #F34 108.42%)",
        "gradient-green":
          "linear-gradient(84deg, #00DE99 -15.41%, #17DE87 3.43%, #2EDD73 31.27%, #41DC5D 71.52%, #54DB43 108.42%)",
        "gradient-yellow":
          "linear-gradient(84deg, #FAD620 -15.55%, #FACE1E 7.79%, #FACA2D 24.27%, #FAC020 42.92%, #FAAE0A 99.04%)",
        "gradient-blue":
          "linear-gradient(84deg, #A070FF -15.41%, #8873FF 3.43%, #6D75FF 31.27%, #4B76FE 71.52%, #0177FB 108.42%)",
        "gradient-purple":
          "linear-gradient(85deg, #E858E3 -15.48%, #E858E3 5.78%, #CF3FE4 26.76%, #B127E7 46.63%, #8A0EEB 76.32%, #5000EF 109.66%)",
        "gradient-gray":
          "linear-gradient(84deg, #696B8C -15.41%, #5D5F7C 3.43%, #51536C 31.27%, #46475D 71.52%, #3B3C4E 108.42%)",

        "gradient-gray2l":
          "linear-gradient(270deg,#23242F_100%_0%,#23242F_0%_100%)",
        "gradient-gray2r": "linear-gradient(270deg, #23242F 0%, #23242F 100%)",
      },
      boxShadow: {
        "inner-blue":
          "inset 0 2px 2px 0 rgb(255 255 255 / 0.24), inset 0 -4px 4px 0 rgb(1 105 223 / 1)",
        "inner-yellow":
          "inset 0 2px 2px 0 rgb(255 255 255 / 0.24), inset 0 -4px 4px 0 rgb(225 180 51 / 1)",
        "inner-green":
          "inset 0 2px 2px 0 rgb(255 255 255 / 0.24), inset 0 -4px 4px 0 rgb(54 188 36 / 1)",
        "inner-red":
          "inset 0 2px 2px 0 rgb(255 255 255 / 0.24), inset 0 -4px 4px 0 rgb(255 51 68 / 1)",
        "inner-gray":
          "inset 0 2px 2px 0 rgb(255 255 255 / 0.24), inset 0 -4px 4px 0 rgb(59 60 78 / 1)",
      },
      fontFamily: {
        "press-start": ["PressStart2P", "cursive"],
      },
      fontSize: {
        h1: ["6rem", "6.5rem"], // 96px/104px
        h2: ["3.75rem", "5.25rem"], // 60px/84px
        h3: ["3rem", "3.5rem"], // 48px/56px
        h4: ["2.12rem", "2.62rem"], // 34px/42px
        h5: ["1.5rem", "2.25rem"], // 24px/36px
        h6: ["1.25rem", "1.75rem"], // 20px/28px
        tl: ["1.25rem", "1.75rem"], // 18px/28px
        tm: ["1rem", "1.5rem"], // 16px/24px
        pl: ["1rem", "1.5rem"], // 16px/24px
        pm: ["0.875rem", "1.5rem"], // 14px/24px
        ps: ["0.75rem", "1.5rem"], // 12px/24px
      },
      spacing: {
        "left-nav-lg": "248px",
        "left-nav-md": "64px",
        "left-nav-0": "0px",
        "cnt-box": "1200px",
      },
      animation: {
        "spin-fast": "spin 1s linear infinite",
        "spin-slow": "spin 3s linear infinite",
        "coin-flip": "coinFlip 1.5s linear infinite",
        confetti: "confetti 5s ease-out forwards",
        fall: "fall 5s ease-out forwards",
        swing: "swing 1.5s ease-in-out infinite",
        wave: "wave 1s ease-in-out infinite",
        intermittent: "intermittent 6s steps(1, end) infinite",
        "swing-intermittent": "swing-intermittent 6s ease-in-out infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        coinFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        confetti: {
          "0%": { transform: "translateY(0) rotateZ(0deg)", opacity: "100" },
          "100%": {
            transform: "translateY(1000px) rotateZ(720deg)",
            opacity: "0",
          },
        },
        fall: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        swing: {
          "0%, 100%": { transform: "rotate(30deg)" },
          "50%": { transform: "rotate(-30deg)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-25%)" },
          "75%": { transform: "translateX(25%)" },
        },
        intermittent: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
        "swing-intermittent": {
          "0%, 100%": { transform: "rotate(20deg)", opacity: "1" },
          "15%": { transform: "rotate(-20deg)", opacity: "1" },
          "30%": { transform: "rotate(20deg)", opacity: "1" },
          "50%": { transform: "rotate(-20deg)", opacity: "1" },
          "50.01%, 99.99%": { opacity: "0" },
        },
      },
    },
  },
  darkMode: ["class", '[data-mode="dark"]'],
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            foreground: {
              // gray
              DEFAULT: "#18181B", //23
              500: "#71717A", //15
              600: "#71717A", //16
              700: "#52525B", //17
              800: "#3F3F46", //18
              900: "#27272A", // 23
            },
            background: {
              // gray
              DEFAULT: "white",
              500: "#A1A1AA", //8
              600: "#D4D4D8", //7
              700: "#E4E4E7", //5
              800: "#F4F4F5", //1
              900: "#FAFAFA", //1
            },
          }, // light
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            foreground: {
              // gray
              DEFAULT: "white",
              500: "#696B8C", //13
              600: "#737596", //12
              700: "#7F819F", //11
              800: "#8B8CA7", //10
              900: "white",
            },
            background: {
              // gray
              DEFAULT: "#18181F", //23
              500: "#3B3C4E", //18
              600: "#2C2D3A", //20
              700: "#23242F", //21
              800: "#1A1B23", //22
              900: "#18181F", // 23
            },
          }, // dark theme colors
        },
      },
    }),
  ],
};
export default config;

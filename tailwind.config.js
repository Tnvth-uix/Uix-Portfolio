/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        uix: {
          purple: {
            900: "#4A148C",
            800: "#6A1B9A",
            700: "#7B1FA2",
            600: "#8E24AA",
            500: "#9C27B0",
            100: "#F3E5F5",
          },
          blue: {
            900: "#283593",
            700: "#3949AB",
            500: "#5C6BC0",
            100: "#E8EAF6",
          },
          neon: {
            green: "#00E676",
            teal: "#00BFA5",
          },
          light: "#00B0FF",
          white: "#FFFFFF",
          gray: "#EEEEEE",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
      spacing: {
        gutter: "2rem",
      },
      animation: {
        "scroll-reveal": "scrollReveal 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        scrollReveal: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./*.{html,jsx}",
    "./src/*.{html,jsx}",
    "./src/**/*.{html,jsx}",
    "./src/**/**/*.{html,jsx}",
    "./src/**/**/**/*.{html,jsx}",
  ],
  theme: {
    screens: {
      sm: "600px",

      md: "900px",

      lg: "1080px",

      xl: "1200px",
    },

    extend: {
      boxShadow: {
        boxshadow: "0px 60px 10px 0px rgba(102, 104, 109, 0.17)",
      },
      colors: {
        main: "#22d3ee",
        yellow: "#ffea00",
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0",
          },
        },

        blink: {
          "50%": {
            "border-color": "black",
          },
        },
        rotate: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      animation: {
        typeanim: "typing 3s steps(50),blink 0.5s step-end 5 alternate",
      },

      backgroundImage: {
        pixels: "url('/button.svg')",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [],
}

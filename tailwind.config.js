/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{.html,js,jsx}", "./public/**/*{.html,js}"],
  theme: {
    borderRadius: {
      "20p": "20%",
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      cell: "9vmin",
    },
    extend: {
      keyframes: {
        shake: {
          "0%": { transform: "rotate(0.0deg)" },
          "20%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-8deg)" },
          "60%": { transform: "rotate(14deg)" },
          "80%": { transform: "rotate(-4deg)" },
          "90%": { transform: "rotate(10.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        dissapear: {
          "0%": { opacity: 1 },
          "20%": { opacity: 0.5 },
          "40%": { opacity: 0.2 },
          "100%": { opacity: 0 },
        },
        fallDown: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(300%)" },
        },
      },
      animation: {
        "shake-cell": "shake 2s linear infinite",
        "dissapear-cell": "dissapear 1s linear forwards",
        "fallDown-cell": "fallDown 1s linear,dissapear 1s linear forwards",
      },
    },
  },
  plugins: [],
};

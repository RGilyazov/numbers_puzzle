/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{.html,js,jsx}", "./public/**/*{.html,js}"],
  theme: {
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
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "shake-cell": "shake 2s linear infinite",
        "dissapear-cell": "dissapear 1s ease-in forwards",
      },
    },
  },
  plugins: [],
};

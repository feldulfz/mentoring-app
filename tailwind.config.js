/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"], 
  theme: {
    extend: {
      colors: {
        brand: "#4f46e5",
        brandLight: "#6366f1",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4f46e5",
          secondary: "#9333ea",
          accent: "#f59e0b",
          neutral: "#1f2937",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};

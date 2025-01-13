/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkOne: "#22272E",
        darkTwo: "#484D56",
        darkThree: "#696E7C",
        darkFour: "#8F939D",
        darkFive: "#C9CBD0",
        darkBlue: "#28416E",
      },
      fontFamily: {
        girassol: ["Girassol", "serif"],
        davidLibre: ["David Libre", "serif"],
        inter: ["Inter", "serif"],
        righteous: ["Righteous", "serif"],
      },
    },
  },
  plugins: [daisyui],
};

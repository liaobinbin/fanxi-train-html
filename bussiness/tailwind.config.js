const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,pug}"],
  theme: {
    colors: {
      primary: "#ff350d",
      secondary: "#252429",
      ...colors,
    },
    extend: {},
  },
  plugins: [],
};

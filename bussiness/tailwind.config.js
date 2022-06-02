const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,pug}"],
  theme: {
    colors: {
      ...colors,
      primary: "#ff350d",
      secondary: "#252429",
    },
    extend: {},
  },
  plugins: [],
};

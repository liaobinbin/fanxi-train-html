const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,pug}"],
  theme: {
    colors: {
      ...colors,
      primary: "#ff350d",
      secondary: "#252429",
    },
    extend: {
      keyframes: {
        fadeInRight: {
          from: {
            opacity: 0,
            transform: "translate3d(100%, 0, 0)",
          },
          to: {
            opacity: 1,
            transform: "translate3d(0 0, 0)",
          },
        },
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        fadeOut: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
      },
      animation: {
        fadeInRight: "fadeInRight 0.5s ease-in",
        fadeIn: "fadeIn 0.5s ease-in",
        fadeOut: "fadeOut 0.5s ease-out",
      },
    },
  },
  plugins: [],
};

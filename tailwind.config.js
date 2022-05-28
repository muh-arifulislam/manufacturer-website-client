module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#192aff",
          secondary: "#8feeff",
          accent: "#7f8096",
          neutral: "#0C0028",
          "base-100": "#ffffff",
        },
      }
    ],
  },
  plugins: [require("daisyui")],
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      text: "rgba(254, 254, 254, 1)",
      "text-transparent": "rgba(254, 254, 254, 0.75)",
      "purple-bg": "rgba(91, 44, 203, 0.15)",
      "pink-border": "rgba(211, 60, 231, 0.30)",
      "blue-accent": "rgba(176, 225, 253, 1)",
      "blue-border": "rgba(176, 225, 253, 0.30)",
      "pink-accent": "rgba(232, 148, 251, 1)",
    },
    fontFamily: {
      krona: '"Krona One"',
      space: '"Space Grotesk"',
    },
    minHeight: {
      105: "105px",
      125: "125px",
    },
    minWidth: {
      80: "80px",
    },
    extend: {},
  },
  plugins: [],
};

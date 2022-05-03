module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "rgba(254, 254, 254, 1)",
        "text-transparent": "rgba(254, 254, 254, 0.75)",
        "purple-bg": "rgba(91, 44, 203, 0.15)",
        "purple-accent": "rgba(91, 44, 203, 0.30)",
        "blue-bg": "rgba(73, 110, 239, 0.15)",
        "pink-border": "rgba(211, 60, 231, 0.30)",
        "blue-accent": "rgba(176, 225, 253, 1)",
        "blue-border": "rgba(176, 225, 253, 0.30)",
        "pink-accent": "rgba(232, 148, 251, 1)",
        "orbital-blue": "#496EEF",
        "orbital-blueLight": "#E4F5FF",
        oPurple: "#5B2CCB",
        oPink: "#D33CE7",
        oPinkLight: "#E894FB",
      },
      fontFamily: {
        primary: '"Krona One"',
        secondary: '"Space Grotesk"',
      },
      transitionProperty: {
        cubicCustom: "cubic-bezier(.01,.32,.99,.17)",
      },
    },
  },
  plugins: [],
};

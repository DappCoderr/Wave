export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "ping-once": "ping-once 0.5s ease-in-out",
        "fade-in": "fadeIn 0.2s ease-out",
      },
      keyframes: {
        "ping-once": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.5)", opacity: "0.5" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(-5px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

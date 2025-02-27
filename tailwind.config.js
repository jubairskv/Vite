/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-blue": "#1976D2",
        "color-light-blue": "#3b82f9",
        "color-gray":"#f1f1f5",
        "color-purple":"#cdd5fd",
        "color-dim-blue": "#93c5fd",
        "color-red": "#ef4444",
        "color-dark-gray": "#6b7280",
        "color-header-dark-gray": "#4b5563",
        "color-gray-200": "#e5e7eb",
        "color-dim-gray": "#f3f4f6",
        "color-light-gray": "#cbd5e1",
        "color-green": "#22c55e",
        "body-color": "#F0F0F0",
        "color-white": "#ffffff",
        "color-black": "#000000",
        "error-color": "#ed6076",
        "scrollbar-color-gray": "#94a3b8",
        "color-dim-gradient": "linear-gradient(to br, #3d78b6, #20205f)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        xxs: "0.65rem",
        base: "1rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        "2xl": "1.5rem",
        "4xl": "2.25rem",
        "7xl": "5rem",
      },
      fontWeight: {
        hairline: "100",
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};

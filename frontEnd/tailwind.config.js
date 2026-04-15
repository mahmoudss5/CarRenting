/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003d9b",
        "primary-container": "#0052cc",
        "on-primary": "#ffffff",
        "on-surface": "#141b2c",
        surface: "#f8f9ff",
        background: "#f8f9ff",
        "surface-bright": "#ffffff",
        "surface-dim": "#dde0ec",
        "surface-low": "#f0f2f8",
        "surface-lowest": "#ffffff",
        "surface-mid": "#e8eaf2",
        "surface-high": "#dde0ec",
        "surface-highest": "#d0d4e8",
        "surface-container": "#eef0f8",
        "surface-container-highest": "#d0d4e8",
        "secondary-container": "#d4e3ff",
        "on-secondary": "#00235b",
        tertiary: "#7c4dff",
        "tertiary-fixed": "#ede7ff",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["2rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-sm": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "title-md": ["1.125rem", { lineHeight: "1.5", fontWeight: "500" }],
        "body-md": ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" }],
      },
      borderRadius: {
        md: "0.75rem",
        lg: "1rem",
        card: "1.25rem",
      },
      boxShadow: {
        ambient: "0 10px 40px -10px rgba(20, 27, 44, 0.08)",
        deep: "0 20px 60px -15px rgba(20, 27, 44, 0.15)",
        float: "0 10px 40px -10px rgba(20, 27, 44, 0.08), 0 2px 8px -2px rgba(20, 27, 44, 0.04)",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #003d9b 0%, #0052cc 100%)",
        "hero-vignette": "linear-gradient(to right, #141b2c 0%, #141b2c 38%, rgba(20,27,44,0.7) 55%, rgba(20,27,44,0.1) 100%)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

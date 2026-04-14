/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand
        primary: '#003d9b',
        'primary-container': '#0052cc',
        'on-primary': '#ffffff',
        // Surface hierarchy
        'on-surface': '#141b2c',
        background: '#f4f6fb',
        surface: '#ffffff',
        'surface-container-low': '#eef1f8',
        'surface-container-lowest': '#f8f9fd',
        'surface-container': '#e4e8f2',
        'surface-container-high': '#d8ddf0',
        'surface-container-highest': '#cdd3ea',
        'surface-dim': '#c2c8df',
        'surface-bright': '#ffffff',
        // Secondary & tertiary
        'secondary-container': '#d4e2ff',
        'on-secondary-container': '#001b4d',
        tertiary: '#7b5800',
        'tertiary-fixed': '#ffefc4',
        'outline-variant': '#c0c7dc',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'headline-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'title-md': ['1.125rem', { lineHeight: '1.5' }],
        'body-md': ['0.875rem', { lineHeight: '1.7' }],
        'label-sm': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      boxShadow: {
        ambient: '0 10px 40px -10px rgba(20, 27, 44, 0.08)',
        card: '0 2px 16px rgba(20, 27, 44, 0.06)',
        'card-hover': '0 12px 40px rgba(20, 27, 44, 0.14)',
        glass: '0 8px 32px rgba(20, 27, 44, 0.10)',
        button: '0 4px 16px rgba(0, 61, 155, 0.30)',
        'button-hover': '0 8px 28px rgba(0, 61, 155, 0.40)',
      },
      backdropBlur: {
        glass: '20px',
      },
      borderRadius: {
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

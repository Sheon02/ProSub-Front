module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
   plugins: [
    function ({ addBase }) {
      addBase({
        'input[type="password"]::-webkit-reveal': {
          display: 'none !important',
          visibility: 'hidden !important',
          pointerEvents: 'none !important',
          position: 'absolute',
          right: '-9999px',
        },
        'input[type="password"]::-webkit-contacts-auto-fill-button': {
          display: 'none !important',
          visibility: 'hidden !important',
          pointerEvents: 'none !important',
          position: 'absolute',
          right: '-9999px',
        },
        'input[type="password"]::-webkit-credentials-auto-fill-button': {
          display: 'none !important',
          visibility: 'hidden !important',
          pointerEvents: 'none !important',
          position: 'absolute',
          right: '-9999px',
        },
      });
    },
  ],
}
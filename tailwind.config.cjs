/* eslint-env node */
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.max-h-none': {
          maxHeight: 'none',
        },
        '.break-anywhere': {
          overflowWrap: 'anywhere',
        },
      })
    }),
  ],
}

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode : 'class',
  theme: {
    extend: {
      fontFamily : {
        'logo' : ['"Secular One"']
      }
    },
  },
  plugins: [],
}
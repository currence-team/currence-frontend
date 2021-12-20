module.exports = {
  purge: ['./{pages,hooks,components}/**/*.{html,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Overpass', 'sans-serif'],
        secondary: ['Overpass Mono', 'sans-serif'],
        mono: ['Overpass Mono', 'sans-serif'],
      },
      boxShadow: {
        'hard-lg': '6px 6px black',
        'hard-md': '4px 4px black',
        hard: '3px 3px black',
        'hard-sm': '2px 2px black',
        'hard-xs': '1px 1px black',
      },
    },
  },
  plugins: [],
};

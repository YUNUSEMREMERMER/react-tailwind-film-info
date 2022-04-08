module.exports = {
  mode:'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        'bacground': '#39445a',
        'card-bg': '#282c34'
        
      },
    },
  },
  plugins: [],
}

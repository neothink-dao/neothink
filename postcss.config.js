module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      features: { 
        'nesting-rules': true,
        'is-pseudo-class': false
      }
    }
  }
}

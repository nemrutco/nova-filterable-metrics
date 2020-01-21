let mix = require('laravel-mix')

mix
  .setPublicPath('dist')
  .js('resources/js/card.js', 'js')
  .sass('resources/sass/card.scss', 'css')
  .webpackConfig({
    resolve: {
      symlinks: false,
      alias: {
        '@': path.resolve(__dirname, 'vendor/laravel/nova/resources/js/'),
      },
    },
  })
let mix = require('laravel-mix')

require('./nova.mix')

mix
  .setPublicPath('dist')
  .js('resources/js/card.js', 'js')
  .vue({ version: 3 })
  .nova('nemrutco/nova-filterable-metrics')

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
})
module.exports = withNextra()
const withTM = require('next-transpile-modules')([
  '@crumb/suffix',
  '@crumb/core',
  '@crumb/numeral',
  '@crumb/syllable',
])

/** @type {import('next').NextConfig} */
module.exports = withNextra(
  withTM({
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV !== 'production',
    },
    productionBrowserSourceMaps: true,
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  }),
)

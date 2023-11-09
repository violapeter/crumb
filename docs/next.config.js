const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
})

/** @type {import('next').NextConfig} */
module.exports = withNextra({
  transpilePackages: ['@crumb/*'],
  productionBrowserSourceMaps: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
})

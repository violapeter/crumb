const withTM = require('next-transpile-modules')([
  'react-syntax-highlighter',
  '@hungrammar/suffix',
  '@hungrammar/core',
])
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
module.exports = withTM(
  withMDX({
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV !== 'production',
    },
    productionBrowserSourceMaps: true,
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  }),
)

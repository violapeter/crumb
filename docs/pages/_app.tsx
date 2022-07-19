import React, { Component } from 'react'
import 'nextra-theme-docs/style.css'
import '../assets/style.css'

export default function Nextra({ Component, pageProps }) {
  return <Component {...pageProps} />
}

import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

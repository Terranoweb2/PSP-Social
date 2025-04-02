import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import '../styles/globals.css'

// Configuration Supabase
const supabaseUrl = 'https://uftfembmuusxiveqpngv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdGZlbWJtdXVzeGl2ZXFwbmd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODQwMjUsImV4cCI6MjA1OTE2MDAyNX0.LEQgRz8Gi_5WqeyUkBzChTyXqneHy1nxysKFsFHjFMw';

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => 
    createBrowserSupabaseClient({
      supabaseUrl,
      supabaseKey: supabaseAnonKey
    })
  )

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}

export default MyApp

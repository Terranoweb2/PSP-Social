import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { FaLock, FaEnvelope } from 'react-icons/fa'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Dans une future version, nous connecterons ceci à Supabase
      // Pour l'instant, c'est juste une simulation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirection vers le tableau de bord après connexion réussie
      window.location.href = '/member/dashboard'
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Connexion | PSP</title>
        <meta name="description" content="Connectez-vous à votre compte PSP" />
      </Head>

      {/* Header - Version mobile */}
      <header className="psp-gradient text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1739129965/PSP_copie_xtws5v.png" alt="Logo PSP" className="w-10 h-10 rounded-full" />
            <h1 className="text-lg font-bold">PSP</h1>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-6 pb-12">
        <div className="max-w-md mx-auto">
          {/* Card */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-primary/10 px-6 py-4">
              <h1 className="text-xl font-bold text-primary text-center">Connexion</h1>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {error && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                  <div className="relative">
                    <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Se souvenir de moi
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
                    Mot de passe oublié?
                  </a>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {loading ? 'Connexion en cours...' : 'Se connecter'}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Vous n'avez pas de compte?{' '}
                  <Link href="/register" className="font-medium text-primary hover:text-primary-dark">
                    Adhérer au PSP
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Version mobile */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm mb-3">&copy; {new Date().getFullYear()} Parti Socialiste Panafricain</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/about" className="text-white hover:text-gray-300">À propos</Link>
              <Link href="/contact" className="text-white hover:text-gray-300">Contact</Link>
              <Link href="/events" className="text-white hover:text-gray-300">Événements</Link>
              <Link href="/terms" className="text-white hover:text-gray-300">Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

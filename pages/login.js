import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { FaLock, FaEnvelope } from 'react-icons/fa'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      console.log('Tentative de connexion avec:', { email });
      
      // Connexion avec Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('Erreur Supabase:', error);
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Identifiants invalides. Vérifiez votre email et mot de passe.');
        } else {
          throw error;
        }
      }
      
      console.log('Connexion réussie:', data);
      
      // Redirection vers le tableau de bord après connexion réussie
      toast.success('Connexion réussie!')
      router.push('/member/dashboard')
    } catch (error) {
      console.error('Erreur de connexion:', error)
      setError(error.message || "Une erreur s'est produite lors de la connexion. Veuillez vérifier vos identifiants.")
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour créer un compte de test si nécessaire
  const createTestAccount = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Créer un utilisateur de test
      const testEmail = 'test@example.com';
      const testPassword = 'password123';
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      })
      
      if (authError) throw authError;
      
      // Ajouter les données du membre
      const { error: memberError } = await supabase
        .from('members')
        .insert([
          { 
            user_id: authData.user.id,
            first_name: 'Test',
            last_name: 'Utilisateur',
            email: testEmail,
            phone: '0123456789',
            address: 'Adresse de test',
            registration_date: new Date().toISOString(),
            member_status: 'actif'
          }
        ])
      
      if (memberError) throw memberError;
      
      // Remplir automatiquement les champs
      setEmail(testEmail);
      setPassword(testPassword);
      
      toast.success('Compte de test créé! Vous pouvez maintenant vous connecter.');
    } catch (error) {
      console.error('Erreur création compte test:', error);
      setError(`Erreur lors de la création du compte test: ${error.message}`);
    } finally {
      setLoading(false);
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
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={createTestAccount}
                  disabled={loading}
                  className="w-full text-sm text-gray-500 hover:text-primary"
                >
                  Créer un compte de test (pour démo uniquement)
                </button>
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

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast'
import { FaIdCard, FaFileDownload, FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaNewspaper, FaCalendarAlt as FaCalendar, FaSignOutAlt, FaDownload } from 'react-icons/fa'

export default function Dashboard() {
  const router = useRouter()
  const user = useUser()
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(true)
  const [memberData, setMemberData] = useState(null)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push('/login')
      return
    }

    // Fetch member data
    const fetchMemberData = async () => {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) throw error
        setMemberData(data)
      } catch (error) {
        console.error('Error fetching member data:', error)
        toast.error('Erreur lors du chargement des données')
      } finally {
        setLoading(false)
      }
    }

    fetchMemberData()
  }, [user, router, supabase])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Déconnexion réussie')
      router.push('/')
    } catch (error) {
      toast.error('Erreur lors de la déconnexion')
    }
  }

  const generateMemberCard = () => {
    setLoading(true)
    // Simulation de génération de carte
    setTimeout(() => {
      setLoading(false)
      alert('Carte de membre générée ! Dans une version future, ce sera téléchargeable en PDF.')
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-3 text-gray-700">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Tableau de bord | PSP</title>
        <meta name="description" content="Tableau de bord membre du PSP" />
      </Head>

      {/* Header - Version mobile */}
      <header className="psp-gradient text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1739129965/PSP_copie_xtws5v.png" alt="Logo PSP" className="w-10 h-10 rounded-full" />
            <h1 className="text-lg font-bold">PSP</h1>
          </Link>
          <div>
            <button
              onClick={handleSignOut}
              className="py-2 px-3 text-sm rounded-lg border border-white/30 hover:bg-white/20 transition-all"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="bg-primary/10 rounded-xl p-4 mb-6 shadow-sm">
          <h1 className="text-xl font-bold text-primary mb-1">Bienvenue, {memberData.first_name} !</h1>
          <p className="text-gray-600">Votre espace membre PSP</p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-t-xl shadow-md overflow-hidden mb-0 border-b">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            >
              Mon profil
            </button>
            <button 
              onClick={() => setActiveTab('card')}
              className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'card' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            >
              Carte membre
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-md overflow-hidden p-4">
          {activeTab === 'profile' && (
            <div>
              <div className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <FaUser className="text-primary text-3xl" />
                  </div>
                  <h2 className="text-xl font-semibold">{memberData.first_name} {memberData.last_name}</h2>
                  <p className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                    Membre {memberData.member_status}
                  </p>
                </div>

                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Membre depuis:</p>
                      <p className="text-gray-700">{new Date(memberData.registration_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Téléphone:</p>
                      <p className="text-gray-700">{memberData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Email:</p>
                      <p className="text-gray-700">{memberData.email || user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-primary mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500">Adresse:</p>
                      <p className="text-gray-700">{memberData.address}</p>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
                >
                  <FaUser className="mr-2" />
                  Modifier mon profil
                </button>
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div>
              <div className="rounded-lg overflow-hidden shadow-md bg-gradient-to-r from-secondary to-primary mb-6">
                <div className="p-5 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Carte de membre</h3>
                      <p className="text-sm opacity-80">Parti Socialiste Panafricain</p>
                    </div>
                    <img 
                      src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1739129965/PSP_copie_xtws5v.png" 
                      alt="Logo PSP" 
                      className="h-10 w-10"
                    />
                  </div>
                  <div className="mb-4">
                    <p className="text-xs opacity-80 mb-1">Nom & Prénom</p>
                    <p className="font-semibold">{memberData.first_name} {memberData.last_name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs opacity-80 mb-1">N° de membre</p>
                      <p className="font-semibold">PSP-{memberData.id}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-80 mb-1">Date d'adhésion</p>
                      <p className="font-semibold">{new Date(memberData.registration_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="inline-block bg-white text-primary px-3 py-1 rounded-full text-xs font-semibold">
                      {memberData.member_status.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={generateMemberCard}
                  disabled={loading}
                  className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center disabled:opacity-70"
                >
                  <FaFileDownload className="mr-2" />
                  {loading ? 'Génération en cours...' : 'Télécharger ma carte de membre'}
                </button>
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-sm">
                  <p>Vous pouvez télécharger votre carte de membre numérique ou la présenter directement depuis votre téléphone lors des événements du PSP.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Version mobile */}
      <footer className="bg-dark text-white py-4 mt-6">
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

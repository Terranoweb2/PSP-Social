import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast'
import { FaIdCard, FaFileDownload, FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaNewspaper, FaCalendarCheck, FaSignOutAlt, FaDownload, FaSave, FaArrowLeft, FaBell, FaClipboardList, FaUserCog } from 'react-icons/fa'

export default function Dashboard() {
  const router = useRouter()
  const user = useUser()
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(true)
  const [memberData, setMemberData] = useState(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [editProfileData, setEditProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [events, setEvents] = useState([
    { id: 1, title: "Assemblée Générale", date: "2025-05-15", location: "Siège PSP" },
    { id: 2, title: "Session de formation", date: "2025-04-25", location: "Centre culturel" },
    { id: 3, title: "Réunion des membres", date: "2025-05-03", location: "Hôtel Ivoire" }
  ])
  const [news, setNews] = useState([
    { id: 1, title: "Nouveau programme de formation", date: "2025-03-29", summary: "Le PSP lance un programme de formation pour les jeunes militants" },
    { id: 2, title: "Élections régionales", date: "2025-03-15", summary: "Le PSP présente ses candidats pour les élections régionales" }
  ])
  const [stats, setStats] = useState({
    totalMembers: 1250,
    activitiesCompleted: 8,
    nextPayment: "2025-05-01",
    memberSince: memberData?.registration_date ? new Date(memberData.registration_date).toLocaleDateString() : "N/A"
  })

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push('/login')
      return
    }

    // Fetch member data
    const fetchMemberData = async () => {
      try {
        console.log('Récupération des données du membre pour l\'utilisateur:', user.id);
        
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.error('Erreur récupération données membre:', error);
          
          // Si le membre n'existe pas encore, créez-en un
          if (error.code === 'PGRST116') {
            console.log('Membre non trouvé, création d\'un nouveau membre');
            
            const { data: newMember, error: insertError } = await supabase
              .from('members')
              .insert([
                {
                  user_id: user.id,
                  first_name: 'Nouveau',
                  last_name: 'Membre',
                  email: user.email,
                  phone: '',
                  address: '',
                  registration_date: new Date().toISOString(),
                  member_status: 'actif'
                }
              ])
              .select();
              
            if (insertError) {
              console.error('Erreur création membre:', insertError);
              throw insertError;
            }
            
            setMemberData(newMember[0]);
            // Initialiser les données d'édition
            setEditProfileData({
              first_name: newMember[0].first_name || '',
              last_name: newMember[0].last_name || '',
              email: newMember[0].email || user.email || '',
              phone: newMember[0].phone || '',
              address: newMember[0].address || ''
            });
          } else {
            throw error;
          }
        } else {
          console.log('Données membre récupérées:', data);
          setMemberData(data);
          // Initialiser les données d'édition avec les données actuelles du membre
          setEditProfileData({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: data.email || user.email || '',
            phone: data.phone || '',
            address: data.address || ''
          });
        }
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

  const handleEditProfile = () => {
    setActiveTab('editProfile')
  }

  const handleCancelEdit = () => {
    setActiveTab('profile')
    // Réinitialiser les données d'édition
    setEditProfileData({
      first_name: memberData?.first_name || '',
      last_name: memberData?.last_name || '',
      email: memberData?.email || user.email || '',
      phone: memberData?.phone || '',
      address: memberData?.address || ''
    })
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setEditProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mise à jour des données du membre dans Supabase
      const { data, error } = await supabase
        .from('members')
        .update({
          first_name: editProfileData.first_name,
          last_name: editProfileData.last_name,
          email: editProfileData.email,
          phone: editProfileData.phone,
          address: editProfileData.address,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()

      if (error) throw error

      // Mettre à jour les données locales
      setMemberData({
        ...memberData,
        ...editProfileData,
        updated_at: new Date().toISOString()
      })

      toast.success('Profil mis à jour avec succès!')
      setActiveTab('profile')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Erreur lors de la mise à jour du profil')
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-xl font-bold text-primary mb-1">Bienvenue, {memberData?.first_name || 'Membre'} !</h1>
          <p className="text-gray-600">Votre espace membre PSP</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b mb-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 flex items-center space-x-2 text-sm font-medium border-b-2 ${
              activeTab === 'profile'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            <FaUser className="flex-shrink-0" />
            <span>Mon profil</span>
          </button>
          <button
            onClick={() => setActiveTab('editProfile')}
            className={`py-3 px-4 flex items-center space-x-2 text-sm font-medium border-b-2 ${
              activeTab === 'editProfile'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            <FaUserCog className="flex-shrink-0" />
            <span>Modifier mon profil</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-4 flex items-center space-x-2 text-sm font-medium border-b-2 ${
              activeTab === 'events'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            <FaCalendarCheck className="flex-shrink-0" />
            <span>Événements</span>
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`py-3 px-4 flex items-center space-x-2 text-sm font-medium border-b-2 ${
              activeTab === 'news'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            <FaNewspaper className="flex-shrink-0" />
            <span>Actualités</span>
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`py-3 px-4 flex items-center space-x-2 text-sm font-medium border-b-2 ${
              activeTab === 'card'
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            <FaIdCard className="flex-shrink-0" />
            <span>Carte membre</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-md overflow-hidden p-4">
          {activeTab === 'profile' && memberData && (
            <div>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                      <FaUser className="text-primary text-3xl" />
                    </div>
                    <h2 className="text-xl font-semibold">{memberData.first_name} {memberData.last_name}</h2>
                    <p className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                      Membre {memberData.member_status}
                    </p>
                    
                    <div className="mt-4 w-full max-w-xs bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-700 mb-2">Informations</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <FaIdCard className="text-primary mr-2 flex-shrink-0" />
                          <span>ID: PSP-{memberData?.id || '000'}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FaCalendarAlt className="text-primary mr-2 flex-shrink-0" />
                          <span>Depuis: {new Date(memberData?.registration_date || new Date()).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-blue-700">Prochains paiements</h3>
                          <FaMoneyBillWave className="text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-600">Date d'échéance:</p>
                        <p className="font-semibold">{stats.nextPayment}</p>
                        <div className="mt-2">
                          <button className="text-xs text-blue-700 font-medium">Voir l'historique</button>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-green-700">Statistiques PSP</h3>
                          <FaUsers className="text-green-500" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Total membres:</span>
                            <span className="font-medium">{stats.totalMembers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Activités complétées:</span>
                            <span className="font-medium">{stats.activitiesCompleted}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-700 mb-3">Coordonnées</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <FaEnvelope className="text-primary mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Email:</p>
                            <p className="text-gray-700">{memberData?.email || 'Non spécifié'}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FaPhone className="text-primary mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Téléphone:</p>
                            <p className="text-gray-700">{memberData?.phone || 'Non spécifié'}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-primary mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Adresse:</p>
                            <p className="text-gray-700">{memberData?.address || 'Non spécifié'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button 
                          onClick={() => setActiveTab('editProfile')}
                          className="flex items-center space-x-1 text-sm font-medium text-primary hover:text-primary-dark transition"
                        >
                          <FaUserCog size={14} />
                          <span>Modifier mes informations</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'editProfile' && (
            <div>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Prénom</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={editProfileData.first_name}
                    onChange={handleProfileChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={editProfileData.last_name}
                    onChange={handleProfileChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editProfileData.email}
                    onChange={handleProfileChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editProfileData.phone}
                    onChange={handleProfileChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                  <textarea
                    id="address"
                    name="address"
                    value={editProfileData.address}
                    onChange={handleProfileChange}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  ></textarea>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <FaArrowLeft className="mr-2" />
                    Annuler
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center disabled:opacity-70"
                  >
                    <FaSave className="mr-2" />
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Événements à venir</h2>
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <FaCalendarCheck className="mr-2 text-primary" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <FaMapMarkerAlt className="mr-2 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <button className="px-3 py-1 rounded text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-white transition">
                        Participer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Actualités du PSP</h2>
              <div className="space-y-4">
                {news.map(item => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1 mb-2">
                      <FaCalendarAlt className="mr-2 text-primary" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700">{item.summary}</p>
                    <button className="mt-2 text-primary font-medium text-sm flex items-center">
                      Lire plus <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </div>
                ))}
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
                    <p className="font-semibold">{memberData?.first_name} {memberData?.last_name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs opacity-80 mb-1">N° de membre</p>
                      <p className="font-semibold">PSP-{memberData?.id}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-80 mb-1">Date d'adhésion</p>
                      <p className="font-semibold">{new Date(memberData?.registration_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="inline-block bg-white text-primary px-3 py-1 rounded-full text-xs font-semibold">
                      {memberData?.member_status?.toUpperCase()}
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

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p> 2025 Parti Socialiste Panafricain</p>
            <div className="flex justify-center space-x-4 text-sm mt-2 text-gray-300">
              <Link href="/about" className="hover:text-white transition">À propos</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
              <Link href="/events" className="hover:text-white transition">Événements</Link>
              <Link href="/conditions" className="hover:text-white transition">Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

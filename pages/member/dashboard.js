import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast'
import { 
  FaUser, FaIdCard, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, 
  FaUsers, FaMoneyBillWave, FaUserCog, FaCalendarCheck, FaNewspaper, 
  FaArrowLeft, FaSave, FaFileDownload
} from 'react-icons/fa'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Données par défaut pour éviter les erreurs
const DEFAULT_MEMBER = {
  first_name: 'Membre',
  last_name: 'PSP',
  email: '',
  phone: '',
  address: '',
  member_status: 'actif',
  id: '000',
  registration_date: new Date().toISOString()
};

// Données statiques pour le tableau de bord
const STATIC_EVENTS = [
  { id: 1, title: "Assemblée Générale", date: "2025-05-15", location: "Siège PSP" },
  { id: 2, title: "Session de formation", date: "2025-04-25", location: "Centre culturel" },
  { id: 3, title: "Réunion des membres", date: "2025-05-03", location: "Hôtel Ivoire" }
];

const STATIC_NEWS = [
  { id: 1, title: "Nouveau programme de formation", date: "2025-03-29", summary: "Le PSP lance un programme de formation pour les jeunes militants" },
  { id: 2, title: "Élections régionales", date: "2025-03-15", summary: "Le PSP présente ses candidats pour les élections régionales" }
];

const STATIC_STATS = {
  totalMembers: 1250,
  activitiesCompleted: 8,
  nextPayment: "2025-05-01"
};

export default function Dashboard() {
  const router = useRouter()
  const user = useUser()
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(false)
  const [memberData, setMemberData] = useState(DEFAULT_MEMBER)
  const [activeTab, setActiveTab] = useState('profile')
  const [dataLoaded, setDataLoaded] = useState(false)
  const [fallbackMode, setFallbackMode] = useState(false)
  
  // État pour l'édition du profil
  const [editProfileData, setEditProfileData] = useState({
    first_name: DEFAULT_MEMBER.first_name,
    last_name: DEFAULT_MEMBER.last_name,
    email: DEFAULT_MEMBER.email,
    phone: DEFAULT_MEMBER.phone,
    address: DEFAULT_MEMBER.address
  })
  
  // Données statiques pour les événements
  const [events] = useState([
    {
      id: 1,
      title: "Assemblée Générale Annuelle",
      date: "2024-08-15T14:00:00",
      location: "Siège du PSP, Yaoundé"
    },
    {
      id: 2,
      title: "Formation sur les principes socialistes",
      date: "2024-08-28T10:00:00",
      location: "Centre culturel, Douala"
    },
    {
      id: 3,
      title: "Débat sur l'économie solidaire",
      date: "2024-09-05T18:30:00",
      location: "Université de Yaoundé I"
    }
  ])
  
  // Données statiques pour les actualités
  const [news] = useState([
    {
      id: 1,
      title: "Nomination du nouveau porte-parole du PSP",
      date: "2024-07-28T09:00:00",
      summary: "Le PSP a annoncé la nomination de M. Jean Moulin comme nouveau porte-parole du parti."
    },
    {
      id: 2,
      title: "Succès de la campagne de recrutement 2024",
      date: "2024-07-15T14:30:00",
      summary: "Plus de 200 nouveaux membres ont rejoint le PSP depuis le début de l'année 2024."
    },
    {
      id: 3,
      title: "Position du PSP sur la réforme économique",
      date: "2024-07-05T11:00:00",
      summary: "Le PSP a publié un document détaillant sa position sur les nouvelles mesures économiques."
    }
  ])
  
  // Statistiques du membre
  const [stats, setStats] = useState({
    totalMembers: "1,245",
    activitiesCompleted: "52",
    memberSince: "N/A",
    nextPayment: "15/12/2024"
  })

  const [connectionStatus, setConnectionStatus] = useState(null)

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push('/login')
      return
    }

    const loadData = async () => {
      try {
        setLoading(true)
        
        // Initialiser avec les données par défaut pour éviter les erreurs
        if (!dataLoaded) {
          console.log("Initialisation avec les données par défaut")
          // On a déjà initialisé les états avec les données par défaut
          
          // Tenter de récupérer les données réelles
          try {
            console.log("Tentative de récupération des données depuis Supabase")
            
            // Vérifier si on peut se connecter à Supabase
            const { data: tableCheck, error: tableError } = await supabase
              .from('members')
              .select('count(*)')
              .limit(1)
            
            if (tableError) {
              console.error("Erreur de connexion à Supabase:", tableError)
              toast.error("Impossible de contacter le serveur")
              setFallbackMode(true)
              setLoading(false)
              return
            }
            
            // Récupérer les données du membre
            const { data: memberResult, error: memberError } = await supabase
              .from('members')
              .select('*')
              .eq('user_id', user.id)
            
            if (memberError) {
              console.error("Erreur lors de la récupération des données du membre:", memberError)
              toast.error("Erreur lors du chargement du profil")
              setFallbackMode(true)
              setLoading(false)
              return
            }
            
            // Si le membre existe, utiliser ses données
            if (memberResult && memberResult.length > 0) {
              console.log("Membre trouvé:", memberResult[0])
              
              const member = memberResult[0]
              setMemberData(member)
              
              setEditProfileData({
                first_name: member.first_name || DEFAULT_MEMBER.first_name,
                last_name: member.last_name || DEFAULT_MEMBER.last_name,
                email: member.email || user.email || DEFAULT_MEMBER.email,
                phone: member.phone || DEFAULT_MEMBER.phone,
                address: member.address || DEFAULT_MEMBER.address
              })
              
              // Mettre à jour les statistiques avec la date d'inscription
              setStats(prevStats => ({
                ...prevStats,
                memberSince: member.registration_date 
                  ? new Date(member.registration_date).toLocaleDateString() 
                  : "N/A"
              }))
              
              setDataLoaded(true)
              toast.success("Données chargées avec succès")
            } else {
              console.log("Aucun membre trouvé, création d'un nouveau membre")
              
              // Créer un nouveau membre
              const newMember = {
                user_id: user.id,
                first_name: DEFAULT_MEMBER.first_name,
                last_name: DEFAULT_MEMBER.last_name,
                email: user.email || DEFAULT_MEMBER.email,
                phone: DEFAULT_MEMBER.phone,
                address: DEFAULT_MEMBER.address,
                registration_date: new Date().toISOString(),
                member_status: 'actif'
              }
              
              try {
                const { data: insertResult, error: insertError } = await supabase
                  .from('members')
                  .insert([newMember])
                  .select()
                
                if (insertError) {
                  console.error("Erreur lors de la création du membre:", insertError)
                  toast.error("Erreur lors de la création du profil")
                  setFallbackMode(true)
                  setLoading(false)
                  return
                }
                
                if (insertResult && insertResult.length > 0) {
                  console.log("Nouveau membre créé:", insertResult[0])
                  setMemberData(insertResult[0])
                  
                  // Mettre à jour les statistiques avec la date d'inscription
                  setStats(prevStats => ({
                    ...prevStats,
                    memberSince: insertResult[0].registration_date 
                      ? new Date(insertResult[0].registration_date).toLocaleDateString() 
                      : "N/A"
                  }))
                  
                  setDataLoaded(true)
                  toast.success("Profil créé avec succès")
                } else {
                  // Si l'insertion a fonctionné mais n'a pas retourné de données
                  setMemberData(newMember)
                  setDataLoaded(true)
                  toast.success("Profil créé")
                }
              } catch (insertErr) {
                console.error("Exception lors de la création du membre:", insertErr)
                setFallbackMode(true)
                toast.error("Erreur lors de la création du profil")
              }
            }
          } catch (err) {
            console.error("Exception lors de la récupération des données:", err)
            setFallbackMode(true)
            toast.error("Erreur de connexion au serveur")
          }
        }
      } catch (error) {
        console.error("Erreur générale:", error)
        setFallbackMode(true)
        toast.error("Une erreur est survenue")
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [user, router, supabase, dataLoaded])

  // Fonction pour sauvegarder les modifications du profil
  const handleSaveProfile = async (e) => {
    e.preventDefault()
    
    // Vérification du mode hors connexion
    if (fallbackMode) {
      toast.error("Impossible de mettre à jour le profil en mode hors connexion")
      return
    }
    
    try {
      setLoading(true)
      
      // Validation des données
      if (!editProfileData.first_name || !editProfileData.last_name || !editProfileData.email) {
        toast.error("Veuillez remplir tous les champs obligatoires")
        setLoading(false)
        return
      }
      
      // Vérifier que l'email est valide
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(editProfileData.email)) {
        toast.error("Veuillez entrer une adresse email valide")
        setLoading(false)
        return
      }
      
      console.log("Mise à jour du profil avec les données:", editProfileData)
      
      // Mise à jour du profil dans Supabase
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
      
      if (error) {
        console.error("Erreur lors de la mise à jour du profil:", error)
        toast.error("Erreur lors de la mise à jour du profil")
        return
      }
      
      // Mettre à jour les données locales
      if (data && data.length > 0) {
        console.log("Profil mis à jour avec succès:", data[0])
        setMemberData(data[0])
        toast.success("Profil mis à jour avec succès")
        setActiveTab('profile')
      } else {
        // Si Supabase ne retourne pas les données mises à jour
        console.log("Profil mis à jour mais aucune donnée retournée")
        
        // Mettre à jour manuellement les données locales
        setMemberData(prevData => ({
          ...prevData,
          ...editProfileData
        }))
        
        toast.success("Profil mis à jour")
        setActiveTab('profile')
      }
    } catch (error) {
      console.error("Exception lors de la mise à jour du profil:", error)
      toast.error("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }
  
  // Gérer les changements dans le formulaire de profil
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setEditProfileData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  
  // Annuler l'édition du profil
  const handleCancelEdit = () => {
    // Restaurer les données initiales
    setEditProfileData({
      first_name: memberData?.first_name || DEFAULT_MEMBER.first_name,
      last_name: memberData?.last_name || DEFAULT_MEMBER.last_name,
      email: memberData?.email || user?.email || DEFAULT_MEMBER.email,
      phone: memberData?.phone || DEFAULT_MEMBER.phone,
      address: memberData?.address || DEFAULT_MEMBER.address
    })
    
    // Retourner à l'onglet profil
    setActiveTab('profile')
  }
  
  // Fonction pour générer et télécharger la carte de membre
  const generateMemberCard = async () => {
    try {
      if (fallbackMode) {
        toast.error("Impossible de générer la carte en mode hors connexion")
        return
      }
      
      setLoading(true)
      toast.loading("Génération de la carte en cours...")
      
      // Trouver l'élément de la carte
      const cardElement = document.querySelector('.card-container')
      if (!cardElement) {
        toast.error("Impossible de trouver l'élément de la carte")
        setLoading(false)
        return
      }
      
      try {
        // Utiliser html2canvas pour convertir la carte en image
        const canvas = await html2canvas(cardElement, {
          scale: 2, // Meilleure qualité
          backgroundColor: null,
          logging: false
        })
        
        // Créer un PDF
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: [85, 55] // Format carte de crédit
        })
        
        // Ajouter l'image au PDF
        const imgData = canvas.toDataURL('image/png')
        pdf.addImage(imgData, 'PNG', 0, 0, 85, 55)
        
        // Télécharger le PDF
        pdf.save(`carte_membre_psp_${memberData.last_name.toLowerCase()}.pdf`)
        
        toast.dismiss()
        toast.success("Carte générée avec succès")
      } catch (canvasError) {
        console.error("Erreur lors de la génération de l'image:", canvasError)
        toast.error("Erreur lors de la génération de la carte")
      }
    } catch (error) {
      console.error("Erreur lors de la génération de la carte:", error)
      toast.error("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }
  
  // Fonction de déconnexion
  const handleSignOut = async () => {
    try {
      setLoading(true)
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error("Erreur lors de la déconnexion:", error)
        toast.error("Erreur lors de la déconnexion")
        return
      }
      
      toast.success("Déconnexion réussie")
      router.push('/login')
    } catch (error) {
      console.error("Exception lors de la déconnexion:", error)
      toast.error("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const testSupabaseConnection = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('members')
        .select('count(*)')
        .limit(1)
      
      if (error) {
        setConnectionStatus({
          success: false,
          message: "Erreur de connexion à Supabase",
          details: error.message
        })
      } else {
        setConnectionStatus({
          success: true,
          message: "Connexion à Supabase réussie"
        })
      }
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: "Erreur lors de la connexion à Supabase",
        details: error.message
      })
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
          
          {fallbackMode && (
            <div className="mt-2 py-2 px-3 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200">
              Mode limité : certaines fonctionnalités peuvent ne pas être disponibles.
            </div>
          )}
        </div>

        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto border-b mb-0">
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
          {loading ? (
            <div className="py-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-gray-600">Chargement des données...</p>
            </div>
          ) : (
            <>
              {activeTab === 'profile' && (
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
                              <span>ID: PSP-{memberData.id || '000'}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <FaCalendarAlt className="text-primary mr-2 flex-shrink-0" />
                              <span>Depuis: {stats.memberSince}</span>
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
                              disabled={fallbackMode}
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
            
              {activeTab === 'editProfile' && !fallbackMode && (
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
              
              {activeTab === 'editProfile' && fallbackMode && (
                <div className="py-8 text-center">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
                    <FaUserCog className="text-yellow-500 text-3xl mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-yellow-800 mb-2">Fonction non disponible</h3>
                    <p className="text-gray-600 mb-4">La modification du profil n'est pas disponible en mode hors connexion.</p>
                    <p className="text-sm text-gray-500">Veuillez réessayer ultérieurement lorsque la connexion au serveur sera rétablie.</p>
                  </div>
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
                  <div className="card-container rounded-lg overflow-hidden shadow-md bg-gradient-to-r from-secondary to-primary mb-6">
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
                          <p className="font-semibold">PSP-{memberData?.id || '000'}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-80 mb-1">Date d'adhésion</p>
                          <p className="font-semibold">{stats.memberSince}</p>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="inline-block bg-white text-primary px-3 py-1 rounded-full text-xs font-semibold">
                          {memberData?.member_status?.toUpperCase() || 'ACTIF'}
                        </div>
                      </div>
                    </div>
                  </div>
            
                  <div className="space-y-4">
                    <button
                      onClick={generateMemberCard}
                      disabled={loading || fallbackMode}
                      className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center disabled:opacity-70"
                    >
                      <FaFileDownload className="mr-2" />
                      {loading ? 'Génération en cours...' : 'Télécharger ma carte de membre'}
                    </button>
                    
                    {fallbackMode && (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-sm">
                        <p>Le téléchargement de la carte n'est pas disponible en mode hors connexion.</p>
                      </div>
                    )}
                    
                    {!fallbackMode && (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-sm">
                        <p>Vous pouvez télécharger votre carte de membre numérique ou la présenter directement depuis votre téléphone lors des événements du PSP.</p>
                      </div>
                    )}
                    
                    {/* Outil de diagnostic */}
                    <div className="mt-6 border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-800 mb-2">Diagnostic de connexion</h3>
                      <button
                        onClick={testSupabaseConnection}
                        className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center mb-3"
                      >
                        Tester la connexion Supabase
                      </button>
                      {connectionStatus && (
                        <div className={`p-3 rounded-lg text-sm ${
                          connectionStatus.success 
                            ? 'bg-green-50 text-green-800 border border-green-200' 
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}>
                          <p className="font-medium">{connectionStatus.message}</p>
                          {connectionStatus.details && (
                            <div className="mt-2 p-2 bg-white/50 rounded overflow-auto max-h-28 text-xs font-mono">
                              {connectionStatus.details}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
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

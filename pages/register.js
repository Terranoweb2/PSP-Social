import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    idNumber: '',
    acceptTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [step, setStep] = useState(1)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Veuillez remplir tous les champs obligatoires")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return false
    }
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      return false
    }
    setError(null)
    return true
  }

  const validateStep2 = () => {
    if (!formData.phone || !formData.dateOfBirth || !formData.address || !formData.idNumber) {
      setError("Veuillez remplir tous les champs obligatoires")
      return false
    }
    if (!formData.acceptTerms) {
      setError("Vous devez accepter les conditions d'adhésion")
      return false
    }
    setError(null)
    return true
  }

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const prevStep = () => {
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (step === 1) {
      nextStep()
      return
    }
    
    if (!validateStep2()) {
      return
    }
    
    setLoading(true)
    setError(null)

    try {
      console.log('Données du formulaire:', formData);
      
      // Inscription avec Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })
      
      if (authError) {
        console.error('Erreur auth Supabase:', authError);
        throw authError;
      }
      
      console.log('Utilisateur créé:', authData);
      
      if (!authData || !authData.user || !authData.user.id) {
        throw new Error("Impossible de créer l'utilisateur. Veuillez réessayer.");
      }
      
      // Ajouter les données du membre dans la table 'members'
      const memberData = {
        user_id: authData.user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        address: formData.address,
        id_number: formData.idNumber,
        registration_date: new Date().toISOString(),
        member_status: 'actif'
      };
      
      console.log('Données membre à insérer:', memberData);
      
      const { data: insertedMember, error: memberError } = await supabase
        .from('members')
        .insert([memberData])
        .select();
      
      if (memberError) {
        console.error('Erreur insertion membre:', memberError);
        throw memberError;
      }
      
      console.log('Membre inséré:', insertedMember);
      
      toast.success("Inscription réussie! Vous pouvez maintenant vous connecter.")
      
      // Redirection vers la page de connexion
      router.push('/login')
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setError(`Une erreur s'est produite lors de l'inscription: ${error.message || 'Erreur inconnue'}`);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Adhésion | PSP</title>
        <meta name="description" content="Adhérer au Parti Socialiste Panafricain" />
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
              <h1 className="text-xl font-bold text-primary text-center">Adhésion au PSP</h1>
              <div className="flex justify-center mt-2">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>1</div>
                  <div className="w-10 h-1 bg-gray-200">
                    <div className={`h-full ${step === 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>2</div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {error && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                        <div className="relative">
                          <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <FaUser className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                        <div className="relative">
                          <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <FaUser className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <FaEnvelope className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                          placeholder="••••••••"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">6 caractères minimum</p>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe *</label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <FaPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                          placeholder="+XXX XXXXXXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date de naissance *</label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          required
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3 pt-1">
                          <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="address"
                          name="address"
                          rows="2"
                          required
                          value={formData.address}
                          onChange={handleChange}
                          className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                        ></textarea>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">N° Pièce d'identité *</label>
                      <div className="relative">
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <FaIdCard className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="idNumber"
                          name="idNumber"
                          type="text"
                          required
                          value={formData.idNumber}
                          onChange={handleChange}
                          className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="acceptTerms"
                          name="acceptTerms"
                          type="checkbox"
                          required
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="acceptTerms" className="font-medium text-gray-700">J'accepte les <Link href="/terms" className="text-primary hover:underline" target="_blank">conditions d'adhésion</Link> du PSP *</label>
                      </div>
                    </div>
                  </>
                )}

                <div className={`flex ${step === 1 ? 'justify-end' : 'justify-between'} mt-6`}>
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                      Précédent
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none"
                  >
                    {loading 
                      ? 'Traitement en cours...' 
                      : step === 1 
                        ? 'Suivant' 
                        : "S'inscrire"
                    }
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Déjà membre?{' '}
                  <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
                    Se connecter
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

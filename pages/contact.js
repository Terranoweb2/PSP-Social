import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Dans une version future, ce formulaire pourrait être connecté à une API pour envoyer des emails
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Contact | PSP</title>
        <meta name="description" content="Contactez le Parti Socialiste Panafricain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header - Version mobile */}
      <header className="psp-gradient text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1739129965/PSP_copie_xtws5v.png" alt="Logo PSP" className="w-10 h-10 rounded-full" />
            <h1 className="text-lg font-bold">PSP</h1>
          </Link>
          <div className="flex items-center space-x-2">
            <Link href="/login" className="py-2 px-3 text-sm rounded-lg border border-white/30 hover:bg-white/20 transition-all">
              Connexion
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center mb-6">Contactez-nous</h1>
        
        {submitted ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Message envoyé !</h2>
              <p className="text-gray-600 mb-4">Nous vous répondrons dans les plus brefs délais.</p>
              <Link href="/" className="py-2 px-4 bg-primary text-white rounded-lg inline-block">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Informations de contact */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4">Nos coordonnées</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-primary mr-3 flex-shrink-0" />
                  <a href="tel:+12345678" className="text-gray-700 hover:text-primary">+123 456 78</a>
                </div>
                <div className="flex items-center">
                  <FaWhatsapp className="text-primary mr-3 flex-shrink-0" />
                  <a href="https://wa.me/12345678" className="text-gray-700 hover:text-primary">+123 456 78</a>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-primary mr-3 flex-shrink-0" />
                  <a href="mailto:contact@psp-afrique.org" className="text-gray-700 hover:text-primary">contact@psp-afrique.org</a>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-primary mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Siège du Parti Socialiste Panafricain, Côte d'Ivoire</span>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">
              <h2 className="text-xl font-semibold mb-4">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Footer - Version mobile */}
      <footer className="bg-dark text-white py-4 mt-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm mb-3">&copy; {new Date().getFullYear()} Parti Socialiste Panafricain</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/about" className="text-white hover:text-gray-300">À propos</Link>
              <Link href="/contact" className="text-white hover:text-gray-300">Contact</Link>
              <Link href="/terms" className="text-white hover:text-gray-300">Conditions</Link>
              <Link href="/privacy" className="text-white hover:text-gray-300">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

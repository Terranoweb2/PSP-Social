import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser } from 'react-icons/fa'

export default function Events() {
  // Ces données seraient normalement récupérées d'une base de données
  const [events] = useState([
    {
      id: 1,
      title: "Conférence: Panafricanisme et Développement",
      date: "15 avril 2025",
      time: "14:00 - 17:00",
      location: "Hôtel Ivoire, Abidjan",
      image: "https://res.cloudinary.com/dxy0fiahv/image/upload/v1733248089/IMG_0158_frzn8s.jpg",
      description: "Conférence sur les enjeux du panafricanisme dans le développement économique de l'Afrique. Intervenants: Dr TOH Jean Georges Glacia et d'autres experts.",
      speaker: "Dr TOH Jean Georges Glacia"
    },
    {
      id: 2,
      title: "Assemblée Générale des Membres",
      date: "30 avril 2025",
      time: "09:00 - 12:00",
      location: "Siège du PSP, Abidjan",
      image: "https://res.cloudinary.com/dxy0fiahv/image/upload/v1733247771/psp_dio_wtcdeb.jpg",
      description: "Assemblée générale annuelle des membres du PSP. Présentation des activités et des projets pour l'année à venir.",
      speaker: "Bureau Exécutif du PSP"
    },
    {
      id: 3,
      title: "Forum des Jeunes Panafricanistes",
      date: "10 mai 2025",
      time: "10:00 - 16:00",
      location: "Université de Cocody, Abidjan",
      image: "https://res.cloudinary.com/dxy0fiahv/image/upload/v1733247587/toh_glacia_au_libanais5_upuxrv.jpg",
      description: "Forum destiné aux jeunes militants et sympathisants panafricanistes. Thème: 'L'avenir de l'Afrique entre les mains de sa jeunesse'.",
      speaker: "Comité Jeunesse du PSP"
    }
  ])

  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Événements | PSP</title>
        <meta name="description" content="Événements à venir du Parti Socialiste Panafricain" />
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
        <h1 className="text-2xl font-bold text-center mb-6">Événements à venir</h1>
        
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUser className="mr-2 text-primary" />
                    <span>{event.speaker}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{event.description}</p>
                
                <div className="flex justify-between items-center">
                  <Link href={`/events/${event.id}`} className="text-primary font-medium hover:underline">
                    Détails
                  </Link>
                  <button className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
                    Participer
                  </button>
                </div>
              </div>
            </div>
          ))}
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

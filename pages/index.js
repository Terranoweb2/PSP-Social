import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaUsers, FaNewspaper, FaCalendarAlt, FaHandshake } from 'react-icons/fa'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function Home() {
  const router = useRouter()
  
  const carouselImages = [
    {
      url: "https://res.cloudinary.com/dxy0fiahv/image/upload/v1733248089/IMG_0158_frzn8s.jpg",
      alt: "Membres du PSP"
    },
    {
      url: "https://res.cloudinary.com/dxy0fiahv/image/upload/v1733247771/psp_dio_wtcdeb.jpg",
      alt: "Événement PSP"
    },
    {
      url: "https://res.cloudinary.com/dxy0fiahv/image/upload/v1733247587/toh_glacia_au_libanais5_upuxrv.jpg",
      alt: "Dr TOH Glacia au Liban"
    }
  ]
  
  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Parti Socialiste Panafricain (PSP)</title>
        <meta name="description" content="Plateforme officielle du Parti Socialiste Panafricain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header/Navigation */}
      <header className="psp-gradient text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1739129965/PSP_copie_xtws5v.png" alt="Logo PSP" className="w-10 h-10 rounded-full" />
            <h1 className="text-lg font-bold">PSP</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/login" className="py-2 px-3 text-sm rounded-lg border border-white/30 hover:bg-white/20 transition-all">
              Connexion
            </Link>
            <Link href="/register" className="py-2 px-3 text-sm rounded-lg bg-white text-primary hover:bg-white/90 transition-all">
              Adhérer
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="py-8 bg-gradient-to-b from-secondary to-secondary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-full mb-6">
              <h1 className="text-3xl font-bold leading-tight mb-3 text-center">Rejoignez le PSP</h1>
              <p className="text-lg mb-6 text-center">Ensemble, construisons une Afrique unie, prospère et solidaire.</p>
              <Carousel 
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                showStatus={false}
                className="rounded-lg overflow-hidden shadow-xl mb-6"
              >
                {carouselImages.map((image, index) => (
                  <div key={index} className="h-64">
                    <img 
                      src={image.url} 
                      alt={image.alt} 
                      className="object-cover h-full w-full"
                    />
                  </div>
                ))}
              </Carousel>
              <div className="flex flex-col space-y-3">
                <Link href="/register" className="py-3 px-6 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all text-center font-medium">
                  Devenir membre
                </Link>
                <Link href="/about" className="py-3 px-6 rounded-lg border border-white/30 hover:bg-white/20 transition-all text-center">
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">Notre engagement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all card-hover">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">Unité Panafricaine</h3>
              <p className="text-gray-600">Nous promouvons l'unité et la solidarité entre tous les peuples africains.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all card-hover">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">Justice Sociale</h3>
              <p className="text-gray-600">Nous luttons pour l'égalité des chances et la répartition équitable des ressources.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all card-hover">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaNewspaper className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">Éducation Populaire</h3>
              <p className="text-gray-600">Nous sensibilisons et formons les citoyens aux valeurs socialistes et démocratiques.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all card-hover">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">Action Militante</h3>
              <p className="text-gray-600">Nous organisons des événements et actions pour faire avancer nos idéaux.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-4">Prêt à nous rejoindre?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">Devenez membre du Parti Socialiste Panafricain et participez activement à la construction d'une Afrique unie et prospère.</p>
          <Link href="/register" className="py-3 px-8 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all text-lg font-medium">
            S'inscrire maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PSP</h3>
              <p className="text-gray-300 mb-4">Le Parti Socialiste Panafricain œuvre pour l'unité et la prospérité de l'Afrique.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white">À propos</Link></li>
                <li><Link href="/news" className="text-gray-300 hover:text-white">Actualités</Link></li>
                <li><Link href="/events" className="text-gray-300 hover:text-white">Événements</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><Link href="/documents" className="text-gray-300 hover:text-white">Documents</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Confidentialité</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-gray-300">
                <p>123 Boulevard de l'Unité</p>
                <p>Abidjan, Côte d'Ivoire</p>
                <p className="mt-4">info@psp-afrique.org</p>
                <p>+225 07 12 34 56 78</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Parti Socialiste Panafricain. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

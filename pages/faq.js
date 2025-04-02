import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa'

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  
  // Catégories de questions
  const categories = [
    { id: 'general', name: 'Général' },
    { id: 'membership', name: 'Adhésion' },
    { id: 'ideology', name: 'Idéologie' },
    { id: 'events', name: 'Événements' }
  ]
  
  // Questions fréquemment posées
  const faqs = [
    {
      id: 1,
      category: 'general',
      question: "Qu'est-ce que le Parti Socialiste Panafricain (PSP) ?",
      answer: "Le Parti Socialiste Panafricain (PSP) est un mouvement politique fondé par le Dr TOH Jean Georges Glacia, qui promeut l'unité africaine, le socialisme africain et le développement socio-économique du continent. Notre vision est celle d'une Afrique unie, prospère et souveraine, qui valorise la solidarité, la justice sociale et le bien-être collectif."
    },
    {
      id: 2,
      category: 'general',
      question: "Quel est l'objectif principal du PSP ?",
      answer: "L'objectif principal du PSP est de contribuer à l'émancipation politique, économique et culturelle des peuples africains, à travers la promotion d'une vision panafricaniste moderne. Nous travaillons pour l'unité africaine, la démocratie participative, la souveraineté monétaire et la création d'un marché commun africain qui valorise les ressources du continent au bénéfice de ses populations."
    },
    {
      id: 3,
      category: 'general',
      question: "Qui est le Dr TOH Jean Georges Glacia ?",
      answer: "Le Dr TOH Jean Georges Glacia est le fondateur et président du Parti Socialiste Panafricain. Originaire de Côte d'Ivoire, il est un intellectuel engagé et un visionnaire du panafricanisme moderne. Son parcours universitaire et son engagement politique l'ont conduit à développer une vision holistique des défis africains, intégrant les dimensions économiques, culturelles et politiques nécessaires à une véritable renaissance africaine."
    },
    {
      id: 4,
      category: 'membership',
      question: "Comment puis-je devenir membre du PSP ?",
      answer: "Pour devenir membre du PSP, vous pouvez vous inscrire directement sur notre application mobile ou notre site web en remplissant le formulaire d'adhésion. Vous devrez fournir quelques informations personnelles, accepter les conditions d'adhésion et les valeurs du parti. Une fois votre inscription validée, vous recevrez votre carte de membre et pourrez participer activement à nos activités."
    },
    {
      id: 5,
      category: 'membership',
      question: "Quels sont les avantages d'être membre du PSP ?",
      answer: "En tant que membre du PSP, vous bénéficiez de nombreux avantages, notamment : l'accès prioritaire à nos événements et conférences, la participation aux décisions et orientations du parti, l'accès à des formations et ateliers sur le panafricanisme, la possibilité de contribuer activement aux projets de développement communautaire, et l'appartenance à un réseau de militants engagés pour la cause africaine."
    },
    {
      id: 6,
      category: 'membership',
      question: "Y a-t-il une cotisation à payer pour être membre ?",
      answer: "Oui, il existe une cotisation annuelle symbolique pour les membres du PSP. Cette contribution soutient nos activités et projets. Cependant, le montant est adapté selon les réalités économiques de chaque région, et des exemptions peuvent être accordées dans certains cas. Notre objectif est de rendre l'adhésion accessible à tous ceux qui partagent nos valeurs, indépendamment de leur situation financière."
    },
    {
      id: 7,
      category: 'ideology',
      question: "Qu'est-ce que le panafricanisme ?",
      answer: "Le panafricanisme est un mouvement intellectuel, culturel et politique qui promeut l'unité et la solidarité entre les Africains du continent et de la diaspora. Il vise à dépasser les divisions coloniales et à construire une identité commune pour tous les peuples d'origine africaine. Ce mouvement, né à la fin du XIXe siècle, a évolué au fil du temps mais conserve son objectif fondamental : l'émancipation et le développement autonome des peuples africains."
    },
    {
      id: 8,
      category: 'ideology',
      question: "Comment le PSP définit-il le 'socialisme africain' ?",
      answer: "Le socialisme africain, tel que défini par le PSP, est une approche qui combine les valeurs traditionnelles africaines de solidarité et de communauté avec une vision moderne de justice sociale et de développement équitable. Contrairement aux modèles socialistes importés, il s'enracine dans les réalités culturelles, historiques et socio-économiques africaines. Notre vision reconnaît le rôle de l'État dans la régulation économique tout en valorisant l'initiative privée et l'entrepreneuriat, avec pour objectif premier le bien-être collectif et la réduction des inégalités."
    },
    {
      id: 9,
      category: 'ideology',
      question: "Quelle est la position du PSP sur la souveraineté monétaire ?",
      answer: "Le PSP défend fermement la souveraineté monétaire africaine comme un pilier essentiel de l'indépendance économique. Nous considérons que les systèmes monétaires hérités de la colonisation, comme le Franc CFA, perpétuent des formes de dépendance et limitent la marge de manœuvre des politiques économiques africaines. Notre parti plaide pour la création de monnaies africaines indépendantes et pour des mécanismes d'intégration monétaire à l'échelle continentale, conçus par et pour les Africains."
    },
    {
      id: 10,
      category: 'events',
      question: "Comment puis-je être informé des prochains événements du PSP ?",
      answer: "Pour rester informé des prochains événements du PSP, vous pouvez consulter régulièrement notre application mobile ou notre site web, où nous publions notre calendrier d'activités. Vous pouvez également vous abonner à notre newsletter, nous suivre sur les réseaux sociaux, ou activer les notifications de notre application mobile. Les membres reçoivent automatiquement des invitations personnalisées pour tous nos événements."
    },
    {
      id: 11,
      category: 'events',
      question: "Le PSP organise-t-il des formations sur le panafricanisme ?",
      answer: "Oui, le PSP organise régulièrement des formations, ateliers et séminaires sur le panafricanisme, l'histoire africaine, l'économie politique et d'autres sujets pertinents. Ces formations visent à renforcer la compréhension des enjeux africains contemporains et à développer les compétences de nos militants. Elles sont généralement ouvertes aux membres, mais certaines sessions peuvent être accessibles au grand public sur inscription préalable."
    },
    {
      id: 12,
      category: 'general',
      question: "Comment contacter le PSP pour une question spécifique ?",
      answer: "Pour contacter le PSP concernant une question spécifique, vous pouvez utiliser plusieurs canaux : notre formulaire de contact sur l'application mobile ou le site web, notre adresse email officielle, ou nos lignes téléphoniques dédiées. Pour les questions urgentes ou sensibles, nous vous recommandons de prendre rendez-vous avec un représentant local du parti. Nous nous efforçons de répondre à toutes les demandes dans les meilleurs délais."
    }
  ]
  
  // Filtrer les FAQs par recherche
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  // Regrouper les FAQs par catégorie
  const faqsByCategory = {}
  categories.forEach(category => {
    faqsByCategory[category.id] = filteredFAQs.filter(faq => faq.category === category.id)
  })

  // Gestion de l'expansion des questions
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>FAQ | PSP</title>
        <meta name="description" content="Questions fréquemment posées sur le Parti Socialiste Panafricain" />
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
        <h1 className="text-2xl font-bold text-center mb-6">Questions Fréquemment Posées</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* FAQ Sections */}
        <div className="space-y-6">
          {categories.map(category => (
            faqsByCategory[category.id].length > 0 && (
              <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <h2 className="bg-secondary text-white px-4 py-3 font-semibold">{category.name}</h2>
                <div className="divide-y divide-gray-200">
                  {faqsByCategory[category.id].map(faq => (
                    <div key={faq.id} className="p-4">
                      <button 
                        onClick={() => toggleExpand(faq.id)}
                        className="w-full flex justify-between items-center text-left"
                      >
                        <h3 className="font-medium pr-8">{faq.question}</h3>
                        {expandedId === faq.id ? 
                          <FaChevronUp className="text-primary flex-shrink-0" /> : 
                          <FaChevronDown className="text-gray-500 flex-shrink-0" />
                        }
                      </button>
                      {expandedId === faq.id && (
                        <div className="mt-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
          
          {/* Si aucun résultat n'est trouvé */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Aucune question correspondant à votre recherche n'a été trouvée.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </div>
        
        {/* Contact Section */}
        <div className="mt-10 bg-white rounded-xl shadow-md p-5 text-center">
          <h2 className="text-xl font-semibold mb-3">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="text-gray-600 mb-4">Contactez-nous directement et nous vous répondrons dans les plus brefs délais.</p>
          <Link href="/contact" className="inline-block py-2 px-6 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Nous contacter
          </Link>
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
              <Link href="/news" className="text-white hover:text-gray-300">Actualités</Link>
              <Link href="/faq" className="text-white hover:text-gray-300">FAQ</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

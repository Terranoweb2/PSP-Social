import Head from 'next/head'
import Link from 'next/link'
import { FaGlobe, FaHistory, FaEye, FaHeart, FaTasks, FaUser } from 'react-icons/fa'

export default function About() {
  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>À propos | Parti Socialiste Panafricain</title>
        <meta name="description" content="À propos du Parti Socialiste Panafricain (PSP)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="psp-gradient text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1739129965/PSP_copie_xtws5v.png" alt="Logo PSP" className="w-10 h-10 rounded-full" />
            <h1 className="text-xl font-bold">Parti Socialiste Panafricain</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-white hover:text-gray-200">
              Connexion
            </Link>
            <Link href="/register" className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-full font-medium">
              Devenir membre
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1739129965/PSP_copie_xtws5v.png" 
              alt="Logo PSP" 
              className="w-24 h-24 rounded-full mr-6" 
            />
            <h1 className="text-3xl font-bold">
              <span className="text-red-600">🇨🇮</span> À propos du Parti Socialiste Panafricain (PSP)
            </h1>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-8">
              Le Parti Socialiste Panafricain (PSP) est un parti politique ivoirien et africain engagé pour l'unité du continent, 
              la justice sociale, la souveraineté des peuples et le développement solidaire. Il se revendique du socialisme africain 
              et du panafricanisme authentique, inspiré par les grandes figures telles que Kwame Nkrumah, Modibo Keïta, Sékou Touré et Thomas Sankara.
            </p>

            <div className="space-y-10">
              <section className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <FaHistory className="text-3xl text-primary mr-3" />
                  <h2 className="text-2xl font-bold">📜 Historique</h2>
                </div>
                <p>
                  Le PSP a été fondé dans un contexte de quête de refondation politique en Afrique, face à l'échec des modèles néo-libéraux imposés 
                  et à la faillite des systèmes politiques corrompus. Il est né d'un appel à la résistance intellectuelle, culturelle et politique 
                  lancé par le sociologue panafricain Dr TOH Jean Georges Glacia, qui a mis en avant l'urgence de réconcilier les peuples africains 
                  avec leur propre histoire, leur propre spiritualité et leur capacité à s'autodéterminer.
                </p>
              </section>

              <section className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <FaEye className="text-3xl text-primary mr-3" />
                  <h2 className="text-2xl font-bold">✊ Notre vision</h2>
                </div>
                <blockquote className="italic text-xl border-l-4 border-primary pl-4 py-2 mb-4">
                  "Réveiller la conscience collective africaine et rendre au peuple son pouvoir réel."
                </blockquote>
                <p>Le PSP œuvre à bâtir une Afrique :</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Unifiée et souveraine,</li>
                  <li>Juste et équitable,</li>
                  <li>Forte culturellement,</li>
                  <li>Respectueuse de l'humain et de la nature.</li>
                </ul>
              </section>

              <section className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <FaHeart className="text-3xl text-primary mr-3" />
                  <h2 className="text-2xl font-bold">🌍 Nos valeurs fondamentales</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="font-semibold">Panafricanisme conscient et actif</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="font-semibold">Socialisme participatif et humaniste</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="font-semibold">Justice sociale et équité</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="font-semibold">Solidarité intergénérationnelle</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="font-semibold">Droits humains et libertés</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <p className="font-semibold">Respect de l'environnement</p>
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <FaTasks className="text-3xl text-primary mr-3" />
                  <h2 className="text-2xl font-bold">🎯 Nos objectifs</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block bg-primary text-white rounded-full h-6 w-6 text-center mr-3 flex-shrink-0">1</span>
                    <p>Unir les africains autour d'un projet politique panafricain.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-primary text-white rounded-full h-6 w-6 text-center mr-3 flex-shrink-0">2</span>
                    <p>Promouvoir l'économie solidaire, la redistribution équitable des richesses et l'autosuffisance.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-primary text-white rounded-full h-6 w-6 text-center mr-3 flex-shrink-0">3</span>
                    <p>Défendre les couches vulnérables, notamment les jeunes, les femmes et les travailleurs.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-primary text-white rounded-full h-6 w-6 text-center mr-3 flex-shrink-0">4</span>
                    <p>Lutter contre la corruption, le néocolonialisme et l'aliénation culturelle.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-primary text-white rounded-full h-6 w-6 text-center mr-3 flex-shrink-0">5</span>
                    <p>Œuvrer à l'unification politique et économique du continent africain.</p>
                  </li>
                </ul>
              </section>

              <section className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <FaUser className="text-3xl text-primary mr-3" />
                  <h2 className="text-2xl font-bold">👤 Le Président-Fondateur : Dr TOH Jean Georges Glacia</h2>
                </div>
                <div className="md:flex items-start">
                  <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                    <img 
                      src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1733248087/Dr%20TOH%20Glacia.jpg" 
                      alt="Dr TOH Jean Georges Glacia" 
                      className="w-48 h-48 object-cover mx-auto rounded-full"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <p className="mb-4">
                      Dr TOH Jean Georges Glacia est sociologue de la médiation, diplômé de l'Université d'Évry – Paris-Saclay en 2012. 
                      Chercheur et penseur engagé, il est l'auteur de plusieurs ouvrages sur la religion comparée et le panafricanisme, 
                      dont "L'Âme Collective de l'Afrique : Dialogues entre Socialisme et Panafricanisme" et 
                      "Connaitre l'Islam et son Prophète : La Sunna de Muhammad (Al-Boukhari)".
                    </p>
                    <p>
                      Né le 22 avril 1972 à Tiassalé (Côte d'Ivoire), il milite pour une refonte profonde des mentalités et 
                      une réorganisation des structures politiques et sociales de l'Afrique. Sous sa direction, le PSP se positionne 
                      comme un parti de proposition, d'action et de transformation collective.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Parti Socialiste Panafricain. Tous droits réservés.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/about" className="text-white hover:text-gray-300">À propos</Link>
              <Link href="/contact" className="text-white hover:text-gray-300">Contact</Link>
              <Link href="/terms" className="text-white hover:text-gray-300">Conditions d'adhésion</Link>
              <Link href="/privacy" className="text-white hover:text-gray-300">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

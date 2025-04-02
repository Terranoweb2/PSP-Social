import Head from 'next/head'
import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Politique de confidentialité | Parti Socialiste Panafricain</title>
        <meta name="description" content="Politique de confidentialité du PSP" />
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
          <h1 className="text-3xl font-bold text-center mb-8">Politique de confidentialité</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
              <p className="text-gray-700">
                Le Parti Socialiste Panafricain (PSP) s'engage à protéger votre vie privée. Cette politique de confidentialité 
                explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site web
                et nos services. Nous nous conformons aux lois applicables en matière de protection des données.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Collecte d'informations</h2>
              <p className="text-gray-700">
                Nous collectons les informations personnelles que vous nous fournissez volontairement lors de votre inscription, 
                y compris mais sans s'y limiter :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Nom et prénom</li>
                <li>Date et lieu de naissance</li>
                <li>Adresse de résidence actuelle</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Bureau de vote</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Nous collectons également automatiquement certaines informations techniques lorsque vous visitez notre site, 
                comme votre adresse IP, le type de navigateur, les pages consultées et le temps passé sur chaque page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Utilisation des informations</h2>
              <p className="text-gray-700">
                Nous utilisons vos informations personnelles pour les finalités suivantes :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Gérer votre adhésion au PSP</li>
                <li>Communiquer avec vous concernant les activités du parti</li>
                <li>Vous informer des événements et réunions</li>
                <li>Traiter vos cotisations</li>
                <li>Répondre à vos demandes et questions</li>
                <li>Améliorer notre site web et nos services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Protection des données</h2>
              <p className="text-gray-700">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos 
                informations personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Vos données 
                sont stockées sur des serveurs sécurisés et l'accès à ces informations est limité aux personnes autorisées.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Partage d'informations</h2>
              <p className="text-gray-700">
                Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers sans votre consentement, 
                sauf lorsque cela est nécessaire pour fournir un service que vous avez demandé ou lorsque nous sommes légalement 
                tenus de le faire.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Vos droits</h2>
              <p className="text-gray-700">
                Vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement (droit à l'oubli)</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Pour exercer ces droits, veuillez nous contacter à l'adresse indiquée ci-dessous.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
              <p className="text-gray-700">
                Notre site utilise des cookies pour améliorer votre expérience. Les cookies sont de petits fichiers texte 
                stockés sur votre ordinateur qui nous aident à fournir une meilleure expérience utilisateur. Vous pouvez 
                configurer votre navigateur pour refuser tous les cookies ou pour être alerté lorsque des cookies sont envoyés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Modifications de la politique de confidentialité</h2>
              <p className="text-gray-700">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications 
                seront publiées sur cette page et la date de la dernière mise à jour sera indiquée en bas de page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact</h2>
              <p className="text-gray-700">
                Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à :
                <br /><br />
                Parti Socialiste Panafricain<br />
                Email: contact@psp-afrique.org<br />
                Adresse: [Adresse du siège du PSP]
              </p>
            </section>
          </div>

          <div className="mt-8 text-sm text-center text-gray-500">
            Dernière mise à jour : {new Date().toLocaleDateString()}
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

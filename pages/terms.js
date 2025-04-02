import Head from 'next/head'
import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>Conditions d'adhésion | Parti Socialiste Panafricain</title>
        <meta name="description" content="Conditions d'adhésion au PSP" />
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
          <h1 className="text-3xl font-bold text-center mb-8">Conditions d'adhésion au PSP</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Article 1 : Adhésion au Parti</h2>
              <p className="text-gray-700">
                Peut être membre du Parti Socialiste Panafricain (PSP), toute personne physique qui accepte les présents statuts, 
                adhère au programme politique du Parti et s'acquitte régulièrement de ses cotisations.
                L'adhésion au PSP est libre et volontaire, sans distinction de race, d'origine ethnique, de sexe, 
                de religion ou de condition sociale.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Article 2 : Droits des membres</h2>
              <p className="text-gray-700">
                Tout membre du PSP a le droit de :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Participer aux réunions et assemblées du Parti</li>
                <li>Élire et être élu aux différentes instances du Parti</li>
                <li>Exprimer librement son opinion sur toutes les questions débattues au sein du Parti</li>
                <li>Formuler des propositions et critiques concernant l'action et la politique du Parti</li>
                <li>Bénéficier de la solidarité et du soutien du Parti</li>
                <li>Accéder aux informations sur les activités du Parti</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Article 3 : Devoirs des membres</h2>
              <p className="text-gray-700">
                Tout membre du PSP a le devoir de :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Respecter les statuts et règlements du Parti</li>
                <li>Participer activement à la vie du Parti</li>
                <li>S'acquitter régulièrement de ses cotisations</li>
                <li>Défendre et promouvoir les idéaux et valeurs du Parti</li>
                <li>Observer une discipline de groupe et respecter les décisions prises démocratiquement</li>
                <li>Avoir une conduite exemplaire conforme à l'éthique et à la morale</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Article 4 : Cotisations</h2>
              <p className="text-gray-700">
                Les membres du PSP sont tenus de verser une cotisation annuelle dont le montant est fixé par le Bureau Politique National.
                Le non-paiement de la cotisation pendant deux années consécutives peut entraîner la suspension des droits du membre,
                après avertissement préalable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Article 5 : Procédure d'adhésion</h2>
              <p className="text-gray-700">
                L'adhésion au PSP se fait par le dépôt d'une demande d'adhésion auprès d'une section locale ou par voie électronique.
                Chaque nouvel adhérent reçoit une carte de membre après validation de sa demande et paiement de sa première cotisation.
                L'adhésion est effective à compter de la date d'acceptation de la demande par les instances compétentes du Parti.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Article 6 : Perte de la qualité de membre</h2>
              <p className="text-gray-700">
                La qualité de membre du PSP se perd par :
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Démission volontaire adressée par écrit aux instances du Parti</li>
                <li>Exclusion pour manquement grave aux statuts ou règlements du Parti</li>
                <li>Non-paiement des cotisations pendant une période définie par le règlement intérieur</li>
                <li>Décès</li>
              </ul>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link href="/register" className="bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-full font-medium">
              Retour au formulaire d'inscription
            </Link>
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

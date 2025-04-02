import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaArrowLeft, FaCalendarAlt, FaUser, FaShare } from 'react-icons/fa'

export default function ArticleDetail() {
  const router = useRouter()
  const { id } = router.query
  
  // Articles database (normalement, ces données viendraient d'une API ou base de données)
  const articles = [
    {
      id: 1,
      title: "L'histoire du Panafricanisme : Origines et Évolution",
      category: "history",
      author: "Dr. TOH Jean Georges Glacia",
      date: "15 mars 2025",
      excerpt: "Le panafricanisme est un mouvement intellectuel, culturel et politique né à la fin du XIXe siècle pour promouvoir l'unité et la solidarité entre les Africains du continent et de la diaspora...",
      image: "https://res.cloudinary.com/dxy0fiahv/image/upload/v1733248089/IMG_0158_frzn8s.jpg",
      content: `
        <p>Le panafricanisme est un mouvement intellectuel, culturel et politique né à la fin du XIXe siècle pour promouvoir l'unité et la solidarité entre les Africains du continent et de la diaspora. Ce concept fondamental vise à dépasser les divisions coloniales et à construire une identité commune pour tous les peuples d'origine africaine.</p>
        
        <p>Les origines du panafricanisme remontent aux mouvements anti-esclavagistes et aux luttes pour l'émancipation des peuples noirs. Des intellectuels comme Edward Wilmot Blyden, W.E.B. Du Bois et Marcus Garvey ont posé les bases intellectuelles de ce mouvement.</p>
        
        <p>Le premier Congrès panafricain, organisé à Paris en 1919 par W.E.B. Du Bois, marque le début de l'institutionnalisation du mouvement. Ce congrès, ainsi que les suivants, ont permis aux leaders africains et afro-descendants de formuler des revendications communes contre le colonialisme et pour l'autodétermination des peuples africains.</p>
        
        <p>Après la Seconde Guerre mondiale, le panafricanisme prend une nouvelle dimension avec l'émergence de leaders comme Kwame Nkrumah au Ghana, qui organisera la Conférence des États africains indépendants en 1958, puis le Congrès des peuples africains en 1958 et 1960. Ces rencontres constituent les prémices de l'Organisation de l'unité africaine (OUA), créée en 1963, devenue Union africaine en 2002.</p>
        
        <p>Aujourd'hui, le panafricanisme continue d'évoluer, s'adaptant aux défis contemporains tout en restant fidèle à ses idéaux fondateurs : l'unité africaine, la dignité des peuples noirs et le développement autonome du continent africain.</p>
      `
    },
    {
      id: 2,
      title: "Sékou Touré : Le Lion de Guinée",
      category: "biographies",
      author: "Équipe rédactionnelle PSP",
      date: "5 février 2025",
      excerpt: "Ahmed Sékou Touré (1922-1984), premier président de la Guinée indépendante, est une figure emblématique du panafricanisme et de la résistance au colonialisme...",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sekou_Toure_1982.jpg/800px-Sekou_Toure_1982.jpg",
      content: `
        <p>Ahmed Sékou Touré (1922-1984), premier président de la Guinée indépendante, est une figure emblématique du panafricanisme et de la résistance au colonialisme. Né dans une famille modeste à Faranah, en Guinée française, il descend d'Almamy Samory Touré, célèbre résistant à la colonisation française.</p>
        
        <p>Son parcours politique commence au sein des syndicats, où il lutte pour les droits des travailleurs sous le joug colonial. En 1952, il devient secrétaire général du Parti Démocratique de Guinée (PDG). Sa position anti-coloniale se cristallise en 1958 lors du référendum proposé par le général de Gaulle sur la Communauté française. Sékou Touré prononce alors sa célèbre phrase : "Nous préférons la pauvreté dans la liberté à la richesse dans l'esclavage." La Guinée est le seul territoire français d'Afrique à voter "non", accédant ainsi à l'indépendance le 2 octobre 1958.</p>
        
        <p>En tant que président, Sékou Touré défend une vision panafricaniste et non-alignée. Il est l'un des fondateurs de l'Organisation de l'unité africaine (OUA) en 1963 et soutient activement les mouvements de libération à travers le continent. Son discours à l'ONU en 1960, où il défend le droit des peuples africains à l'autodétermination, reste mémorable.</p>
        
        <p>Sur le plan intérieur, son régime devient progressivement autoritaire, marqué par des purges politiques et des emprisonnements au tristement célèbre Camp Boiro. Cette dérive totalitaire ternit son héritage panafricaniste, bien que son influence sur les mouvements indépendantistes africains et sa résistance au néocolonialisme restent indéniables.</p>
        
        <p>Sékou Touré meurt en 1984 à Cleveland (États-Unis) lors d'une opération cardiaque. Son héritage demeure complexe et contradictoire, mêlant une vision panafricaniste visionnaire et une pratique du pouvoir autoritaire, rappelant la complexité des défis rencontrés par les leaders post-coloniaux africains.</p>
      `
    },
    {
      id: 3,
      title: "Thomas Sankara : L'héritage révolutionnaire du Capitaine",
      category: "biographies",
      author: "Équipe rédactionnelle PSP",
      date: "20 janvier 2025",
      excerpt: "Thomas Sankara (1949-1987), souvent appelé le 'Che Guevara africain', fut président du Burkina Faso de 1983 à 1987. Sa vision révolutionnaire et panafricaniste a profondément marqué l'histoire du continent...",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Thomas_Sankara_official_portrait.jpg/800px-Thomas_Sankara_official_portrait.jpg",
      content: `
        <p>Thomas Sankara (1949-1987), souvent appelé le "Che Guevara africain", fut président du Burkina Faso de 1983 à 1987. Sa vision révolutionnaire et panafricaniste a profondément marqué l'histoire du continent. Né dans une famille chrétienne à Yako, en Haute-Volta (actuel Burkina Faso), il suit une formation militaire qui le conduit à Madagascar, où il est témoin de la révolution malgache de 1972.</p>
        
        <p>Le 4 août 1983, à l'âge de 33 ans, Sankara prend le pouvoir par un coup d'État. Il rebaptise immédiatement le pays "Burkina Faso" (signifiant "le pays des hommes intègres") et lance un programme révolutionnaire ambitieux : réforme agraire, campagnes de vaccination massives, lutte contre la désertification, promotion de l'éducation et de l'émancipation des femmes.</p>
        
        <p>Fervent panafricaniste, Sankara plaide pour l'unité africaine et la résistance à l'impérialisme. Devant l'Organisation de l'unité africaine en 1987, il appelle à un front uni contre la dette extérieure, qu'il considère comme un nouvel outil de colonisation : "La dette ne peut pas être remboursée parce que d'abord si nous ne payons pas, nos bailleurs de fonds ne mourront pas. Soyons-en sûrs. Par contre, si nous payons, c'est nous qui allons mourir. Soyons-en sûrs également."</p>
        
        <p>Son intégrité personnelle est légendaire. Vivant sobrement, avec un salaire modeste, il interdit le culte de la personnalité et refuse les privilèges. Comme il aimait à le dire : "Un militant est un homme de qualité, intègre, consciencieux, qui par son exemple inspire le respect et la confiance de l'entourage."</p>
        
        <p>Le 15 octobre 1987, Sankara est assassiné lors d'un coup d'État mené par son ancien compagnon d'armes, Blaise Compaoré. Sa mort brutale à 37 ans met fin à une expérience révolutionnaire unique, mais son héritage perdure comme source d'inspiration pour les mouvements panafricanistes et progressistes à travers le monde.</p>
      `
    },
    {
      id: 4,
      title: "Le Panafricanisme aux États-Unis : De W.E.B. Du Bois à Black Lives Matter",
      category: "history",
      author: "Dr. TOH Jean Georges Glacia",
      date: "10 décembre 2024",
      excerpt: "Le panafricanisme a trouvé un terreau fertile aux États-Unis, où les Afro-Américains ont développé une conscience politique et culturelle liée à leurs racines africaines...",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/W.E.B._Du_Bois_1918.jpg/800px-W.E.B._Du_Bois_1918.jpg",
      content: `
        <p>Le panafricanisme a trouvé un terreau fertile aux États-Unis, où les Afro-Américains ont développé une conscience politique et culturelle liée à leurs racines africaines. Cette connexion s'est manifestée à travers différents mouvements et personnalités tout au long de l'histoire américaine.</p>
        
        <p><strong>W.E.B. Du Bois</strong> (1868-1963) est considéré comme le père du panafricanisme moderne. Intellectuel, sociologue et historien, il fonde le premier Congrès panafricain en 1919 à Paris. Son œuvre majeure, "Les âmes du peuple noir" (1903), explore la dualité de l'identité afro-américaine. Du Bois défend l'idée que les Noirs américains doivent s'instruire et s'émanciper intellectuellement pour combattre la ségrégation.</p>
        
        <p><strong>Marcus Garvey</strong> (1887-1940), fondateur de l'Association universelle pour l'amélioration de la condition noire (UNIA), prône un panafricanisme plus radical et populaire. Son mouvement "Back to Africa" encourage le retour des Afro-Américains vers l'Afrique et la création d'états noirs indépendants. Bien que controversé, Garvey mobilise des millions de personnes et influence profondément la conscience noire mondiale.</p>
        
        <p><strong>Malcolm X</strong> (1925-1965) développe une vision panafricaniste après son voyage en Afrique en 1964. Il fonde l'Organisation de l'unité afro-américaine, inspirée par l'OUA. Son assassinat interrompt ce nouveau chapitre de son engagement, mais son influence reste considérable sur les mouvements de libération noirs.</p>
        
        <p>Le <strong>Black Power</strong> dans les années 1960-70, avec des organisations comme le Black Panther Party, intègre également des éléments panafricanistes, notamment à travers ses connexions avec les mouvements de libération africains.</p>
        
        <p>Aujourd'hui, le mouvement <strong>Black Lives Matter</strong> représente une nouvelle manifestation de cette conscience, utilisant les réseaux sociaux et la solidarité globale pour dénoncer les violences policières et le racisme systémique, tout en forgeant des liens avec les luttes africaines contemporaines.</p>
        
        <p>Ces différentes expressions du panafricanisme aux États-Unis reflètent une quête continue de justice, de dignité et de reconnexion avec l'héritage africain, qui résonne avec les luttes panafricaines à travers le monde.</p>
      `
    },
    {
      id: 5,
      title: "Dr TOH Jean Georges Glacia : Un engagement panafricaniste visionnaire",
      category: "modern",
      author: "Équipe rédactionnelle PSP",
      date: "25 mars 2025",
      excerpt: "Président-fondateur du Parti Socialiste Panafricain (PSP), le Dr TOH Jean Georges Glacia incarne un nouvel élan du panafricanisme adapté aux défis du XXIe siècle...",
      image: "https://res.cloudinary.com/dxy0fiahv/image/upload/v1733247587/toh_glacia_au_libanais5_upuxrv.jpg",
      content: `
        <p>Président-fondateur du Parti Socialiste Panafricain (PSP), le Dr TOH Jean Georges Glacia incarne un nouvel élan du panafricanisme adapté aux défis du XXIe siècle. Son parcours intellectuel et politique témoigne d'un engagement profond pour l'unité africaine et l'émancipation des peuples du continent.</p>
        
        <p>Originaire de Côte d'Ivoire, le Dr TOH a poursuivi des études supérieures qui l'ont conduit à développer une vision holistique des défis africains. Son analyse intègre les dimensions économiques, culturelles et politiques nécessaires à une véritable renaissance africaine.</p>
        
        <p>Sa pensée panafricaniste s'articule autour de plusieurs piliers fondamentaux :</p>
        
        <ul>
          <li><strong>L'intégration économique africaine</strong> : Le Dr TOH plaide pour la création d'un marché commun africain capable de valoriser les ressources du continent au bénéfice de ses populations.</li>
          
          <li><strong>La souveraineté monétaire</strong> : Il défend l'idée d'une monnaie africaine indépendante pour mettre fin à la dépendance économique héritée de la colonisation.</li>
          
          <li><strong>Le socialisme africain</strong> : Sa vision politique combine les valeurs traditionnelles africaines de solidarité avec une approche socialiste moderne, adaptée aux réalités du continent.</li>
          
          <li><strong>Le dialogue des diasporas</strong> : Le Dr TOH travaille activement à renforcer les liens entre les Africains du continent et ceux de la diaspora, reconnaissant leur rôle essentiel dans le développement de l'Afrique.</li>
        </ul>
        
        <p>Le Dr TOH s'est particulièrement distingué lors de la crise du COVID-19, où il a dénoncé les inégalités dans l'accès aux vaccins et appelé à une plus grande autonomie sanitaire de l'Afrique. Cette position a renforcé sa stature de leader panafricaniste visionnaire.</p>
        
        <p>Ses voyages diplomatiques au Liban et dans plusieurs pays africains témoignent de sa volonté de tisser des alliances stratégiques au service du développement africain. À chaque occasion, il rappelle que "l'unité n'est pas une option, mais une nécessité pour l'Afrique".</p>
        
        <p>À travers le Parti Socialiste Panafricain, le Dr TOH Jean Georges Glacia construit patiemment un mouvement politique capable de porter sa vision panafricaniste depuis la Côte d'Ivoire vers l'ensemble du continent, s'inscrivant ainsi dans la lignée des grands leaders panafricanistes tout en répondant aux défis contemporains.</p>
      `
    },
    {
      id: 6,
      title: "Les femmes dans le mouvement panafricaniste : Contributions oubliées et leadership contemporain",
      category: "history",
      author: "Équipe rédactionnelle PSP",
      date: "8 mars 2025",
      excerpt: "De Amy Jacques Garvey à Winnie Mandela, en passant par les figures contemporaines, les femmes ont joué un rôle crucial dans le développement du panafricanisme...",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Amy_Jacques_Garvey.jpg",
      content: `
        <p>L'histoire du panafricanisme est souvent racontée à travers les figures masculines, mais les femmes ont joué un rôle fondamental dans son développement et sa diffusion. Leur contribution, longtemps marginalisée, mérite d'être reconnue et célébrée.</p>
        
        <p><strong>Amy Ashwood Garvey et Amy Jacques Garvey</strong>, les deux épouses successives de Marcus Garvey, étaient des activistes panafricanistes à part entière. Amy Ashwood co-fonda l'UNIA avec Marcus Garvey en 1914 et continua son activisme bien après leur séparation. Amy Jacques, quant à elle, édita et publia les écrits de Garvey pendant son emprisonnement et développa sa propre pensée panafricaniste dans sa rubrique "Our Women and What They Think" dans le journal Negro World.</p>
        
        <p><strong>Addie Waites Hunton</strong> participa au deuxième Congrès panafricain en 1921 et contribua à internationaliser le mouvement des droits civiques. <strong>Paulette Nardal</strong>, intellectuelle martiniquaise, anima à Paris dans les années 1930 un salon littéraire qui devint un creuset de la pensée négritude et panafricaniste, influençant Aimé Césaire et Léopold Sédar Senghor.</p>
        
        <p>Pendant les indépendances africaines, des femmes comme <strong>Funmilayo Ransome-Kuti</strong> au Nigeria et <strong>Mabel Dove</strong> au Ghana ont lié féminisme et panafricanisme. Plus tard, <strong>Winnie Mandela</strong> en Afrique du Sud incarna la résistance à l'apartheid avec une dimension panafricaine marquée.</p>
        
        <p>Aujourd'hui, des figures comme <strong>Ngozi Okonjo-Iweala</strong>, première femme à diriger l'OMC, et <strong>Chimamanda Ngozi Adichie</strong>, écrivaine nigériane mondialement reconnue, portent une vision panafricaniste dans les domaines économiques et culturels.</p>
        
        <p>Au sein même des institutions, la présence féminine s'affirme : l'Union Africaine a été présidée par <strong>Nkosazana Dlamini-Zuma</strong> de 2012 à 2017, et compte aujourd'hui de nombreuses femmes dans ses postes de direction.</p>
        
        <p>Le PSP, sous l'impulsion du Dr TOH Jean Georges Glacia, s'engage à valoriser le leadership féminin dans le mouvement panafricaniste, reconnaissant que l'émancipation de l'Afrique ne peut se faire sans l'émancipation des femmes africaines.</p>
      `
    }
  ]
  
  // Trouver l'article correspondant à l'ID
  const article = articles.find(a => a.id === Number(id))
  
  // Articles recommandés (hors l'article actuel)
  const recommendations = article 
    ? articles
        .filter(a => a.id !== article.id)
        .filter(a => a.category === article.category)
        .slice(0, 2)
    : []

  // Si l'article n'existe pas ou que l'ID n'est pas encore chargé
  if (!article && id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        <p className="text-gray-600 mb-6">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <Link href="/news" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
          Retour aux actualités
        </Link>
      </div>
    )
  }
  
  // Affichage pendant le chargement
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Chargement de l'article...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light">
      <Head>
        <title>{article.title} | PSP</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      {/* Header - Version mobile */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button 
            onClick={() => router.push('/news')}
            className="flex items-center text-primary"
          >
            <FaArrowLeft className="mr-2" />
            <span>Retour</span>
          </button>
          <Link href="/" className="flex items-center space-x-2">
            <img src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1739129965/PSP_copie_xtws5v.png" alt="Logo PSP" className="w-8 h-8 rounded-full" />
          </Link>
          <button className="text-gray-700 p-2">
            <FaShare />
          </button>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Article Header */}
        <div className="mb-6">
          <div className="text-xs text-primary uppercase font-semibold tracking-wider mb-2">
            {article.category === 'history' ? 'Histoire' : 
             article.category === 'biographies' ? 'Biographies' : 
             article.category === 'modern' ? 'Panafricanisme moderne' : 'Article'}
          </div>
          <h1 className="text-2xl font-bold mb-3">{article.title}</h1>
          <div className="flex items-center text-gray-600 text-sm">
            <div className="flex items-center mr-4">
              <FaUser className="mr-1" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-1" />
              <span>{article.date}</span>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="rounded-xl overflow-hidden mb-6 shadow-md">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-auto"
          />
        </div>
        
        {/* Article Content */}
        <div className="prose max-w-none mb-10">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
        
        {/* Author Box */}
        {article.author.includes('TOH') && (
          <div className="bg-white rounded-xl p-4 shadow-md mb-8 border-l-4 border-primary">
            <h3 className="font-bold text-lg mb-2">À propos de l'auteur</h3>
            <div className="flex items-start space-x-4">
              <img 
                src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1733247587/toh_glacia_au_libanais5_upuxrv.jpg" 
                alt="Dr TOH Jean Georges Glacia" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">Dr. TOH Jean Georges Glacia</p>
                <p className="text-sm text-gray-600">Président-Fondateur du Parti Socialiste Panafricain (PSP). Intellectuel engagé et visionnaire du panafricanisme moderne, il œuvre pour l'unité africaine et le développement du continent.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Related Articles */}
        {recommendations.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Articles recommandés</h2>
            <div className="space-y-4">
              {recommendations.map(rec => (
                <Link href={`/news/${rec.id}`} key={rec.id} className="block">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="md:flex">
                      <div className="md:flex-shrink-0">
                        <img 
                          src={rec.image} 
                          alt={rec.title} 
                          className="h-32 w-full md:w-32 object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{rec.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">{rec.excerpt.substring(0, 80)}...</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
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
              <Link href="/events" className="text-white hover:text-gray-300">Événements</Link>
              <Link href="/news" className="text-white hover:text-gray-300">Actualités</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

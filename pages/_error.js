import React from "react"
import Head from "next/head"
import Link from "next/link"

function ErrorPage({ statusCode }) {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <Head>
        <title>Erreur {statusCode || "Client"} | PSP</title>
        <meta name="description" content="Page d'erreur PSP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center p-8 max-w-md">
        <img 
          src="https://res.cloudinary.com/dxy0fiahv/image/upload/v1739129965/PSP_copie_xtws5v.png" 
          alt="Logo PSP" 
          className="w-20 h-20 mx-auto mb-6" 
        />
        <h1 className="text-3xl font-bold text-primary mb-4">
          {statusCode ? `Erreur ${statusCode}` : "Une erreur est survenue"}
        </h1>
        <p className="text-gray-600 mb-8">
          {statusCode
            ? `Une erreur ${statusCode} s'est produite sur le serveur`
            : "Une erreur s'est produite dans votre navigateur"}
        </p>
        <Link 
          href="/" 
          className="bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-full font-medium"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage

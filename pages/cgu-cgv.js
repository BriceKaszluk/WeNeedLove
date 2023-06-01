import React from 'react';
import Head from 'next/head';

export default function CguCgv() {
  return (
<>
  <Head>
    <title>CGV/CGU</title>
  </Head>
  <div className="flex flex-col justify-center items-center min-h-screen py-2 my-8 bg-white rounded-lg shadow-md">
    <main className="flex flex-col justify-center items-center w-9/12 flex-1 text-center">
      <h1 className="text-2xl font-bold mb-6">Conditions Générales d'Utilisation (CGU) et Conditions Générales de Vente (CGV)</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">1. Objectif</h2>
        <p>Ces conditions régissent l'utilisation de notre site et nos services. En utilisant notre site, vous acceptez ces conditions.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">2. Confidentialité et protection des données</h2>
        <p>Nous respectons votre vie privée et protégeons vos informations personnelles conformément à notre politique de confidentialité et aux lois applicables en matière de protection des données.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">3. Utilisation de nos services</h2>
        <p>En utilisant nos services, vous vous engagez à respecter toutes les lois et réglementations applicables, et à ne pas utiliser nos services de manière abusive ou nuisible.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">4. Responsabilités de l'utilisateur</h2>
        <p>Vous êtes responsable de toutes les actions effectuées sur votre compte et vous devez protéger la sécurité de votre compte.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">5. Achat et paiements</h2>
        <p>Si vous achetez des services de notre part, vous vous engagez à fournir des informations de paiement correctes et à payer les frais applicables à temps. Tous les paiements sont non remboursables sauf indication contraire dans nos politiques.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">6. Limitation de responsabilité</h2>
        <p>Dans la mesure où la loi le permet, nous ne sommes pas responsables des pertes indirectes, accessoires ou conséquentes découlant de l'utilisation de nos services.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">7. Modification des conditions</h2>
        <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur notre site.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">8. Droit applicable et juridiction</h2>
        <p>Ces conditions sont régies par le droit de votre pays de résidence et les conflits seront résolus par les tribunaux de votre pays de résidence.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">9. Contact</h2>
        <p>Pour toute question concernant ces conditions, veuillez nous contacter à [votre email].</p>
      </section>

    </main>
  </div>
</>

  );
}

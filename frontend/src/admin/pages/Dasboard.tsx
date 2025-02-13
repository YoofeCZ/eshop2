// src/admin/pages/Dashboard.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Helmet>
        <title>Dashboard - Admin Panel - Můj Eshop</title>
        <meta name="description" content="Přehled statistik a rychlý přístup k administraci." />
      </Helmet>
      <h1>Vítejte v administraci</h1>
      <p>
        Toto je úvodní stránka vašeho admin panelu. Zde můžete zobrazit přehled statistik, rychlé odkazy na jednotlivé zdroje nebo jiné důležité informace.
      </p>
      {/* Případně můžete přidat další komponenty, jako grafy nebo seznamy nedávných akcí */}
    </div>
  );
};

export default Dashboard;

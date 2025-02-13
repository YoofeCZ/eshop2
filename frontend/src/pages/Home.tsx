// src/pages/Home.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import HeurekaReviews from '../components/HeurekaReviews';
import ProductList from '../components/ProductList';
import '../styles/Home.scss';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('homeTitle')}</title>
        <meta name="description" content={t('homeDescription')} />
      </Helmet>

      <div className="home-container">
        {/* 1) SLIDER */}
        <Slider />

        {/* 2) KATEGORIE S OBRÁZKY (na hlavní stránce) */}
        <section className="section-categories">
          <Categories displayType="image" />
        </section>

        {/* 3) NĚJAKÉ INFORMACE */}
        <section className="section info">
          <h2>{t('whyShopTitle')}</h2>
          <p>{t('whyShopText')}</p>
        </section>

        {/* 4) RECENZE Z HEUREKY */}
        <section className="section heureka-reviews">
          <h2>{t('heurekaReviewsTitle')}</h2>
          <HeurekaReviews />
        </section>

        {/* 5) PRODUKTY DLE STAVU */}
        <section className="section bestsellers">
          <h2>{t('bestsellers')}</h2>
          <ProductList filter={{ isBestseller: true }} />
        </section>

        <section className="section sale">
          <h2>{t('sale')}</h2>
          <ProductList filter={{ isSale: true }} />
        </section>

        <section className="section new">
          <h2>{t('new')}</h2>
          <ProductList filter={{ isNew: true }} />
        </section>
      </div>
    </>
  );
};

export default Home;

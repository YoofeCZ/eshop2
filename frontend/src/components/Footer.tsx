// src/components/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Footer.scss';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer py-4">
      <div className="container-centered">
        <div className="row">
          <div className="col-md-4">
            <h5>{t('aboutUsTitle')}</h5>
            <p>{t('aboutUsText')}</p>
          </div>
          <div className="col-md-4">
            <h5>{t('linksTitle')}</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/privacy">{t('privacy')}</a>
              </li>
              <li>
                <a href="/terms">{t('terms')}</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>{t('socialTitle')}</h5>
            <a href="https://facebook.com">{t('facebook')}</a>
            <a href="https://twitter.com">{t('twitter')}</a>
          </div>
        </div>
        <div className="text-center mt-3">
          &copy; {new Date().getFullYear()} {t('siteName')}. {t('allRightsReserved')}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

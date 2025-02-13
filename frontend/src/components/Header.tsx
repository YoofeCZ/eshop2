import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form, NavDropdown } from 'react-bootstrap';
import '../styles/header.scss';
import logo from '../assets/logo.png';
import { fetchCategories } from '../api/api';
import { useTranslation } from 'react-i18next';
import flagCZ from '../assets/flags/flag-cz.png';
import flagGB from '../assets/flags/flag-gb.png';

interface ICategory {
  id: number;
  name: string;
  displayType: 'icon' | 'image';
  iconUrl?: string;
  imageUrl?: string;
}

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Inicializujeme stav podle aktuálního jazyka z i18n
  const [language, setLanguage] = useState(i18n.language || 'cs');
  const [iconCategories, setIconCategories] = useState<ICategory[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  // Synchronizace lokálního stavu s i18n.language
  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    fetchCategories(i18n.language)
      .then((allCats: ICategory[]) => {
        const iconCats = allCats.filter(cat => cat.displayType === 'icon');
        setIconCategories(iconCats);
      })
      .catch(err => console.error(err));
  }, [i18n.language]);

  // Načtení počtu položek v košíku při inicializaci
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cartItems.length);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cartItems.length);
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAdmin(true);
      setShowLoginModal(false);
      localStorage.setItem('isAdmin', 'true');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  // Funkce pro změnu jazyka, která aktualizuje i lokální stav
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <header className="header-container container-centered">
      <div className="header-top">
        <div className="language-switcher">
          <NavDropdown 
            title={
              <>
                <img 
                  src={language === 'cs' ? flagCZ : flagGB} 
                  alt={t('languageName')} 
                  className="flag-icon" 
                />{' '}
                {language === 'cs' ? 'CZ' : 'EN'}
              </>
            }
            id="language-nav-dropdown"
          >
            <NavDropdown.Item 
              onClick={() => handleLanguageChange('cs')}
              active={language === 'cs'}
            >
              <img src={flagCZ} alt="Čeština" className="flag-icon" /> Čeština
            </NavDropdown.Item>
            <NavDropdown.Item 
              onClick={() => handleLanguageChange('en')}
              active={language === 'en'}
            >
              <img src={flagGB} alt="English" className="flag-icon" /> English
            </NavDropdown.Item>
          </NavDropdown>
        </div>
        <div className="contact-info">
          <span>{t('contactEmail')}</span>
          <span>{t('contactPhone')}</span>
        </div>
        <div className="auth-buttons">
          {isAdmin ? (
            <>
              <Link to="/admin" className="btn btn-primary me-2">
                {t('adminPanel')}
              </Link>
              <Button variant="outline-primary" onClick={handleLogout}>
                {t('logout')}
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => setShowLoginModal(true)}>
              {t('login')}
            </Button>
          )}
        </div>
      </div>
  
      <div className="header-search-cart">
        {/* Odkaz, který při kliknutí kompletně reloadne stránku */}
        <Link 
          className="navbar-brand header-logo" 
          to={`/?lang=${i18n.language}`}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/?lang=${i18n.language}`;
          }}
        >
          <img src={logo} alt="Můj Eshop" className="logo-image" />
        </Link>
        <div className="search-cart-container">
          <input
            type="text"
            className="form-control me-2 search-input"
            placeholder={t('searchPlaceholder')}
          />
          <Link to="/cart" className="cart-link">
            <i className="bi bi-cart cart-icon"></i>
            {t('cart')}
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
  
      <div className="header-top-mobile">
        <div className="mobile-left">
          <Link 
            className="navbar-brand header-logo" 
            to={`/?lang=${i18n.language}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/?lang=${i18n.language}`;
            }}
          >
            <img src={logo} alt="Můj Eshop" className="logo-image" />
          </Link>
        </div>
        <div className="mobile-right">
          {/* Mobilní jazykový přepínač – nyní stejný jako desktop */}
          <div className="mobile-language">
            <NavDropdown 
              title={
                <>
                  <img 
                    src={language === 'cs' ? flagCZ : flagGB} 
                    alt={t('languageName')} 
                    className="flag-icon" 
                  />{' '}
                  {language === 'cs' ? 'CZ' : 'EN'}
                </>
              }
              id="mobile-language-dropdown"
            >
              <NavDropdown.Item 
                onClick={() => handleLanguageChange('cs')}
                active={language === 'cs'}
              >
                <img src={flagCZ} alt="Čeština" className="flag-icon" /> Čeština
              </NavDropdown.Item>
              <NavDropdown.Item 
                onClick={() => handleLanguageChange('en')}
                active={language === 'en'}
              >
                <img src={flagGB} alt="English" className="flag-icon" /> English
              </NavDropdown.Item>
            </NavDropdown>
          </div>
          <Link to="/cart" className="cart-link">
            <i className="bi bi-cart cart-icon"></i>
            {t('cart')}
            <span className="cart-count">{cartCount}</span>
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>
  
      <div className="header-search-mobile">
        <input
          type="text"
          className="form-control search-input"
          placeholder={t('searchPlaceholder')}
        />
      </div>
  
      <nav className="navbar navbar-expand-xl navbar-dark custom-nav">
        <div className="container-centered">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {iconCategories.map(cat => (
                <li className="nav-item" key={cat.id}>
                  <Link className="nav-link" to={`/category/${cat.id}`}>
                    {cat.iconUrl && (
                      <img
                        src={cat.iconUrl}
                        alt={cat.name}
                        style={{ width: '24px', marginRight: '6px' }}
                      />
                    )}
                    {cat.name}
                  </Link>
                </li>
              ))}
              <NavDropdown title={t('moreCategories')} id="nav-categories" className="nav-categories">
                {iconCategories.map(category => (
                  <NavDropdown.Item key={category.id} as={Link} to={`/category/${category.id}`}>
                    {category.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </ul>
          </div>
        </div>
      </nav>
  
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('loginTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>{t('username')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('password')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {t('login')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default Header;

// src/pages/CartPage.tsx
import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { convertPrice, formatPrice } from '../utils/currencyConverter';
import '../styles/CartPage.scss';

const CartPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

  // Nastavení měny podle jazyka
  const targetCurrency = i18n.language === 'en' ? 'USD' : i18n.language === 'eu' ? 'EUR' : 'CZK';
  const locale = i18n.language === 'en' ? 'en-US' : 'cs-CZ';

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item: any) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
  };

  return (
    <>
      <Helmet>
        <title>{t('cartTitle')}</title>
        <meta name="description" content={t('cartDescription')} />
      </Helmet>
      <Container>
        <h2>{t('cartTitle')}</h2>
        {cartItems.length === 0 ? (
          <p>{t('cartEmpty')}</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t('product')}</th>
                <th>{t('productPrice')}</th>
                <th>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any) => {
                const priceConverted = targetCurrency === 'CZK' ? item.price : convertPrice(item.price, targetCurrency);
                const formattedPrice = formatPrice(priceConverted, targetCurrency, locale);
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{formattedPrice}</td>
                    <td>
                      <Button variant="danger" onClick={() => removeItem(item.id)}>
                        {t('removeFromCart')}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <Button variant="success" href="/checkout">
          {t('proceedToCheckout')}
        </Button>
      </Container>
    </>
  );
};

export default CartPage;

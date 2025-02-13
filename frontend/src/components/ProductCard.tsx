// src/components/ProductCard.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { convertPrice, formatPrice } from '../utils/currencyConverter';
import '../styles/ProductCard.scss';

interface IProduct {
  id: number;
  name: string;
  price: number; // Cena v Kč
  thumbnail: string | null;
}

interface ProductCardProps {
  product: IProduct;
  onAddToCart?: (product: IProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Například: pokud je aktuální jazyk 'en', chceme zobrazit cenu v USD, pokud 'cs' – v Kč, pokud 'eu' – v EUR
  const targetCurrency = i18n.language === 'en' ? 'USD' : i18n.language === 'eu' ? 'EUR' : 'CZK';
  // Pokud pracujete pouze s dvěma měnami, můžete upravit podmínku dle potřeby.
  const locale = i18n.language === 'en' ? 'en-US' : 'cs-CZ';

  // Přepočítaná cena, pokud není CZK (v případě CZK použijeme původní cenu)
  const displayedPrice =
    targetCurrency === 'CZK'
      ? product.price
      : convertPrice(product.price, targetCurrency);

  const formattedPrice = formatPrice(displayedPrice, targetCurrency, locale);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Card className="mb-4 product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {product.thumbnail && (
        <div
          className="card-img-top"
          style={{ backgroundImage: `url(${product.thumbnail})` }}
          aria-label={product.name}
        />
      )}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {t('productPrice')}: {formattedPrice}
        </Card.Text>
        {onAddToCart ? (
          <Button variant="primary" onClick={handleAddToCartClick}>
            {t('addToCart')}
          </Button>
        ) : (
          <Button variant="primary">{t('detail')}</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

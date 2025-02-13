// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/api';
import { useTranslation } from 'react-i18next';
import { convertPrice, formatPrice } from '../utils/currencyConverter';

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number; // Cena v Kč
  rating: number;
  images: string[];
  categoryId: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchProductById(id!, i18n.language)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Chyba při načítání detailu produktu:", err);
        setLoading(false);
      });
  }, [id, i18n.language]);

  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(t('addToCartSuccess', { product: product.name }));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (loading) return <div>{t('loadingProductDetail') || "Načítám detail produktu..."}</div>;
  if (!product) return <div>{t('productNotFound') || "Produkt nenalezen."}</div>;

  // Nastavení měny na základě jazyka
  const targetCurrency = i18n.language === 'en' ? 'USD' : i18n.language === 'eu' ? 'EUR' : 'CZK';
  const locale = i18n.language === 'en' ? 'en-US' : 'cs-CZ';
  const priceConverted = targetCurrency === 'CZK' ? product.price : convertPrice(product.price, targetCurrency);
  const formattedPrice = formatPrice(priceConverted, targetCurrency, locale);

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Carousel>
            {product.images.map((img, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={img} alt={`${product.name} ${index + 1}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>
            {t('productPrice')}: {formattedPrice}
          </h4>
          <p>
            {t('rating')}: {product.rating}
          </p>
          <Button variant="primary" onClick={handleAddToCart}>
            {t('addToCart')}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;

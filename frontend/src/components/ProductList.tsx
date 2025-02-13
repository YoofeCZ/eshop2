import React, { useEffect, useState } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api/api';
import { useTranslation } from 'react-i18next';
import '../styles/ProductList.scss'; // Import vlastního SCSS souboru

// Definice typu produktu
interface IProduct {
  id: number;
  name: string;
  price: number;
  thumbnail: string | null;
  image: string;  // Add the required image property
}

interface ProductListProps {
  filter?: {
    isSale?: boolean;
    isNew?: boolean;
    isBestseller?: boolean;
  }
}

// Pomocná funkce pro rozdělení pole produktů do skupin po 5
const chunkArray = (array: IProduct[], chunkSize: number): IProduct[][] => {
  const chunks: IProduct[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const ProductList: React.FC<ProductListProps> = ({ filter }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    fetchProducts(filter, i18n.language)
      .then((data: IProduct[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error("Chyba při načítání produktů:", err);
        setLoading(false);
      });
  }, [filter, i18n.language]);

  if (loading) {
    return <div>Načítám produkty...</div>;
  }

  // Rozdělíme produkty do skupin po 5
  const productGroups = chunkArray(products, 5);

  // Funkce pro přidání produktu do košíku – nahraď svou logikou
  const handleAddToCart = (product: IProduct) => {
    console.log('Přidávám do košíku:', product);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Produkt "${product.name}" byl přidán do košíku.`);
    // Dispatch události, aby se Header aktualizoval
    window.dispatchEvent(new Event('cartUpdated'));
  };
  

  return (
    <Container className="product-carousel">
      <section className="product-section">
        <Carousel>
          {productGroups.map((group, groupIndex) => (
            <Carousel.Item key={groupIndex}>
              <div className="product-group">
                {group.map((product) => (
                  <div key={product.id} className="product-item">
                    <ProductCard product={product} onAddToCart={handleAddToCart} />
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    </Container>
  );
};

export default ProductList;

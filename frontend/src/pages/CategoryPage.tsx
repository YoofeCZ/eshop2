import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet z react-helmet-async
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchCategoryById } from '../api/api'; // Ujisti se, že máš implementovanou fetchCategoryById
import { useTranslation } from 'react-i18next';
import '../styles/CategoryPages.scss';

interface IProduct {
  id: number;
  name: string;
  price: number;
  thumbnail: string | null;
  image: string;  // Add the required image property
}

interface ICategory {
  id: number;
  name: string; // Přeložený název kategorie
  displayType: string;
  iconUrl?: string;
  imageUrl?: string;
}

const CategoryPage: React.FC = () => {
  const { id } = useParams(); // Očekáváme URL: /category/:id
  const [products, setProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!id) return;

    // Načteme současně produkty a detaily kategorie
    Promise.all([
      fetchCategoryById(id, i18n.language),
      fetchProducts({ categoryId: id }, i18n.language)
    ])
      .then(([catData, prodData]) => {
        setCategory(catData);
        setProducts(prodData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, i18n.language]);

  // Funkce pro přidání produktu do košíku
  const handleAddToCart = (product: IProduct) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Produkt "${product.name}" byl přidán do košíku.`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (loading) {
    return <div>{t('loadingCategoryProducts') || "Načítám produkty kategorie..."}</div>;
  }

  // Místo čtení category.name_cs, name_en atd. jednoduše použijeme category.name
  const categoryName = category?.name || '';

  return (
    <>
      <Helmet>
        <title>{t('categoryTitle', { category: categoryName })}</title>
        <meta name="description" content={t('categoryDescription', { category: categoryName })} />
      </Helmet>
      <div className="category-products-container">
        <h2>{t('categoryTitle', { category: categoryName })}</h2>
        <div className="products-list">
          {products.map((prod) => (
            // Předáváme funkci onAddToCart, takže se objeví tlačítko "Přidat do košíku"
            <ProductCard key={prod.id} product={prod} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;

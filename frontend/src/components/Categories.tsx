// src/components/Categories.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../api/api';
import '../styles/CategoryCard.scss';
import { useTranslation } from 'react-i18next';

interface ICategory {
  id: number;
  name: string; // výchozí (fallback) hodnota
  displayType: 'icon' | 'image';
  iconUrl?: string;
  imageUrl?: string;
  // Jazykové varianty – předpokládáme, že API je vrací
  name_cs?: string;
  name_en?: string;
  name_de?: string;
  name_ru?: string;
}

interface CategoriesProps {
  displayType: 'icon' | 'image';
}

const Categories: React.FC<CategoriesProps> = ({ displayType }) => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Předáme aktuální jazyk do API
    fetchCategories(i18n.language)
      .then((data) => {
        const filtered = data.filter(
          (cat: ICategory) => cat.displayType === displayType
        );
        setCategories(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [displayType, i18n.language]);

  if (loading) {
    return <div>{t('loadingCategories') || "Načítám kategorie..."}</div>;
  }

  if (!categories.length) {
    return <div>{t('noCategories') || "Žádné kategorie k zobrazení"}</div>;
  }

  return (
    <div className="categories-container">
      {categories.map(cat => {
        const bgUrl = displayType === 'icon' ? cat.iconUrl : cat.imageUrl;
        const categoryName = cat[`name_${i18n.language as 'cs' | 'en' | 'de' | 'ru'}`] || cat.name;
        return (
          <Link to={`/category/${cat.id}`} key={cat.id} className="category-box">
            <div
              className="category-img-top"
              style={{ backgroundImage: `url(${bgUrl})` }}
              aria-label={categoryName}
            />
            <div className="category-body">
              <p>{categoryName}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;

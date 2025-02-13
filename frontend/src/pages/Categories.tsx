// src/pages/Categories.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { fetchCategories } from '../api/api';
import { useTranslation } from 'react-i18next';

interface ICategory {
  id: number;
  name: string; // fallback
  description: string;
  image: string;
  // Jazykové varianty:
  name_cs?: string;
  name_en?: string;
  name_de?: string;
  name_ru?: string;
  description_cs?: string;
  description_en?: string;
  description_de?: string;
  description_ru?: string;
}

const Categories: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories(i18n.language)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Chyba při načítání kategorií:", err);
        setLoading(false);
      });
  }, [i18n.language]);

  if (loading) return <div>{t('loadingCategories') || "Načítám kategorie..."}</div>;

  return (
    <>
      <Helmet>
        <title>{t('categoriesTitle') || "Kategorie - Můj Eshop"}</title>
      </Helmet>
      <Container className="my-4">
        <h2>{t('categoriesTitle') || "Kategorie produktů"}</h2>
        <Row>
          {categories.map((category) => {
            // Použijeme explicitní konverzi na string, aby TypeScript věděl, že jde o string
            const categoryName = String(category[`name_${i18n.language}` as keyof ICategory] || category.name);
            const categoryDescription = String(
              category[`description_${i18n.language}` as keyof ICategory] || category.description
            );
            return (
              <Col key={category.id} md={4}>
                <Card className="mb-4">
                  <Card.Img variant="top" src={category.image} alt={categoryName} />
                  <Card.Body>
                    <Card.Title>{categoryName}</Card.Title>
                    <Card.Text>{categoryDescription}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Categories;

import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/Slider.scss';
import { useTranslation } from 'react-i18next';
import { fetchSliders } from '../api/api';

interface SliderItem {
  id: number;
  title: string;
  description: string;
  image: string; // URL obrázku
  order: number;
  link?: string;
}

const Slider: React.FC = () => {
  const [slides, setSlides] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const { i18n } = useTranslation();

  useEffect(() => {
    fetchSliders(i18n.language)
      .then((data: SliderItem[]) => {
        const sortedSlides = data.sort((a, b) => a.order - b.order);
        setSlides(sortedSlides);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [i18n.language]);
  if (loading) return <p>Načítám slider...</p>;
  if (error) return <p>Chyba: {error}</p>;

  return (
    <div className="slider-container">
      <Carousel>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
  <div className="slider-item">
    <img className="slider-image" src={slide.image} alt={slide.title} />
  </div>
  <Carousel.Caption>
    <h3>{slide.title}</h3>
    <p>{slide.description}</p>
  </Carousel.Caption>
</Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;

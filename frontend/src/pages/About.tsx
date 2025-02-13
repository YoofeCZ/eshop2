import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>O nás - Můj Eshop</title>
      </Helmet>
      <Container className="my-4">
        <h2>O nás</h2>
        <p>Vítejte na našem e-shopu! Jsme tým nadšenců, kteří chtějí nabídnout nejlepší produkty za skvělé ceny.</p>
        <p>Naším cílem je poskytovat kvalitní služby a zajistit spokojenost našich zákazníků.</p>
      </Container>
    </>
  );
};

export default About;

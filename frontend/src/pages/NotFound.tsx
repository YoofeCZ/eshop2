import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from 'react-bootstrap';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Stránka nenalezena - Můj Eshop</title>
      </Helmet>
      <Container className="my-4">
        <h2>404 - Stránka nenalezena</h2>
        <p>Omlouváme se, ale stránka, kterou hledáte, neexistuje.</p>
      </Container>
    </>
  );
};

export default NotFound;

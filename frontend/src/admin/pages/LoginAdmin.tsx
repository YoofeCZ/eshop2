// src/admin/pages/LoginAdmin.tsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const LoginAdmin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Špatné přihlašovací údaje');
    }
  };

  return (
    <Container className="my-4">
      <Helmet>
        <title>Admin Login - Můj Eshop</title>
        <meta name="description" content="Přihlaste se do administrace našeho e-shopu." />
      </Helmet>
      <h2>Admin Přihlášení</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Uživatelské jméno</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Heslo</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Přihlásit se
        </Button>
      </Form>
    </Container>
  );
};

export default LoginAdmin;

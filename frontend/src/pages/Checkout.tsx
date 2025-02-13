// src/pages/Checkout.tsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import '../styles/Checkout.scss';

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    addressNumber: '',
    city: '',
    zip: '',
    email: '',
    paymentMethod: 'card',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(t('submitSuccess'));
    localStorage.removeItem('cart');
    window.location.href = '/';
  };

  return (
    <>
      <Helmet>
        <title>{t('checkoutTitle')}</title>
        <meta name="description" content={t('checkoutDescription')} />
      </Helmet>
      <Container>
        <h2>{t('checkoutTitle')}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>{t('firstName')}</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              minLength={3}
              pattern="^[A-Za-zÁČĎÉĚÍŇÓŘŠÚŮÝŽáčďéěíňóřšťúůýž]+$"
              placeholder={t('firstName')}
            />
            <Form.Control.Feedback type="invalid">
              {t('invalidFirstName')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>{t('lastName')}</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              minLength={3}
              pattern="^[A-Za-zÁČĎÉĚÍŇÓŘŠÚŮÝŽáčďéěíňóřšťúůýž]+$"
              placeholder={t('lastName')}
            />
            <Form.Control.Feedback type="invalid">
              {t('invalidLastName')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>{t('address')}</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              pattern="^[A-Za-zÁČĎÉĚÍŇÓŘŠÚŮÝŽáčďéěíňóřšťúůýž\s]+$"
              placeholder={t('address')}
            />
            <Form.Control.Feedback type="invalid">
              {t('invalidAddress')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddressNumber">
            <Form.Label>{t('addressNumber')}</Form.Label>
            <Form.Control
              type="text"
              name="addressNumber"
              value={formData.addressNumber}
              onChange={handleChange}
              required
              pattern="^\d+$"
              placeholder={t('addressNumber')}
            />
            <Form.Control.Feedback type="invalid">
              {t('invalidAddressNumber')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCity">
            <Form.Label>{t('city')}</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              pattern="^[A-Za-zÁČĎÉĚÍŇÓŘŠÚŮÝŽáčďéěíňóřšťúůýž\s]+$"
              placeholder={t('city')}
            />
            <Form.Control.Feedback type="invalid">
              {t('invalidCity')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formZip">
            <Form.Label>{t('zip')}</Form.Label>
            <Form.Control
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              pattern="^\d+$"
              placeholder={t('zip')}
            />
            <Form.Control.Feedback type="invalid">
              {t('invalidZip')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>{t('email')}</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(cz|sk|com|net|org)$"
              placeholder={t('email')}
            />
            <Form.Control.Feedback type="invalid">
              {t('invalidEmail')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPaymentMethod">
            <Form.Label>{t('paymentMethod')}</Form.Label>
            <Form.Select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              <option value="card">{t('creditCard')}</option>
              <option value="paypal">{t('paypal')}</option>
              <option value="bank">{t('bankTransfer')}</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            {t('submit')}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Checkout;

// src/App.tsx (tvůj kód)
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './layouts/Layout';
import ScrollToTop from './components/ScrollToTop';
import CategoryPage from './pages/CategoryPage'; // <-- Zde import napevno, nebo lazy, jak chceš

// ... lazy importy ...
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Categories = lazy(() => import('./pages/Categories'));
const CartPage = lazy(() => import('./pages/CartPage'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

// ... Admin ...
const LoginAdmin = lazy(() => import('./admin/pages/LoginAdmin'));
const AdminPanel = lazy(() => import('./admin/AdminPanel'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Veřejné stránky */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="categories" element={<Categories />} />
              <Route path="category/:id" element={<CategoryPage />} /> 
              {/* Tady je to důležité: "category/:id" => CategoryPage */}
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin */}
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;

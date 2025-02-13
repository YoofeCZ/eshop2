// src/admin/AdminPanel.tsx
import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import Dashboard from './pages/Dasboard'; // Importuj Dashboard
import { ProductList, ProductEdit, ProductCreate } from './resources/products';
import { CategoryList, CategoryEdit, CategoryCreate } from './resources/categories';
import { SliderList, SliderEdit, SliderCreate } from './resources/sliders';

const AdminPanel = () => {
  return (
    <Admin dataProvider={dataProvider} basename="/admin" dashboard={Dashboard}>
      <Resource
        name="products"
        list={ProductList}
        edit={ProductEdit}
        create={ProductCreate}
      />
      <Resource
        name="categories"
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
      />
      <Resource
        name="sliders"
        list={SliderList}
        edit={SliderEdit}
        create={SliderCreate}
      />
    </Admin>
  );
};

export default AdminPanel;

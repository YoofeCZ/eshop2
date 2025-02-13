// src/admin/resources/products.tsx

import React from 'react';
import { 
  List, Datagrid, TextField, NumberField, 
  EditButton, Edit, SimpleForm, TextInput, NumberInput, Create, 
  FileField, FileInput, ReferenceInput, SelectInput, 
  useNotify, useCreate, useRedirect, BooleanInput 
} from 'react-admin';
import { Helmet } from 'react-helmet-async';
import { uploadProductImages } from '../../api/api';

export const ProductList: React.FC = (props) => (
  <>
        <Helmet>
          <title>Produkty - Administrace - Můj Eshop</title>
          <meta name="description" content="Přehled kategorií v administraci." />
        </Helmet>
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="price" options={{ style: 'currency', currency: 'CZK' }} />
      {/* Zobrazme i isNew, isSale, isBestseller */}
      <TextField source="isNew" />
      <TextField source="isSale" />
      <TextField source="isBestseller" />
      
      <EditButton />
    </Datagrid>
  </List>
  </>
);

export const ProductEdit: React.FC = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="description" multiline />
      <NumberInput source="price" />
      <NumberInput source="rating" />

      <TextInput source="images" />
      <TextInput source="categoryId" />

      {/* Tady přidáme booleany pro ruční ovládání v adminu */}
      <BooleanInput source="isNew" label="Novinka" />
      <BooleanInput source="isSale" label="Výprodej" />
      <BooleanInput source="isBestseller" label="Nejprodávanější" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate: React.FC = (props) => {
  const [create] = useCreate();
  const notify = useNotify();
  const redirect = useRedirect();

  const onSave = async (data: any) => {
    try {
      let imageUrls: string[] = [];
      if (data.images && data.images.length > 0) {
        const formData = new FormData();
        data.images.forEach((fileObj: any) => {
          if (fileObj.rawFile) {
            formData.append('images', fileObj.rawFile);
          }
        });
        imageUrls = await uploadProductImages(formData);
      }

      const productData = {
        ...data,
        images: imageUrls,
      };

      await create('products', { data: productData });
      notify('Produkt vytvořen', { type: 'success' });
      redirect('list', 'products');
    } catch (error) {
      notify('Error: ' + (error as Error).message, { type: 'error' });
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={onSave}>
        <TextInput source="name_cs" label="Název (Česky)" />
        <TextInput source="name_en" label="Název (English)" />
        <TextInput source="name_de" label="Název (Deutsch)" />
        <TextInput source="name_ru" label="Název (Русский)" />

        <TextInput source="description_cs" label="Popis (Česky)" multiline />
        <TextInput source="description_en" label="Popis (English)" multiline />
        <TextInput source="description_de" label="Popis (Deutsch)" multiline />
        <TextInput source="description_ru" label="Popis (Русский)" multiline />

        <NumberInput source="price" />
        <NumberInput source="rating" />
        
        <FileInput source="images" label="Obrázky" accept={{ 'image/*': [] }} multiple>
          <FileField source="src" title="title" />
        </FileInput>

        <ReferenceInput
          source="categoryId"
          reference="categories"
          sort={{ field: 'name_cs', order: 'ASC' }}
        >
          <SelectInput optionText={(record: any) => 
            record && (record.name_cs ? String(record.name_cs) : String(record.name))
          } />
        </ReferenceInput>

        <BooleanInput source="isNew" label="Novinka" defaultValue={true} />
        <BooleanInput source="isSale" label="Výprodej" defaultValue={false} />
        <BooleanInput source="isBestseller" label="Nejprodávanější" defaultValue={false} />
      </SimpleForm>
    </Create>
  );
};

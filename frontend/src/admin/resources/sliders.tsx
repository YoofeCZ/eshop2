import React from 'react';
import { 
  List, Datagrid, TextField, NumberField, 
  EditButton, Edit, SimpleForm, TextInput, 
  NumberInput, Create, FileInput, FileField, 
  useCreate, useNotify, useRedirect 
} from 'react-admin';
import { Helmet } from 'react-helmet-async';
import { uploadSliderImage } from '../../api/api';
const acceptedImageTypes: readonly string[] = ["image/jpeg", "image/png", "image/gif"];

interface SliderData {
  image?: {
    rawFile: File;
  };
  title: string;
  description?: string;
  order: number;
  link?: string;
}

export const SliderList: React.FC = (props) => (
  <>
        <Helmet>
          <title>Slidery - Administrace - Můj Eshop</title>
          <meta name="description" content="Přehled kategorií v administraci." />
        </Helmet>
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="image" />
      <NumberField source="order" />
      <EditButton />
    </Datagrid>
  </List>
  </>
);

export const SliderEdit: React.FC = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="title" />
      <TextInput source="description" multiline />
      <TextInput source="image" />
      <NumberInput source="order" />
      <TextInput source="link" />
    </SimpleForm>
  </Edit>
);
export const SliderCreate: React.FC = (props) => {
  const [create] = useCreate();
  const notify = useNotify();
  const redirect = useRedirect();

  const onSave = async (data: any) => {
    try {
      let imageUrl = data.image;
      
      if (data.image && data.image.rawFile) {
        imageUrl = await uploadSliderImage(data.image.rawFile);
      }

      const sliderData = {
        ...data,
        image: imageUrl
      };
      
      await create('sliders', { data: sliderData });
      notify('Slider vytvořen', { type: 'success' });
      redirect('list', 'sliders');
    } catch (error) {
      notify('Error: ' + (error as Error).message, { type: 'error' });
    }
  };

  return (
      <Create {...props}>
<SimpleForm onSubmit={onSave}>
  <TextInput source="title_cs" label="Titulek (Česky)" />
  <TextInput source="title_en" label="Titulek (English)" />
  <TextInput source="title_de" label="Titulek (Deutsch)" />
  <TextInput source="title_ru" label="Titulek (Русский)" />

  <TextInput source="description_cs" label="Popis (Česky)" multiline />
  <TextInput source="description_en" label="Popis (English)" multiline />
  <TextInput source="description_de" label="Popis (Deutsch)" multiline />
  <TextInput source="description_ru" label="Popis (Русский)" multiline />

  <FileInput
    source="image"
    label="Obrázek"
    accept={{
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    }}
  >
    <FileField source="src" title="title" />
  </FileInput>

  <NumberInput source="order" />
  <TextInput source="link" />
</SimpleForm>

      </Create>
  );
};
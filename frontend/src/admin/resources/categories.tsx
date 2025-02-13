// src/admin/resources/categories.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    SelectInput,
    FileInput,
    FileField,
    useCreate,
    useUpdate,
    useNotify,
    useRedirect
} from 'react-admin';
import { uploadCategoryFile, API_URL } from '../../api/api';

// =============== LIST ===============
export const CategoryList: React.FC = (props) => (
    <>
      <Helmet>
        <title>Kategorie - Administrace - Můj Eshop</title>
        <meta name="description" content="Přehled kategorií v administraci." />
      </Helmet>
      <List {...props}>
        <Datagrid rowClick="edit">
          <TextField source="id" />
          {/* Zobrazíme výchozí jazyk, např. českou variantu */}
          <TextField source="name_cs" label="Název (Česky)" />
          <TextField source="displayType" />
          <TextField source="iconUrl" />
          <TextField source="imageUrl" />
          <EditButton />
        </Datagrid>
      </List>
    </>
  );
// =============== EDIT ===============
export const CategoryEdit: React.FC = (props) => {
    const [update] = useUpdate();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSave = async (data: any) => {
        try {
            let iconUrl = data.iconUrl;
            let imageUrl = data.imageUrl;

            // Upload icon if file is selected
            if (data.iconFile && data.iconFile.rawFile) {
                iconUrl = await uploadCategoryFile(data.iconFile.rawFile);
            }

            // Upload image if file is selected
            if (data.imageFile && data.imageFile.rawFile) {
                imageUrl = await uploadCategoryFile(data.imageFile.rawFile);
            }

            // Sestav data pro update – včetně všech jazykových variant
            const categoryData = {
                ...data,
                iconUrl,
                imageUrl,
            };

            await update(
                'categories',
                { id: data.id, data: categoryData },
                {
                    onSuccess: () => {
                        notify('Kategorie upravena', { type: 'success' });
                        redirect('list', 'categories');
                    },
                }
            );
        } catch (error) {
            notify('Error: ' + (error as Error).message, { type: 'error' });
        }
    };

    return (
        <Edit {...props}>
            <SimpleForm onSubmit={onSave}>
                <TextInput source="id" disabled />
                <TextInput source="name_cs" label="Název (Česky)" />
                <TextInput source="name_en" label="Název (English)" />
                <TextInput source="name_de" label="Název (Deutsch)" />
                <TextInput source="name_ru" label="Název (Русский)" />

                <SelectInput
                    source="displayType"
                    choices={[
                        { id: 'icon', name: 'Ikonová kategorie' },
                        { id: 'image', name: 'Obrázková kategorie' },
                    ]}
                />

                <TextInput source="iconUrl" label="Aktuální ikona (URL)" />
                <FileInput
                    source="iconFile"
                    label="Nahrát novou ikonu"
                    accept={{ 'image/*': [] }}
                >
                    <FileField source="src" title="title" />
                </FileInput>

                <TextInput source="imageUrl" label="Aktuální obrázek (URL)" />
                <FileInput
                    source="imageFile"
                    label="Nahrát nový obrázek"
                    accept={{ 'image/*': [] }}
                >
                    <FileField source="src" title="title" />
                </FileInput>
            </SimpleForm>
        </Edit>
    );
};

// =============== CREATE ===============
export const CategoryCreate: React.FC = (props) => {
    const [create] = useCreate();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSave = async (data: any) => {
        try {
            let iconUrl = '';
            let imageUrl = '';

            // Upload icon if file is selected
            if (data.iconFile && data.iconFile.rawFile) {
                iconUrl = await uploadCategoryFile(data.iconFile.rawFile);
            }

            // Upload image if file is selected
            if (data.imageFile && data.imageFile.rawFile) {
                imageUrl = await uploadCategoryFile(data.imageFile.rawFile);
            }

            const categoryData = {
                ...data,
                iconUrl,
                imageUrl,
            };

            await create('categories', { data: categoryData });
            notify('Kategorie vytvořena', { type: 'success' });
            redirect('list', 'categories');
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

                <SelectInput
                    source="displayType"
                    choices={[
                        { id: 'icon', name: 'Ikonová kategorie' },
                        { id: 'image', name: 'Obrázková kategorie' },
                    ]}
                    defaultValue="image"
                />

                <FileInput
                    source="iconFile"
                    label="Ikona"
                    accept={{ 'image/*': [] }}
                >
                    <FileField source="src" title="title" />
                </FileInput>

                <FileInput
                    source="imageFile"
                    label="Obrázek"
                    accept={{ 'image/*': [] }}
                >
                    <FileField source="src" title="title" />
                </FileInput>
            </SimpleForm>
        </Create>
    );
};

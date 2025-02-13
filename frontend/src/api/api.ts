// src/api/api.ts

const SERVER_IP = '188.175.32.34';
const SERVER_PORT = '5240';

export const BASE_URL = `http://${SERVER_IP}:${SERVER_PORT}/api`;
export const API_URL = `http://${SERVER_IP}:${SERVER_PORT}`;
export const UPLOADS_URL = `${API_URL}/uploads`;

// Helper function to convert image URLs
export const getImageUrl = (url: string): string => {
  if (!url) return '';
  
  // Handle full URLs
  if (url.startsWith('http')) {
    return url.replace('localhost', SERVER_IP);
  }
  
  // Handle relative paths
  if (url.startsWith('/uploads/')) {
    return `http://${SERVER_IP}:${SERVER_PORT}${url}`;
  }
  
  // Handle just filenames
  return `${UPLOADS_URL}/${url}`;
};

interface ProductFilter {
  isNew?: boolean;
  isSale?: boolean;
  isBestseller?: boolean;
  categoryId?: string | number;
}

export const fetchCategories = async (lang: string = 'cs') => {
  const res = await fetch(`${BASE_URL}/categories?lang=${lang}`);
  if (!res.ok) {
    throw new Error('Chyba při načítání kategorií');
  }
  return res.json();
};

export const fetchProducts = async (filter?: ProductFilter, lang: string = 'cs') => {
  let url = `${BASE_URL}/products?lang=${lang}`;
  const params = new URLSearchParams();

  if (filter?.isNew) {
    params.append('isNew', 'true');
  }
  if (filter?.isSale) {
    params.append('isSale', 'true');
  }
  if (filter?.isBestseller) {
    params.append('isBestseller', 'true');
  }
  if (filter?.categoryId) {
    params.append('categoryId', filter.categoryId.toString());
  }

  if (params.toString()) {
    url += `&${params.toString()}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Chyba při načítání produktů');
  }
  return res.json();
};

export const fetchProductById = async (id: string, lang: string = 'cs') => {
  const res = await fetch(`${BASE_URL}/products/${id}?lang=${lang}`);
  if (!res.ok) {
    throw new Error('Produkt nenalezen');
  }
  return res.json();
};

export const fetchCategoryById = async (id: string, lang: string) => {
  const res = await fetch(`${BASE_URL}/categories/${id}?lang=${lang}`);
  if (!res.ok) {
    throw new Error('Chyba při načítání kategorie');
  }
  return res.json();
};

export const uploadCategoryFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BASE_URL}/upload/category`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('File upload failed');
  }
  const json = await res.json();
  return `http://${SERVER_IP}:5240${json.url}`;
};

export const uploadProductImages = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/upload/product`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Upload failed');
  }
  const json = await res.json();
  return json.urls.map((item: { url: string; fullUrl: string }) => item.fullUrl);
};

export const uploadSliderImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await fetch(`${BASE_URL}/upload/slider`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Upload failed');
  }
  const json = await res.json();
  return `${API_URL}${json.url}`;
};

export const fetchSliders = async (lang: string) => {
  const res = await fetch(`${BASE_URL}/sliders?lang=${lang}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

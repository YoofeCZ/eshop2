import Product from '../models/Product.model.js';

// Pomocná funkce pro překlad produktu podle jazyka
const getTranslatedProduct = (product, lang) => {
  let translatedName = product.name_cs;
  let translatedDescription = product.description_cs;
  if (lang === 'en') {
    translatedName = product.name_en || product.name_cs;
    translatedDescription = product.description_en || product.description_cs;
  } else if (lang === 'de') {
    translatedName = product.name_de || product.name_cs;
    translatedDescription = product.description_de || product.description_cs;
  } else if (lang === 'ru') {
    translatedName = product.name_ru || product.name_cs;
    translatedDescription = product.description_ru || product.description_cs;
  }
  return {
    id: product.id,
    name: translatedName,
    description: translatedDescription,
    price: product.price,
    rating: product.rating,
    images: product.images,
    categoryId: product.categoryId,
    isNew: product.isNew,
    isSale: product.isSale,
    isBestseller: product.isBestseller,
    thumbnail: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : null
  };
};

export const getAllProducts = async (req, res) => {
  try {
    let { _page, _limit, isSale, isNew, isBestseller, lang, categoryId } = req.query;
    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || 10;
    const offset = (_page - 1) * _limit;
    lang = lang || 'cs';

    const whereClause = {};
    if (isSale === 'true') whereClause.isSale = true;
    if (isNew === 'true') whereClause.isNew = true;
    if (isBestseller === 'true') whereClause.isBestseller = true;
    // Přidáme filtr pro categoryId, pokud je předán
    if (categoryId) {
      // Pokud očekáváš číslo, převedeme na integer:
      whereClause.categoryId = parseInt(categoryId, 10);
    }

    const { count, rows: products } = await Product.findAndCountAll({
      offset,
      limit: _limit,
      where: whereClause,
    });

    const translated = products.map(prod =>
      getTranslatedProduct(prod.toJSON(), lang)
    );

    res.set('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', `products ${offset}-${offset + translated.length - 1}/${count}`);
    res.json(translated);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getProductById = async (req, res) => {
  const id = parseInt(req.params.id);
  const lang = req.query.lang || 'cs';
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(getTranslatedProduct(product.toJSON(), lang));
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createProduct = async (req, res) => {
  // Očekáváme: name_cs, name_en, name_de, name_ru,
  // description_cs, description_en, description_de, description_ru,
  // price, rating, images, categoryId
  const {
    name_cs, name_en, name_de, name_ru,
    description_cs, description_en, description_de, description_ru,
    price, rating, images, categoryId
  } = req.body;
  try {
    const product = await Product.create({
      name_cs, name_en, name_de, name_ru,
      description_cs, description_en, description_de, description_ru,
      price, rating, images, categoryId
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name_cs, name_en, name_de, name_ru,
    description_cs, description_en, description_de, description_ru,
    price, rating, images, categoryId, isNew, isSale, isBestseller
  } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const oldPrice = product.price;

    product.name_cs = name_cs !== undefined ? name_cs : product.name_cs;
    product.name_en = name_en !== undefined ? name_en : product.name_en;
    product.name_de = name_de !== undefined ? name_de : product.name_de;
    product.name_ru = name_ru !== undefined ? name_ru : product.name_ru;
    product.description_cs = description_cs !== undefined ? description_cs : product.description_cs;
    product.description_en = description_en !== undefined ? description_en : product.description_en;
    product.description_de = description_de !== undefined ? description_de : product.description_de;
    product.description_ru = description_ru !== undefined ? description_ru : product.description_ru;
    product.price = price;
    product.rating = rating;
    product.images = images;
    product.categoryId = categoryId;
    product.isNew = isNew ?? product.isNew;
    product.isSale = isSale ?? product.isSale;
    product.isBestseller = isBestseller ?? product.isBestseller;
    if (price < oldPrice) {
      product.isSale = true;
    }
    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

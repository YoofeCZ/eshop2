// src/controllers/categoryController.js
import Category from '../models/Category.model.js';

// Pomocná funkce: vybere překlad názvu kategorie podle jazyka.
const getTranslatedCategory = (category, lang) => {
  // Výchozí je čeština (cs)
  let translatedName = category.name_cs;
  if (lang === 'en' && category.name_en) {
    translatedName = category.name_en;
  } else if (lang === 'de' && category.name_de) {
    translatedName = category.name_de;
  } else if (lang === 'ru' && category.name_ru) {
    translatedName = category.name_ru;
  }
  return {
    id: category.id,
    name: translatedName,
    displayType: category.displayType,
    iconUrl: category.iconUrl,
    imageUrl: category.imageUrl
  };
};

export const getAllCategories = async (req, res) => {
  try {
    let { _page, _limit, lang } = req.query;
    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || 10;
    const offset = (_page - 1) * _limit;
    lang = lang || 'cs';

    const { count, rows: categories } = await Category.findAndCountAll({
      offset,
      limit: _limit,
    });

    const translatedCategories = categories.map(category =>
      getTranslatedCategory(category.toJSON(), lang)
    );

    res.set('Access-Control-Expose-Headers', 'Content-Range');
    res.set(
      'Content-Range',
      `categories ${offset}-${offset + translatedCategories.length - 1}/${count}`
    );

    res.json(translatedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCategoryById = async (req, res) => {
  const id = parseInt(req.params.id);
  const lang = req.query.lang || 'cs';
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const translatedCategory = getTranslatedCategory(category.toJSON(), lang);
    res.json(translatedCategory);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createCategory = async (req, res) => {
  // Očekáváme, že v req.body jsou předány překladové verze názvu
  const {
    name_cs, name_en, name_de, name_ru,
    displayType,
    iconUrl,
    imageUrl
  } = req.body;

  try {
    const category = await Category.create({
      name_cs,
      name_en,
      name_de,
      name_ru,
      displayType,
      iconUrl,
      imageUrl
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name_cs, name_en, name_de, name_ru,
    displayType,
    iconUrl,
    imageUrl
  } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (name_cs !== undefined) category.name_cs = name_cs;
    if (name_en !== undefined) category.name_en = name_en;
    if (name_de !== undefined) category.name_de = name_de;
    if (name_ru !== undefined) category.name_ru = name_ru;
    if (displayType !== undefined) category.displayType = displayType;
    if (iconUrl !== undefined) category.iconUrl = iconUrl;
    if (imageUrl !== undefined) category.imageUrl = imageUrl;

    await category.save();
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

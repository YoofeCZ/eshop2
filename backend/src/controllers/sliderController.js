import Slider from '../models/Slider.model.js';

// Pomocná funkce pro překlad slideru podle jazyka
const getTranslatedSlider = (slider, lang) => {
  let translatedTitle = slider.title_cs;
  let translatedDescription = slider.description_cs;
  if (lang === 'en') {
    translatedTitle = slider.title_en || slider.title_cs;
    translatedDescription = slider.description_en || slider.description_cs;
  } else if (lang === 'de') {
    translatedTitle = slider.title_de || slider.title_cs;
    translatedDescription = slider.description_de || slider.description_cs;
  } else if (lang === 'ru') {
    translatedTitle = slider.title_ru || slider.title_cs;
    translatedDescription = slider.description_ru || slider.description_cs;
  }
  return {
    id: slider.id,
    title: translatedTitle,
    description: translatedDescription,
    image: slider.image,
    order: slider.order,
    link: slider.link
  };
};

export const getAllSliders = async (req, res) => {
  try {
    let { _page, _limit, lang } = req.query;
    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || 10;
    const offset = (_page - 1) * _limit;
    lang = lang || 'cs';

    const { count, rows: sliders } = await Slider.findAndCountAll({
      offset,
      limit: _limit,
      order: [['order', 'ASC']]
    });

    const translated = sliders.map(slider =>
      getTranslatedSlider(slider.toJSON(), lang)
    );

    res.set('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', `sliders ${offset}-${offset + translated.length - 1}/${count}`);
    res.json(translated);
  } catch (error) {
    console.error('Error fetching sliders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSliderById = async (req, res) => {
  const id = parseInt(req.params.id);
  const lang = req.query.lang || 'cs';
  try {
    const slider = await Slider.findByPk(id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    res.json(getTranslatedSlider(slider.toJSON(), lang));
  } catch (error) {
    console.error('Error fetching slider by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createSlider = async (req, res) => {
  // Očekáváme: title_cs, title_en, title_de, title_ru, description_cs, description_en, description_de, description_ru, image, order, link
  const { 
    title_cs, title_en, title_de, title_ru,
    description_cs, description_en, description_de, description_ru,
    image, order, link 
  } = req.body;
  try {
    const slider = await Slider.create({ 
      title_cs, title_en, title_de, title_ru,
      description_cs, description_en, description_de, description_ru,
      image, order, link 
    });
    res.status(201).json(slider);
  } catch (error) {
    console.error('Error creating slider:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateSlider = async (req, res) => {
  const id = parseInt(req.params.id);
  const { 
    title_cs, title_en, title_de, title_ru,
    description_cs, description_en, description_de, description_ru,
    image, order, link 
  } = req.body;
  try {
    const slider = await Slider.findByPk(id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    slider.title_cs = title_cs !== undefined ? title_cs : slider.title_cs;
    slider.title_en = title_en !== undefined ? title_en : slider.title_en;
    slider.title_de = title_de !== undefined ? title_de : slider.title_de;
    slider.title_ru = title_ru !== undefined ? title_ru : slider.title_ru;
    slider.description_cs = description_cs !== undefined ? description_cs : slider.description_cs;
    slider.description_en = description_en !== undefined ? description_en : slider.description_en;
    slider.description_de = description_de !== undefined ? description_de : slider.description_de;
    slider.description_ru = description_ru !== undefined ? description_ru : slider.description_ru;
    slider.image = image !== undefined ? image : slider.image;
    slider.order = order !== undefined ? order : slider.order;
    slider.link = link !== undefined ? link : slider.link;
    await slider.save();
    res.json(slider);
  } catch (error) {
    console.error('Error updating slider:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteSlider = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const slider = await Slider.findByPk(id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    await slider.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting slider:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

import sequelize from '../db.js';
import Product from './Product.model.js';
import Category from './Category.model.js';
import Slider from './Slider.model.js';

// Definice asociací mezi modely
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

// Export modelů a instance sequelize
export { Product, Category, Slider, sequelize };

// Funkce pro inicializaci databáze (volitelná)
export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Databáze úspěšně inicializována');
  } catch (error) {
    console.error('Chyba při inicializaci databáze:', error);
    throw error;
  }
};

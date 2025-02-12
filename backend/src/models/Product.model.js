import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Category from './Category.model.js';

const Product = sequelize.define('Product', {
  // Překladové sloupce pro název a popis
  name_cs: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name_en: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name_de: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name_ru: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description_cs: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description_en: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description_de: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description_ru: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  rating: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: []
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Další příznaky:
  isNew: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  isSale: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isBestseller: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'products',
  timestamps: false
});

// Nastavení asociace: produkt patří ke kategorii
Product.belongsTo(Category, { foreignKey: 'categoryId' });

export default Product;

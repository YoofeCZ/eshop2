import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Category = sequelize.define('Category', {
  // Přidáváme překladové sloupce:
  name_cs: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  displayType: {
    type: DataTypes.ENUM('icon', 'image'),
    allowNull: false,
    defaultValue: 'image'
  },
  iconUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'categories',
  timestamps: false
});

export default Category;

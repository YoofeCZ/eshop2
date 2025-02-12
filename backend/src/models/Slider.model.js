import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Slider = sequelize.define('Slider', {
  // Přidáme překladové sloupce pro title a description
  title_cs: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title_en: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title_de: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title_ru: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description_cs: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description_en: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description_de: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description_ru: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'sliders',
  timestamps: false
});

export default Slider;

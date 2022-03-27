const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Category extends Model {}
Category.init({
  title: {
    type: Sequelize.STRING
  },
  is_active: {
    type: Sequelize.BOOLEAN
  }
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'Category' // choose the model name
});

module.exports = Category
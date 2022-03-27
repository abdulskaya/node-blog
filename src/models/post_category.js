const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class PostCategory extends Model {}
PostCategory.init({
  category_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
  post_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'posts',
      key: 'id',
    },
  }
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'post_categories' // choose the model name
});

module.exports = PostCategory
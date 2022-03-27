const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Post extends Model {}
Post.init({
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  post_face: {
    type: Sequelize.STRING
  },
  author_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  read_time: {
    allowNull: false,
    type: Sequelize.INTEGER // 90 dak.
  },
  is_active: {
    type: Sequelize.BOOLEAN,
  }
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'Post' // choose the model name
});

module.exports = Post


const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Post extends Model {}
User.init({
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  post_face: {
    type: Sequelize.STRING
  },
  category_id: {
    type: Sequelize.INTEGER
  },
  author_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  is_active: {
    type: Sequelize.BOOLEAN,
  }
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'Post' // choose the model name
});

// the defined model is the class itself
console.log(User === sequelize.models.Post); // true



const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Comment extends Model {
  static associate(models) {
    // define association here
  }
}
User.init({
  content: {
    type: Sequelize.STRING
  },
  post_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
  author_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  is_active: {
    type: Sequelize.BOOLEAN
  }
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'Comment' // choose the model name
});

// the defined model is the class itself
console.log(User === sequelize.models.Comment); // true



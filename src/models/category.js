const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Category extends Model {}
User.init({
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

// the defined model is the class itself
console.log(User === sequelize.models.Category); // true



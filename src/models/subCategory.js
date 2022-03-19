const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class SubCatogory extends Model {}

SubCatogory.init({
  email: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  profile_image: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'SubCatogory' // choose the model name
});

// the defined model is the class itself
console.log(User === sequelize.models.SubCatogory); // true


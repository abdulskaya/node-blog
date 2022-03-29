const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}
User.init({
  email: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  fullname: {
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
  modelName: 'User' // choose the model name
});

module.exports = User


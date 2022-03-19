const db_config = require('./config.json')
const Sequelize = require('sequelize')

const connection = new Sequelize(db_config.database, db_config.username, db_config.password, {
  host: db_config.development.HOST,
  dialect: db_config.development.dialect,
  port : process.env.MYSQL_CONNECTION_STRING,
  logging : false
});

if (connection.authenticate()) {
  console.log('Veritabanı bağlantısı başarılıs');
}else {
  console.log('Veritabanı bağlantısı başarısız');
}
module.exports = connection;

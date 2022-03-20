const db_config = require('./config.json')
const Sequelize = require('sequelize')

const connection = new Sequelize(db_config.development.database, db_config.development.username, db_config.development.password, {
  host: db_config.development.HOST,
  dialect: db_config.development.dialect,
  port : process.env.MYSQL_CONNECTION_STRING,
  logging : false
});

connection.query('CREATE TABLE IF NOT EXISTS `sessions` ( `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,`expires` int(11) unsigned NOT NULL,`data` mediumtext COLLATE utf8mb4_bin,PRIMARY KEY (`session_id`)) ENGINE=InnoDB')

if (connection.authenticate()) {
  console.log('Db connected successfully');
}else {
  console.log('Db connection failed');
}
module.exports = connection;

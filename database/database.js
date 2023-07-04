const Sequelize = require('sequelize');

const connection = new Sequelize("guia_perguntas", 'root', '123456',{
    host: 'localhost',
    port: 5012,
    dialect: 'mysql'
});


module.exports = connection;

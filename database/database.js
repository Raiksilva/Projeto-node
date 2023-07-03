const Sequelize = require('sequelize');

const connection = new Sequelize("guia_perguntas", 'root', 'R@ik1423',{
    host: 'localhost',
    port: 5012,
    dialect: 'mysql'
});


module.exports = connection;

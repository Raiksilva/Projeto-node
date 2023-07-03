const Sequelize = require('sequelize');
const connection = require("../database/database");

const Pergunta = connection.define('Perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'O campo "descricao" não pode estar em branco.'
            }
        }
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'O campo "descricao" não pode estar em branco.'
            }
        }
    },
});

Pergunta.sync({force: false}).then(() =>{
    console.log("Tabela 1 sincronizada");
});


module.exports = Pergunta;


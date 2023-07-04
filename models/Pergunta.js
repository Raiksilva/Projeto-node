const Sequelize = require('sequelize');
const connection = require("../src/database");

const Pergunta = connection.define('Perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'O campo "título" não pode estar em branco.'
            }
        }
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'O campo "descrição" não pode estar em branco.'
            }
        }
    },
});

Pergunta.sync({force: false}).then(() =>{
    
});


module.exports = Pergunta;


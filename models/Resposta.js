const Sequelize = require('sequelize');
const connection = require("../database/database");

const Resposta = connection.define('resposta',{
    corpo: {
        type: Sequelize.TEXT,
        validate: {
            notEmpty: {
              msg: 'O campo "descricao" não pode estar em branco.'
            }
        }
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'O campo "descricao" não pode estar em branco.'
            }
        }
    }
});

Resposta.sync({force: false}).then(() =>{
    console.log("tabela 2 sincronizada")
});

module.exports = Resposta;

const Sequelize = require('sequelize');
const connection = require("../src/database");

const Resposta = connection.define('resposta',{
    corpo: {
        type: Sequelize.TEXT,
        validate: {
            notEmpty: {
              msg: 'O campo "corpo" não pode estar em branco.'
            }
        }
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'O campo "pergunta Id" não pode estar em branco.'
            }
        }
    }
});

Resposta.sync({force: false}).then(() =>{
    
});

module.exports = Resposta;

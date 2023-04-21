const Sequelize = require("sequelize");
const connection = require("./database");

//criando a tabela 
const Pergunta = connection.define('perguntas', {
    titulo:{ 
        type: Sequelize.STRING, 
        allowNull: false //impede que o campo receba valores nulos 
    }, 
    descricao:{
        type: Sequelize.TEXT, //para textos longos
        allowNull: false
    }
});  

Pergunta.sync({force: false}).then(() => { //sincronizar com o banco de dados 
    console.log('Tabela criada com sucesso!')
});

module.exports = Pergunta;
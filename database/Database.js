
const Sequelize = require ('sequelize');

//credenciais do banco de dados
const connection = new Sequelize ('meuquiz', 'vicente', 'Cnascimento725725!', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection; 
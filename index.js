const express = require("express");
const app = express(); 
const bodyParser = require ("body-parser");
const connection = require ("./database/database");
const questionModel = require ("./database/Question");
//database 

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.kig(msgErro);
    })
/*caso dê erro na tentativa de conexão, abra o mysql workbench e insira essa linha de código:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'a senha que você quiser'
obs: caso o erro persista, reinicie o pc.
obs2: caso persista, volte para a versão 5.7 do msql. 
*/

//dizendo para o express usar o ejs como view engine
app.set('view engine', 'ejs');

//arquivos estáticos
app.use(express.static('public'));

//importando body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//rotas
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
}) 

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("formulário recebido! titulo " + titulo + " " + " descricao " + descricao);
});

app.listen(8080, () => {console.log("APP RODANDO NA PORTA 8080!");});
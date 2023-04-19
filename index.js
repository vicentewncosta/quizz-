const express = require("express");
const app = express(); 
const bodyParser = require ("body-parser");
const connection = require ("./database/database");
const Question = require ("./database/Question");
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
    Question.findAll({ raw: true }).then(questions => {
        res.render("index", { 
            questions: questions
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
}) 


app.post("/salvarpergunta", (req, res) => {
    //recebo os dados dos formulário e salvo nas variavéis 
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //salvo no meu banco de dados, dando bom, redireciono meu usuário para a url desejada. 
    Question.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        console.log('Pergunta salva com sucesso!')
        res.redirect("/");
    });
});

app.listen(8080, () => {console.log("APP RODANDO NA PORTA 8080!");});
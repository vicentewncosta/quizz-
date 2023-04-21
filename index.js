//importações
const express = require("express");
const app = express(); 
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({ raw: true, order:[ //pesquisando as perguntas
        ['id','DESC'] //ordenação
    ]}).then(perguntas => {
        res.render("index", { //mandando as perguntas para o frontend
           perguntas: perguntas
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

    Pergunta.create({ //mesma função do insert
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        console.log('Pergunta salva com sucesso!')
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => { //recebo a pergunta
        if(pergunta != undefined) { //pergunta encontrad
            Resposta.findAll({
                where: {perguntaId: perguntaId},
                order: [
                    ['id','DESC']
                ]        
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{ //pergunta não encontrada
            res.redirect("/"); 
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = res.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId); //redirecionando o usuário para a página da pergunta escollhida.
    });
});

app.listen(8080, () => {console.log("APP RODANDO NA PORTA 8080!");});
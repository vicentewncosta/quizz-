const express = require("express");
const app = express(); 
const bodyParser = require("body-parser");

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
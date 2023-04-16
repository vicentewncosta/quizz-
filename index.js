const express = require("express");
const app = express(); 

//dizendo para o express usar o ejs como view engine
app.set('view engine', 'ejs');

//arquivos estáticos
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
}) 

app.listen(8080, () => {console.log("APP RODANDO NA PORTA 8080!");});
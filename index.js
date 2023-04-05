const express = require("express");
const app = express(); 

//dizendo para o express usar o ejs como view engine
app.set('view engine', 'ejs');


app.get("/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    res.render("index", {
        nome: nome, 
        lang: lang,
        empresa: "vicentetesteempresa",
        inscritos: 120000 
    });
});

app.listen(8080, () => {console.log("APP RODANDO NA PORTA 8080!");});
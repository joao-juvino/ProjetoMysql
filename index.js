const express = require("express")
const app = express()

const porta = 8080
const Post = require("./models/Post")
// Configuração
// Engine do HandleBars
const handlebars = require("express-handlebars")
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set("view engine", "handlebars")

// Configuração do JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rotas
app.get("/", (req, res, next) => {
    // Post.findAll({order: [['id', 'ASC']]})
    Post.findAll({order: [['id', 'DESC']]})
        .then(function(posts){
            res.render("home", {posts: posts})
        })
})

app.get("/cadastrar", (req, res, next) => {
    res.render("formulario");
})

app.post("/cadpostagem", (req, res, next) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
        .then(function() {
            res.redirect("/")
        })
        .catch(function(e){
            res.send("Houve um erro: " + e)
        })
})

app.get("/deletar/:id", (req, res, next) => {
    Post.destroy({
        where:{ 'id': req.params.id }
    })
        .then(function(){
            res.redirect("/")
        })
        .catch(function(e){
            res.send("Essa postagem não existe? " + e)
        })
})

app.listen(porta, () => {
    console.log("Sevidor executando na porta " + porta)
})


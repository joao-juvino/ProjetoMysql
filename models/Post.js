const db = require("./db")

const Post = db.sequelize.define("postagens", {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})

// console.log("All users:", JSON.stringify(Post.findAll(), null, 2))


// Cria uma tabela!
// Post.sync({force: true})

module.exports = Post

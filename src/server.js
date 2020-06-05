const express = require("express") //Usa-se para poder utilizar o express nessa página
const server = express()

//Pegar o banco de dados
const db = require("./database/db")

//Configurar pasta pública para ser encontrada
//use é um configuração do servidor.
server.use(express.static("public")) 

//habilitar o uso do req.body na aplicação | req.body -> É o "corpo" do formulário
server.use(express.urlencoded({ extended: true }))


//Utilizando Template Engine
const nunjucks = require("nunjucks") //estou puxando um pacote/módulo do engine nunjucks que foi instalado
nunjucks.configure("src/views", {
    express: server, //liga o nunjucks ao express
    noCache: true //faz com que não seja salvo cache da página, isso é recomendado quando se está codando para que não haja problemas visuais.
})

//Configurar caminhos da minha aplicação
//página inicial
//req = Requisição/Pedido
//res = Resposta
server.get("/", (req, res) => { //get é utilizado para fazer pedidos (configuração de rota), para /, já que o site não pode encontrar o caminho / da aplicação
    return res.render("index.html") //__dirname é o diretório, que nesse caso é o src
})

server.get("/create-point", (req, res) => { 
    // req.query -> São os query strings da nossa url
    //console.log(req.query) 

    return res.render("create-point.html") //antes era sendFiles(__dirname + "/views/create-point.html"), mas como o nunjucks foi instalado, ficou render.
})

server.post("/savepoint", (req, res) => {
    //console.log(req.body)

    //Inserir dados no banco de dados pelo formulário
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?); `
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this) //this está dentro da function, que está referenciado a resposta que o run traz.
        
        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)

    
})


server.get("/search-results", (req, res) => { 

    const searchResults = req.query.search

    if(searchResults == ""){
        // Pesquisa Vazia
        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { total: 0 })
    }


    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${searchResults}%'`, function(err, rows) { //O asterisco informa que será selecionado tudo.
        if(err) { //Acima, foi usado ${} entre as aspas simples pois o valor é uma string E foi usado entre % para dizer que pode ter nome antes ou depois do informado.
            return console.log(err)
        }

        const total = rows.length

        console.log("Aqui estão seus registros: ")
        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total }) //antes era sendFiles(__dirname + "/views/create-point.html"), mas como o nunjucks foi instalado, ficou render.
    })  
})


//ligar o servidor
server.listen(3000) //linten é uma função que vai "escutar" a porta 3000


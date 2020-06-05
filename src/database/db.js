//importar a dependência do SQLite 3
const sqlite3 = require("sqlite3").verbose() //verbose diz que toda vez que acontecer alguma coisa vou querer ter mais mensagens, mais informações

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db //faz outra página poder utilizar esta, usando o "require" lá.

//Utilizar o objeto de banco de dados, para nossas operações
//db.serialize(() => { //serialize quer dizer que vai rodar uma sequência de códigos
    //Com comandos SQL será feito:

    //1. Criar uma tabela (AUTOINCREMENT: ele sozinho vai se atualizar sozinho, "aumentar seu número sozinho")
    //db.run(` 
    //    CREATE TABLE IF NOT EXISTS places (
    //        id INTEGER PRIMARY KEY AUTOINCREMENT,
    //        image TEXT,
    //        name TEXT,
    //        adress TEXT,
    //        adress2 TEXT,
    //        state TEXT,
    //        city TEXT,
    //        items TEXT
    //    );
    //`) //utiliza-se crase para realizar a quebra de linhas, isso é chamado de template string (template litros)

    //2. Inserir dados na tabela
    //const query = `
    //    INSERT INTO places (
    //        image,
    //        name,
    //        adress,
    //        adress2,
    //        state,
    //        city,
    //        items
    //    ) VALUES (?,?,?,?,?,?,?); `
    
    //const values = [
    //    "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    //    "Papersider",
    //    "Guilherme Gemballa, Jardim América",
    //    "Nº 260",
    //    "Santa Caratina",
    //    "Rio do Sul",
    //    "Papéis e Papelão"
    //]

    //function afterInsertData(err){
    //    if(err) {
    //        return console.log(err)
    //    }
    //    console.log("Cadastrado com sucesso")
    //    console.log(this) //this está dentro da function, que está referenciado a resposta que o run traz.
    //}

    //db.run(query, values, afterInsertData)

    //3. Consultar os dados da tabela
    //db.all(`SELECT * FROM places`, function(err, rows) { //O asterisco informa que será selecionado tudo.
    //    if(err) {
    //        return console.log(err)
    //    }

    //    console.log("Aqui estão seus registros: ")
    //    console.log(rows)
    //})  

    //4. Deletar um dado da tabela
    //db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
    //    if(err) {
    //        return console.log(err)
    //    }
    //
    //    console.log("Registro apagado com sucesso")
    //})
//}) 
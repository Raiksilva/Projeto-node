const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./models/Pergunta');
const Resposta = require('./models/Resposta');


// Database
connection
    .authenticate()
    .then(() => {
        console.log("conexão  feita com sucesso");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });


// Utilizando o ejs como view engine, que nos permitirar mexer com o html e css
app.set('view engine', 'ejs'); 
// Para utilização dos objetos estaticos como CSS/Imagem/ JavaScript front end.
app.use(express.static('public'));
//comando responsavel por ler o que foi enviado pelo usúario e traduza para que o javascript consiga enteder 
app.use(bodyParser.urlencoded({extended: false}));
//comando responsavel por ler e traduzir os arquivos json 
app.use(bodyParser.json());

// Rota responsavel por chamar a pagina inicial do projeto web
app.get('/', (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']// ASC = Crescente || DESC = Decrescente
    ]}).then(perguntas => {
      console.log(perguntas);
      res.render('index', { perguntas: perguntas });
    });
  });

// Rota responsavel por chamar a pagina de perguntas do projeto web
app.get('/perguntar', (req, res) =>{
    res.render('perguntar');
});

app.get("/pergunta/:id", (req, res) =>{
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){ //Pergunta encontrada 
            Resposta.findAll({
                where: { perguntaid: pergunta.id}, 
                order: [ ['id', 'desc'] ]
            }).then(respostas =>{
                    res.render("pergunta",{
                        pergunta: pergunta,
                        respostas: respostas
                });
            });
            
        }else{ // não encontrada
            res.redirect("/");
        }
    });
});




// rota responsavel por enviar o fomulario para o node
app.post ('/salvarpergunta', (req, res) =>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{
        res.redirect('/')
    })
});

app.post ('/responder', (req, res) =>{
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() =>{
        res.redirect('/pergunta/' + perguntaId)
    })
});

app.listen(3030, function(erro){
    if(erro){
        console.log("O app está com algum erro.");
    }else{
        console.log("O app está rodando...");
    }
})
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
    console.log("Conexão feita com sucesso");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });


// Utilizando o ejs como view engine, que nos permitirá mexer com o html e css
app.set('view engine', 'ejs');
// Para utilização dos objetos estáticos como CSS/Imagem/JavaScript front-end.
app.use(express.static('public'));
// Comando responsável por ler o que foi enviado pelo usuário e traduzir para que o JavaScript consiga entender.
app.use(bodyParser.urlencoded({ extended: false }));
// Comando responsável por ler e traduzir os arquivos JSON.
app.use(bodyParser.json());

// Rota responsável por chamar a página inicial do projeto web.
app.get('/', (req, res) => {
  Pergunta.findAll({ raw: true, order: [['id', 'DESC']] })
    .then((perguntas) => {
      console.log(perguntas);
      res.render('index', { perguntas: perguntas });
    });
});

// Rota responsável por chamar a página de perguntas do projeto web.
app.get('/perguntar', (req, res) => {
  res.render('perguntar', { errorMessage: req.query.error });
});

app.get('/pergunta/:id', (req, res) => {
  let id = req.params.id;
  Pergunta.findOne({ where: { id: id } })
    .then((pergunta) => {
      if (pergunta != undefined) { // Pergunta encontrada
        Resposta.findAll({ where: { perguntaId: pergunta.id }, order: [['id', 'desc']] })
          .then((respostas) => {
            res.render("pergunta", { pergunta: pergunta, respostas: respostas, errorMessage: req.query.error });
          });
      } else { // Pergunta não encontrada
        res.redirect("/");
      }
    });
});

// Rota responsável por enviar o formulário para o node
app.post('/salvarpergunta', (req, res) => {
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;

  // Verifica se os campos estão vazios
  if (!titulo || !descricao) {
    res.redirect('/perguntar?error=Preencha todos os campos.');
    return;
  }

  Pergunta.create({ titulo: titulo, descricao: descricao })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/perguntar?error=Erro ao salvar a pergunta.');
    });
});


app.post('/responder', (req, res) => {
  let corpo = req.body.corpo;
  let perguntaId = req.body.pergunta;

  // Verifica se os campos estão vazios
  if (!corpo) {
    res.redirect('/pergunta/' + perguntaId + '?error=Preencha o campo de resposta.');
    return;
  }

  Resposta.create({ corpo: corpo, perguntaId: perguntaId })
    .then(() => {
      res.redirect('/pergunta/' + perguntaId);
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/pergunta/' + perguntaId + '?error=Erro ao salvar a resposta.');
    });
});

app.listen(3030, function (erro) {
  if (erro) {
    console.log("O app está com algum erro.");
  } else {
    console.log("O app está rodando...");
  }
});

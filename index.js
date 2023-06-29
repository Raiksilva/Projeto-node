const express = require('express');
const app = express();

// Utilizando o ejs como view engine, que nos permitirar mexer com o html e css
app.set('view engine', 'ejs'); 
// Para utilização dos objetos estaticos como CSS/Imagem/ JavaScript front end.
app.use(express.static('public'));


app.get('/', (req, res) =>{
    
    res.render('index',);
})

app.listen(3030, function(erro){
    if(erro){
        console.log("O app está com algum erro.");
    }else{
        console.log("O app está rodando...");
    }
})
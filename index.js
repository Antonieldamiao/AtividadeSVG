const express = require('express')
const app = express()
const path = require('path')
const { getProduto} = require('./consultas/queries')
const { atualizar } = require('./consultas/redis')
const { carregar } = require('./consultas/redis')
const Client  = require('./consultas/queries')
const client  = require('./consultas/redis')
const port = 3000
const session = require('express-session')
const redis = require('redis')
const redisStore = require('connect-redis')(session);
var bodyParse = require('body-parser');
//pega a sessao do
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('./consultas'))
app.use(bodyParse.urlencoded({extended: true})); 
app.use(bodyParse.json());

//cors
var cors = require('cors')
app.use(cors())

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname,'/views')))
app.get('/getProduto', getProduto)
app.get('/produto', (req,res)=>{
  res.render("ListaProdutos.html")
})
app.post('/atualizar', atualizar)
app.post('/carregar', carregar)
app.get('/login', (req,res) =>{
  res.render('index.html')
})
app.post('/loginUser', (req,res, next) => {
if(Client.autenthiClient(req.body.email, req.body.senha)){
  req.session.key = req.body.email
  
  client.client.set(req.sessionID, req.session.key, ()=>{return {status:true}})
    
  res.redirect('/produto')
  
      
}else{
      res.end('not done')
}
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
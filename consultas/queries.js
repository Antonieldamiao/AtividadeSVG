const body = require('body-parser');
const Pool = require('pg').Pool
const storage = require('sessionstorage')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'loja',
  password: 'postgres',
  port: 5432,
})

async function autenthiClient(email, senha){
  return new Promise((resolve,rejected) => {
      storage.setItem('email',email) 
      
       
      let autentic = pool.query("SELECT COUNT(*) FROM Cliente WHERE email = $1 and senha = $2", [email, senha])
      autentic.on('row', function(row){
          if(row.count){
             resolve(true);
          }else{
              resolve(false);
          }
      });

      autentic.on('end', () => {
          
      })
  })
}

const getProduto = (request,response) => {
  pool.query('SELECT * FROM produto ', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  

  })
}

const login1 = (request) => {
  pool.query('select * from login', (error, results) => {
    if (request.body.email == results ){
      console.log("logou")

      throw error
    }
    console.log("deu merda")
  })
}

module.exports = {
    getProduto,
    login1,
    autenthiClient
}


const body = require('body-parser');
var redis = require('redis');
var bluerbid = require('bluebird');
bluerbid.promisifyAll(redis.RedisClient.prototype);
bluerbid.promisifyAll(redis.Multi.prototype);
var client = redis.createClient();
const storage = require('sessionstorage')


client.on('connect', function() {
    console.log('connected');
});

const atualizar = (request) => {
 var user = storage.getItem('email')

 
 client.getAsync(user).then(function (response) {
   
    if(response !=null){
        client.set(user, response + request.body.id, 'EX' ,7200)
    } else {
        client.set(user, request.body.id, 'EX' ,7200 )
     
    }
    
 })
}

const carregar = (response) =>{

    client.getAsync(user).then(function (resposta) {
        response.status(200).json(resposta)
       if(resposta !=null){
        response.status(200).json(resposta)
       } else {
         console.log("error carregar")
       }
       
    })
   }

module.exports = {
    atualizar,
    carregar,
    client
    

}
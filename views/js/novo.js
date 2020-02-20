var bt;

    
 addEventListener('load',async function(){

    let jsonProduto = []

    await $.ajax({
        type: 'GET',
        url: `http://localhost:3000/getProduto`,
        success: function(data) {
          jsonProduto = data
          
        }
      })

      generate_Produto(jsonProduto)
})

function generate_Produto(jsonProduto){
    center = document.createElement('center')
    
   
    
   //Object.keys(jsonNome).forEach(function(item){
    //JSON.stringify(Object.values(jsonNome[item]))
  //});  
  for(var property in jsonProduto){
    teste = Object.values(jsonProduto[property])
    
    div ='<div class="card mb-4 shadow-sm">'
    div +=  '<div class="card-header">'
    div +=   '<h4 class="my-0 font-weight-normal">'+teste[1]+'</h4>'
    div += ' </div>'
    div += '<div id="'+teste[0]+'"class="card-body">'
    div += '<h1 class="card-title pricing-card-title">R$: '
    div += teste[2]
    div +=  '<small class="text-muted">/ unid</small></h1>'
    div +=  '<button id="'+teste[0]+'"type="button" class="btn btn-lg btn-block btn-primary">Adicionar ao carrinho</button>'
    div +='</div>'
    div += ' </div>'
    
    console.log("entrou1")
    document.getElementById('lista').innerHTML += div
    
  }

 bt = document.getElementsByTagName('button');

Array.from(bt).forEach(function (button) {
  button.addEventListener('click',function(){
    let id = JSON.stringify(this.id)
    console.log(id)
    alert("Adicionado")
     $.ajax({
      url: 'http://localhost:3000/atualizar',
      type: 'POST',
      data: { id: id}
      }).done(function(res) {
          if (res.success) {
            
          console.log('id from ajax call is', res);
          window.location.reload();
      } else {
          console.log('error...ajax');
          alert("não foi adicionado")
          }
    
  })
})

}

)}


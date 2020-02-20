

    
 addEventListener('load',async function(){
  
    let jsonEstado

    await $.ajax({
        type: 'GET',
        url: `http://localhost:3000/getProdutos`,
        success: function(data) {
          jsonEstado = data
          
        }
      })

      generate_produto(jsonProduto)
})

function generate_produto(jsonProduto){
    center = document.createElement('center')
    
   
   
    
   //Object.keys(jsonNome).forEach(function(item){
    //JSON.stringify(Object.values(jsonNome[item]))
  //});  
  for(var property in jsonEstado){
        label +=' <div class="card-body">'
             label+=' <h1 class="card-title pricing-card-title">'+Object.values(jsonProduto[property])+' <small class="text-muted">/ mo</small></h1>'
                label+='<ul class="list-unstyled mt-3 mb-4">'
        label+='<li>10 users included</li>'
         label+='<li>2 GB of storage</li>'
          label+='<li>Email support</li>'
          label+='<li>Help center access</li> </ul>'
        label+='<button id="'+Object.values(property[jsonProduto])+'"type="button" class="btn btn-lg btn-block btn-outline-primary">Sign up for free</button> </div>'

    label = '<option value="'+Object.values(jsonEstado[property])+'">'
    label += Object.values(jsonEstado[property])
    label +='</option>'
    console.log("entrou1")
    document.getElementById('estados').innerHTML += label
    
  }
}

async function chama(){
var opition
option = '<option value="">selecione uma cidade</option>'
console.log("resetou")
document.getElementById('cidades').innerHTML = option
Swal.fire({
  position: 'top-end',
  icon: 'warning',
  title: 'aguarde um instante',
  showConfirmButton: false,
  timer: 7500
})
    
    let estado = $("#estados option:selected").val();
    let jsonCidade
    console.log(estado)
    await $.ajax({
        type: 'GET',
        url: `http://localhost:3000/getCidade/${estado}`,
        success: function(data) {
         
          jsonCidade = data
          
        }
        
      })
    
    generate_Cidade(jsonCidade)


    }

      function generate_Cidade(jsonCidade){
        center = document.createElement('center')
        
       
       
        
       //Object.keys(jsonNome).forEach(function(item){
        //JSON.stringify(Object.values(jsonNome[item]))
      //});  
      for(var property in jsonCidade){
        label = '<option value="'+Object.values(jsonCidade[property])+'">'
        label += Object.values(jsonCidade[property])
        label +='</option>'
      console.log("entrou")
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'carregado',
        showConfirmButton: false,
        timer: 1500
      })
        document.getElementById('cidades').innerHTML += label
        
      }
    }
//funcção pra recuperar o view box e o sgv do banco
async function view(){
  document.getElementById('estados').innerHTML += $("estados opition:deselect")
        var cidade =  $("#cidades option:selected").val();
  console.log(cidade)
  let jsonSvg, jsonView


  await $.ajax({
    type: 'GET',
    url: `http://localhost:3000/getViewBox/${cidade}`,
    success: function(data) {
      jsonView = data[0].getviewbox
    }
  })

  await $.ajax({
    type: 'GET',
    url: `http://localhost:3000/getSvg/${cidade}`,
    success: function(data) {
      jsonSvg = data[0].st_assvg
    }
  })

  generate_svg(jsonSvg, jsonView)
}

function generate_svg(jsonSvg, jsonView) {
 
  let svg = '<svg style="height: 400px","margin-left:30px" viewBox="'
  svg += jsonView
  svg += '"><path d="'
  svg += jsonSvg
  svg += '" />'
  svg += '</svg>'
  
    
  

  document.getElementById('svgs').innerHTML = svg
}

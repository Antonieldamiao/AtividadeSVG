


    
 addEventListener('load',async function(){
  
    let jsonEstado

    await $.ajax({
        type: 'GET',
        url: `http://localhost:3000/getEstado`,
        success: function(data) {
          jsonEstado = data
          alert("Bem vindo")
        }
      })

      generate_estado(jsonEstado)
})

function generate_estado(jsonEstado){
    center = document.createElement('center')
    
   
   
    
   //Object.keys(jsonNome).forEach(function(item){
    //JSON.stringify(Object.values(jsonNome[item]))
  //});  
  for(var property in jsonEstado){
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


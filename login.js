addEventListener('click' ,function(){

    let user = document.getElementById("email")
    let password = document.getElementById("password");

   
  
     $.ajax({
      url: 'http://localhost:3000/login1',
      type: 'POST',
      data: { user: user , password: password}
      }).done(function(res) {
          if (res.success) {
          console.log('id from ajax call is', res);
          window.location.reload();
      } else {
          console.log('error...ajax');
          }
  })

}
)
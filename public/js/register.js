$(document).ready(function(){

$('#reg_btn').click(function(e){
		e.preventDefault();
		var username = $('#username').val();
		var password1 = $('#pass1').val();
		var password2 = $('#pass2').val();
		var email = $('#email').val();
		$.ajax({
			type:"GET",
			url:"http://localhost:8080/register",
			data:{username:username,email:email,password:password1,passconf:password2},
			complete:function(data){
				console.log(data);
				alert(data.responseText);
				window.location.href="http://localhost:8080/login.htm"
			}
		})
	})

})
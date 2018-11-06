$(document).ready(function(){
	console.log("hello");
	$('#login_btn').click(function(e){
		e.preventDefault();
		var username = $('#username').val();
		var password = $('#password').val();
		$.ajax({
			type:"GET",
			url:"http://localhost:8080/login",
			data:{username:username,password:password},
			complete:function(data){
				console.log(data);
				alert(data.responseText);
				if(data.responseText=="Successfully logged in")
				window.location.href="http://localhost:8080/homepage.htm"

			}
		})
	})
})
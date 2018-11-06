$(document).ready(function(){
$.ajax({
	type:"GET",
	url:"http://localhost:8080/getDetails",
	data:{},
	complete:function(data){
		console.log(data);
       var response = data.responseJSON;
       var username = response.username;
       var email = response.email;
      $("#userdetails").append("<b>Username</b>:"+username+"<br><br><b>Email</b>:"+email+"<br><br>");

	}

})
// $.ajax({
// 	type:"GET",
// 	url:"http://localhost:8080/getBooks",
// 	data:{},
// 	complete:function(data){
// 		console.log(data);
// 		var response = data.responseJSON;
// 		var i;
// 		$("#userdetails").append("<b>List of Borrowed Books</b>:");

// 		for(i=0;i<response.length;i++)
// 		{
//            $("#userdetails").append("<p>"+response[i].bname+"</p>");
// 		}
// 	}
// })
});

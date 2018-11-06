$(document).ready(function(){
$.ajax({
	type:"GET",
	url:"http://localhost:8080/getDetails",
	data:{},
	complete:function(data){
		console.log(data);
       var response = data.responseJSON;
       var username = response[0].username;
       var email = response[0].email;
      $("#userdetails").append("<b>Username</b>:"+username+"<br><br><b>Email</b>:"+email+"<br><br>");

	}

})
$.ajax({
	type:"GET",
	url:"http://localhost:8080/getBooks",
	data:{},
	complete:function(data){
		console.log(data);
		var response = data.responseJSON;
		var i;
		      $("#userdetails").append("<b>List of Borrowed books</b>:<br><br>");

		for(i=0;i<response.length;i++)
		{
           $("#userdetails").append("<p>"+response[i].bname+" - "+response[i].author+"</p>");
           $("#return_book").append("Name:<span>"+response[i].bname+"</span><br>Author:<span>"+response[i].author+"</span><br>"+"<button class='btn btn-primary return_button'>Return</button><br><br>");

		}
	}
})

$.ajax({
	type:"GET",
	url:"http://localhost:8080/getAll",
	data:{},
	complete:function(data){
		console.log(data);
		var response = data.responseJSON;
		var i;
		for(i=0;i<response.length;i++)
		{
           $("#borrow_book").append("Name:<span>"+response[i].bname+"</span><br>Author:<span>"+response[i].author+"</span><br>"+"<button class='btn btn-primary borrow_button'>Borrow</button><br><br>");
		}
		$('#loading_wrapper').css('display','none');
		$('#main_content').css('display','block');
	}
})


$(document).on('click','button.borrow_button',function(){
	var name=$(this).prev().prev().prev().prev()[0].innerHTML;
	var author=$(this).prev().prev()[0].innerHTML;
	console.log(name);
	$.ajax({
			type:"GET",
			url:"http://localhost:8080/borrow",
			data:{name:name,author:author},
			complete:function(data){
				console.log(data);
				window.location.reload();
			}
		})

})

$(document).on('click','button.return_button',function(){
	var name=$(this).prev().prev().prev().prev()[0].innerHTML;
	var author=$(this).prev().prev()[0].innerHTML;
	console.log(name);
	$.ajax({
			type:"GET",
			url:"http://localhost:8080/return",
			data:{name:name,author:author},
			complete:function(data){
				console.log(data);
				window.location.reload();
			}
		})

})


$(document).on('click','#logout_button',function(){
	$.ajax({
			type:"GET",
			url:"http://localhost:8080/logout",
			data:{},
			complete:function(data){
				window.location.href="http://localhost:8080/login.htm"
			}
		})

})


});



/*var button = document.getElementById('counter');
var counter = 0;
button.onclick = function () {
	// body...
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function (){
	  if(request.readyState === XMLHttpRequest.DONE)
	  {
	      if(request.status === 200)
	      {
	          var counter = request.responseText;
	          var span = document.getElementById('num');
	          span.innerHTML = counter.toString();
	      }
	  }
	};
	
	request.open('GET', 'http://srivatsav.imad.hasura-app.io/counter',true);
	request.send(null);
	
	
};*/


/*var submit = document.getElementById('submit_btn'); 
submit.onclick = function(){
    
    
	// body...
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function (){
	  if(request.readyState === XMLHttpRequest.DONE)
	  {
	      if(request.status === 200)
	      {
	           var names =  request.responseText;
	           names = JSON.parse(names);
                 var list = '';
                for(var i=0;i<names.length;i++)
                {
                    list += '<li>'+names[i]+'</li>';
                }
    
                var ul = document.getElementById('nameList');
                ul.innerHTML = list;
	      }
	  }
	};
	var nameInput = document.getElementById('name');
    var name = nameInput.value;
	request.open('GET', 'http://srivatsav.imad.hasura-app.io/submit-name?name='+name,true);
	request.send(null);
	
	

  
};
*/
var login = document.getElementById('login_btn'); 
login.onclick = function(){
    
	// body...
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function (){
	  if(request.readyState === XMLHttpRequest.DONE)
	  {
	      if(request.status === 200)
	      {
	           alert('Logged in successfully..!!');
	           $("sessionName").html("<h3> Welcome! You are Logged in as </h3>");
    	       $("login").hide();
    	       $("register").hide();
    	       $("sessionName").show();
	           
	           
	      }
	      else if(request.status === 403)
	      {
	          alert('Username/password is incorrect');
	      }
	      else if(request.status === 500)
	      {
	          alert('server error');
	      }
	  }
	};
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	
    
	request.open('POST', 'http://srivatsav.imad.hasura-app.io/login',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({username: username,password: password}));
  
};

var register = document.getElementById('register_btn');
register.onclick= function(){
    var request = new XMLHttpRequest();
    var username = document.getElementById('usernamesignup').value;
	var password = document.getElementById('passwordsignup').value;
    
	request.open('POST', 'http://srivatsav.imad.hasura-app.io/create-user',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({username: username,password: password}));
	
	request.onreadystatechange = function (){
	  if(request.readyState === XMLHttpRequest.DONE)
	  {
	      if(request.status === 200)
	      {
	          request.session.auth = {userId: username};
	            alert('Registered successfully..!!');
	           $("sessionName").html("<h3> Welcome! You are Logged in as </h3>"+request.session.auth.userId);
    	       $("login").hide();
    	       $("register").hide();
    	       $("sessionName").show();
	      }
	  }
	}
}

function checkLoginStatus()
{
    var request = new XMLHttpRequest();
	request.open('GET', '/check-login',true);
	request.send(null);
	request.onreadystatechange = function (){
	  if(request.readyState === XMLHttpRequest.DONE)
	  {
	      if(request.status === 200)
	      {
	          
	      }
	  }
	}
    
}



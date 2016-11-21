
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
	           
		        document.getElementById("login").style.display = "none"	;		
		        document.getElementById("register").style.display = "none";
		        var sessionName = document.getElementById("sessionName");
		      	sessionName.innerHTML = '<h3>Welcome. You are logged in as '+request.responseText+'</h3>';
    	       		document.getElementById("sessionName").style.display = "block"	;	        
		        document.getElementById("logout_btn").style.display = "block";
		       
	           
	           
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
	         
	            alert('Registered successfully..!!');      			
    	       	     document.getElementById("login").style.display = "none"			
		        document.getElementById("register").style.display = "none"
		       var sessionName = document.getElementById("sessionName");
		      	sessionName.innerHTML = '<h3>Welcome. You are logged in as '+request.responseText+'</h3>';
    	       		document.getElementById("sessionName").style.display = "block"	;	    	       				        
		        document.getElementById("logout_btn").style.display = "block"
		        
	      }
	  }
	}
}

function invalidateSession()
{
	 var request = new XMLHttpRequest();
	 request.open('GET', '/logout',true);
	 request.send(null);
	request.onreadystatechange = function (){
	  if(request.readyState === XMLHttpRequest.DONE)
	  {
	      if(request.status === 200)
	      {
	          alert("Successfully Logged out.!");
		       document.getElementById("login").style.display = "block"			
		        document.getElementById("register").style.display = "block"
    	       		document.getElementById("sessionName").style.display = "none"		        
		        document.getElementById("logout_btn").style.display = "none"
		        
		        
		  
	      }
	  }
	}
}


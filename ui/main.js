
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

function validateLoginForm()
{
	var userName = document.getElementById("username").value.trim();
	if(userName==''){
		document.getElementById("login-span").innerHTML = "*Username cannot be empty."		
		return false;}	
	var passWord =document.getElementById("password").value;
	
	if(passWord=='')
	{
		document.getElementById("login-span").innerHTML = "*Password cannot be empty.";		
		return false;
	}
	
	return true;	
}
function validateSignUpForm()
{
	var userName = document.getElementById("usernamesignup").value.trim();
	if(userName==''){
		document.getElementById("signup-span").innerHTML = "*Username cannot be empty."		
		return false;}
	if(userName.length<8)
	{
		document.getElementById("signup-span").innerHTML = "*Username must be atleast 8 characters."		
		return false;
	}	
	var passWord =  document.getElementById("passwordsignup").value;
	if(passWord=='')
	{
		document.getElementById("signup-span").innerHTML = "*Password cannot be empty.";		
		return false;
	}
	if(passWord.length<8)
	{
		document.getElementById("signup-span").innerHTML = "*Password must be atleast 8 characters."		
		return false;
	}
	
	var confirmPassword = document.getElementById("confirmpasswordsignup").value;
	if(passWord!=confirmPassword)
	{
		document.getElementById("signup-span").innerHTML = "*Passwords do not match.";		
		return false;
	}
	
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var email = document.getElementById("emailsignup").value.trim();
	if(!email.match(mailformat))
	{
		document.getElementById("signup-span").innerHTML = "*invalid e-mail.";		
		return false;
	}
	return true;
}
var login = document.getElementById('login_btn'); 
login.onclick = function(){
	
	if(validateLoginForm())
	{
    
		// body...
		var request = new XMLHttpRequest();

		request.onreadystatechange = function (){
		  if(request.readyState === XMLHttpRequest.DONE)
		  {
		      if(request.status === 200)
		      {
			      var sessionContent = `<div id="sessionName" class="loginSessionLayer"><h3>Welcome. You are logged in as ${request.responseText}</h3</div>
							<button type="button" id="logout_btn" class="btn btn-default btn-sm logoutButton" onclick="invalidateSession()">
								<span class="glyphicon glyphicon-log-out"></span> Log out
							</button>	`;
				document.getElementById("success-alert").style.display = "block";
				document.getElementById("forms").style.display = "none"	;						
			      document.getElementById("sessionText").style.display="block";
			      document.getElementById("sessionText").innerHTML = sessionContent;
				



		      }
		      else if(request.status === 403)
		      {
			  document.getElementById("failure-alert").style.display = "block";
		      }
		      else if(request.status === 500)
		      {
			  alert('Internal server error');
		      }
		  }
		};
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;


		request.open('POST', 'http://srivatsav.imad.hasura-app.io/login',true);
		request.setRequestHeader('Content-Type','application/json');
		request.send(JSON.stringify({username: username,password: password}));
	}
  
};

var register = document.getElementById('register_btn');
register.onclick= function(){
	if(validateSignUpForm())
	{
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

			    document.getElementById("successsignup-alert").style.display = "block";    			
			     document.getElementById("login").style.display = "none"			
				document.getElementById("register").style.display = "none"
			       var sessionName = document.getElementById("sessionName");
				sessionName.innerHTML = '<h3>Welcome. You are logged in as '+request.responseText+'</h3>';
				document.getElementById("sessionName").style.display = "block"	;	    	       				        
				document.getElementById("logout_btn").style.display = "block"

		      }
			   else if(request.status === 500)
		      {
			  document.getElementById("failuresignup-alert").style.display = "block";
		      }
		  }
		}
	}
};
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
		      document.getElementById("success-alert").style.display = "none";
		      document.getElementById("successsignup-alert").style.display = "none";
    	       		document.getElementById("sessionText").style.display = "none";		        
		      document.getElementById("forms").style.display = "block";
		      
		        
		        
		  
	      }
	  }
	}
}


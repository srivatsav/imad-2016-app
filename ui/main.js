
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


var submit = document.getElementById('submit_btn'); 
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
	           var articleReq = new XMLHttpRequest();
	           articleReq.open('GET','http://srivatsav.imad.hasura-app.io/articles',true);
	           articleReq.send(null);
	           
    	          if(articleReq.readyState === XMLHttpRequest.DONE)
    	         {
            	      if(articleReq.status === 200)
            	      {
                    	 var htmlTemp = `<html>
                                                <head>
                                                    <meta name="viewport" content="width=device-width, initial-scale=1">
                                                    <title>
                                                        Articles
                                                    </title>
                                                   <link href="/ui/style.css" rel="stylesheet"/>
                                                    
                                                </head>
                                                <body>
                                                <div class="container">`
            	          var articleArray = JSON.parse(articleReq.response);
            	          for (var i=0;i<articleArray.length;i++)
            	          {
            	             htmlTemp += buildTemplate(articleArray[i]);
            	          }
            	          htmlTemp += `</div>
            	                   </body>
            	                   </html>`
            	       $("#tab3Content").children("articleContent").append(htmlTemp);
            	       $("#tab3Content").children("loginContent").hide();
            	       $("#tab3Content").children("articleContent").show();
            	      }
            	      else
            	      {
            	          
            	      }
    	         }
	           
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
    console.log(username);
    console.log(password);
	request.open('POST', 'http://srivatsav.imad.hasura-app.io/login',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({username: username,password: password}));
  
};


function buildTemplate(data)
{
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = 
                `<hr/>
                <h3>${heading}</h3>
                <div>${date.toDateString()}</div>
                <div>
                    ${content}
                </div>
                </br>
                <hr/>`
           
    return htmlTemplate;
}
 function loadContent(tab_selector)
	  {
	      if(tab_selector=='#tab1')
	      {
	          $("#tab2Content").hide();
	          $("#tab3Content").hide();
	          $("#tab4Content").hide();
	          $("#tab1Content").load("ui/home.html");
	          $("#tab1Content").show();
	      }
	     else if(tab_selector=='#tab2')
	      {
	          $("#tab3Content").hide();
	          $("#tab1Content").hide();
	          $("#tab4Content").hide();
	          $("#tab2Content").load("ui/about.html");
	          $("#tab2Content").show();
	      }
	      else if(tab_selector=='#tab3')
	      {
	          $("#tab1Content").hide();
	          $("#tab2Content").hide();
	          $("#tab4Content").hide();
            loadArticleRespText();
	         
	      }
	      else if(tab_selector=='#tab4')
	      {
	          $("#tab1Content").hide();
	          $("#tab2Content").hide();
	          $("#tab3Content").hide();
		        checkLoginStatus();
	          
	      }
	  }
    
    
    function loadArticleRespText()
    {
      var articleRespText;
		      var articleReq = new XMLHttpRequest();
	           articleReq.open('GET','http://srivatsav.imad.hasura-app.io/articles',true);
	           articleReq.send(null);
	           articleReq.onreadystatechange = function ()
	               {
	           if(articleReq.readyState === XMLHttpRequest.DONE)
	              {
            	      if(articleReq.status === 200)
            	      {
            	         
            	          articleRespText = articleReq.responseText;
            	          
            	      }
            	      else
            	      {      	          articleRespText = "Internal Server error";
            	      }
	              }
	               };                 
            $("#tab3Content").html(articleRespText);
	          $("#tab3Content").show();
}

function checkLoginStatus()
{
   var checkLoginReq = new XMLHttpRequest();
	          checkLoginReq.open('GET','http://srivatsav.imad.hasura-app.io/check-login',true);
	          checkLoginReq.send(null);
		  checkLoginReq.onreadystatechange = function ()
	               {
	           if(checkLoginReq.readyState === XMLHttpRequest.DONE)
	              {
			      if(checkLoginReq.status === 200)
			      {
				      console.log(checkLoginReq.responseText);
				      var respText = checkLoginReq.responseText;
				      if(respText != 'false')
				      {
					      alert("You are already logged in as: "+ respText);
					      document.getElementById("login").style.display = "none";
					      document.getElementById("register").style.display = "none";
					      var sessionName = document.getElementById("sessionName");
					      sessionName.innerHTML = sessionName.innerHTML + respText;
					      document.getElementById("sessionName").style.display = "block";
					      document.getElementById("logout_btn").style.display = "block";
					      $("#tab4Content").show();
					      
				      }
				      else
				      {					      
					      $("#tab4Content").load("/form.html");
	          				$("#tab4Content").show();
				      }
			      }
		      }
		  }
 }

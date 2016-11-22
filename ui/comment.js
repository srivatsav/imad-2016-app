/*var commentButton = document.getElementById('cmnt_btn');
commentButton.onclick(function(){


});
*/

function commentHandler(id)
{
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function (){
	  if(request.readyState === XMLHttpRequest.DONE)
	  {
	      if(request.status === 200)
	      {
		      var respText = request.responseText;
		      if(respText!='false')
		      {
			     
			       window.location.href = '/post/'+id; 
		      }
		      else
		      {
			      alert("Please Login to comment.");
		      }		     
	           
              
	      }
	  }
	};
	
	request.open('GET', 'http://srivatsav.imad.hasura-app.io/check-login',true);
	request.send(null);
	
}


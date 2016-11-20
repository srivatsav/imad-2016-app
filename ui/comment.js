/*var commentButton = document.getElementById('cmnt_btn');
commentButton.onclick(function(){


});
*/
var post_id,post_date,post_content;
var post;

function commentHandler()
{
	alert("commentButton clicked..!");

	 post_id = document.getElementById("post_id").innerHTML;
	 post_date = document.getElementById("post_date").innerHTML;
	 post_content = document.getElementById("post_content").innerHTML;

	 post =` <hr/>
		<h3>${post_id}</h3>
		<div>${post_date}</div>
		<div>
			${post_content}
		</div>
	</br>
	<hr/>`;
	window.location.href="/article.html"
}


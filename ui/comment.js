/*var commentButton = document.getElementById('cmnt_btn');
commentButton.onclick(function(){


});
*/

function commentHandler(id)
{ 
	window.location.href = '/post/'+id; 
	
}
function readMore()
{
	$('#readMore').click(function(){
    $('.read').toggleClass('read-less');
    if($(this).text()=='Show Less') $(this).text('Show More'); 
    else  $(this).text('Show Less'); 
});
}


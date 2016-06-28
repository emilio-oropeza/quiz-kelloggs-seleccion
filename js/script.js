$(document).ready(function(){
	$("article").height(screenHeight());
	$(window).resize(function(){
		$("article").height(screenHeight());
	});
	barsDisapear();
	$("#preguntas").quizk();
});


function barsDisapear(){
	$("#nav-bar-stats").remove();
	$("#mobile-horizontal-menu").remove();
	//$("#top-bar-wrapper").remove();
	//$("#mobilemenu").remove();
}
function screenHeight(){
	var height = $(window).height();
	return height - 60;
}
function animateScroll(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 1500);
    return false;
}

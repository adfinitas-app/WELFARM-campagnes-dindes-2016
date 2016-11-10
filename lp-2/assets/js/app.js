$(document).ready(function() {
	resizeVideo();
});

$(window).resize(function() {
	resizeVideo();
});


function resizeVideo() {
	$('#container-video-header').css({height: $(window).innerHeight() - $('#row-header').innerHeight()})
}

$(function() {
	$('.box-don').hover(function() {
		$('.btn-custom').eq($(this).index()).css('background-color', '#000000');
	}, function() {
		$('.btn-custom').css('background-color', '#f29400');
	});
});



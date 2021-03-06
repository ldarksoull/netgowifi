/// scroll to top ///
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			$('a[href^="#top"]').show();
	} else {
			$('a[href^="#top"]').hide();
	}
}
$(function(){
	$('a[href^="#top"]').bind('click.smoothscroll', function(){
		var target = $(this).attr('href'),
			bl_top = $(target).offset().top;
		$('body, html').animate({scrollTop: bl_top}, 700);
		return false;
	});
});
/// sidebar ///
$('.sidebar-btn').on('click', function(){
	$(this).toggleClass('active')
	$('.sidebar').toggleClass('active')
	$('.overlay').toggleClass('active')
})
$('.overlay').on('click', function(){
	$('.overlay').removeClass('active')
	$('.sidebar').removeClass('active')
	$('.sidebar-btn').removeClass('active')
})
/// menu ///
$('.call-btn').on('click',function(){
	if($('.mobile-menu, .header-btn__menu').hasClass('active')){
		$('.mobile-menu,.header-btn__menu,.header-btn').toggleClass('active')
	}
})
$('.header-btn').on('click',function(){
	$(this).toggleClass('active')
	$('.mobile-menu, .header-btn__menu').toggleClass('active')
})
$('.products-btn').on('click', function(){
	$('.sidebar').toggleClass('active')
	$('.products-btn').toggleClass('active')
	$('.sidebar').slideToggle('slow')
})

$('.panel-collapse').on('show.bs.collapse', function () {
	$(this).siblings('.panel-head').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
	$(this).siblings('.panel-head').removeClass('active');
});

///video-btn///
$(document).ready(function() {

	// Gets the video src from the data-src on each button
	
	var $videoSrc;  
	$('.youtube-btn').click(function() {
			$videoSrc = $(this).data( "src" );
			console.log($videoSrc);
	});
	
	// when the modal is opened autoplay it  
	$('#youtube-modal').on('shown.bs.modal', function (e) {		
	// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
	$("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=1&amp;modestbranding=1&amp;autoplay=1&amp;allowfullscreen"); 
	})		
	// stop playing the youtube video when I close the modal
	$('#youtube-modal').on('hide.bs.modal', function (e) {
			// a poor man's stop video
			$("#video").attr('src',$videoSrc); 
	}) 	
	// document ready  
	});

/// calculator ///
/// slider range ///
var cost = $("#range-cost").slider({
		step: 5000,
		min: 0, 
		max: 70000,
		tooltip: 'hide'
});
$("#range-connections").slider({
		step: 1,
	 	min: 10, 
		max: 40,
		tooltip: 'hide'
		 
});
$("#range-month").slider({
		step: 1,
	 	min: 1, 
		max: 12,
		tooltip: 'hide'
});
$("#range-price").slider({
		step: 500,
	 	min: 1000, 
		max: 5000,
		tooltip: 'hide'
});

$("#range-cost, #range-connections, #range-month, #range-price").on("change", function() {
	var cost = $('#range-cost').val();
	var connect = $('#range-connections').val();
	var numOfMonth = $('#range-month').val();
	var price = $('#range-price').val();
	var month;
	
		if(( numOfMonth == '2') || (numOfMonth == '3') || (numOfMonth == '4')){
			month = 'месяца'
		}
		else if(numOfMonth == '1'){
			month = 'месяц'
		}
		else{
			month = 'месяцев'
		}
	var total = connect * price * numOfMonth - cost
	function a(total) {
		total += "";
		
		if(total > 0){
			total = new Array(4 - total.length % 3).join("U") + total;
			return total.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
		}
		else{
			return total
	}
};
	$('#result').text(a(total) + " " + "рублей.");
	$('#total-month').text(numOfMonth + " " + month)
	$('#cost').text(cost)
	$('#connect').text(connect)
	$('#numOfMonth').text(numOfMonth)
	$('#price').text(price)
});



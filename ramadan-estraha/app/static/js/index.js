/*

With The Name Of God

_ Ali Almohaya (AKA Almo7aya) 18/May/1017 _
_ Hotspot Temp _
_ https://fb.com/Almo7aya _

*/

// the masbasa plugin


$(function () {
	//dom is ready lets go
	
	// focus on the input when start
	
	(function ($) {

	var $add = $('#add'),
		$reset = $('#reset'),
		$show = $('#shower');
	$add.on('click', function () {
		var nowCount = Number.parseInt($show.html());
		$show.html(nowCount + 1);
	});
	$reset.on('click', function () {
		var nowCount = Number.parseInt($show.html());
		$show.html(0);
	});

})(jQuery);


//the nav scolles

(function ($) {
	
	// for home page
	if ($('body#home').length) {
		var stLoginFrom = $(".login-form").offset().top - 10,
		    stQuran = $('.quran').offset().top - 10,
			stPrices = $('.prices').offset().top - 10,
			stAthdan = $('.athdan').offset().top - 10,
			stMasbaha = $('.masbaha').offset().top - 10,
			stSellPoints = $('.sell-points').offset().top - 10,
			stAthkar = $('.athkar').offset().top - 10;

		var $links = $('header').find('li');

		$links.on('click', function () {

			var index = $(this).index();

			switch (index) {

				case 0:
					$('html, body').animate({
						scrollTop: stLoginFrom
					}, 600);
					break;
				
				case 1:
					$('html, body').animate({
						scrollTop: stQuran
					}, 1100);
					break;

				case 2:
					$('html, body').animate({
						scrollTop: stPrices
					}, 1100);
					break;
					
				case 3:
					$('html, body').animate({
						scrollTop: stAthdan
					}, 1100);
					break;

				case 4:
					$('html, body').animate({
						scrollTop: stMasbaha
					}, 1100);
					break;

				case 5:
					$('html, body').animate({
						scrollTop: stSellPoints
					}, 1100);
					break;

				case 6:
					$('html, body').animate({
						scrollTop: stAthkar
					}, 1100);
					break;
					
				case 7:
					$('html, body').animate({
						scrollTop: stAthkar
					}, 1100);
					break;
					
			}
		});

	}
	
	 // for the status page
	 
	 
	if ($('body#status').length) {
		var stQuran = $('.quran').offset().top - 10,
			stAthdan = $('.athdan').offset().top - 10,
			stMasbaha = $('.masbaha').offset().top - 10,
			stAthkar = $('.athkar').offset().top - 10;

		var $links = $('header').find('li');


		$links.on('click', function () {

			var index = $(this).index();

			switch (index) {

				case 0:
					$('html, body').animate({
						scrollTop: stQuran
					}, 1100);
					break;

				case 1:
					$('html, body').animate({
						scrollTop: stAthdan
					}, 1100);
					break;

				case 2:
					$('html, body').animate({
						scrollTop: stMasbaha
					}, 1100);
					break;

				case 3:
					$('html, body').animate({
						scrollTop: stAthkar
					}, 1100);
					break;
			}
		});

	}
	
	
	var $top = $('span#top');

	$top.on('click', function () {

		$('html, body').animate({
			scrollTop: 0
		}, 800);

	});


	$(window).on('scroll', function () {
		if ($(this).scrollTop() >= 250) {
			$top.addClass('back');
		} else {
			$top.removeClass('back');
		}
	});

})(jQuery);
	

//the hijri date

if ($("#date").length) {
	
	$("#date").text(writeIslamicDate());
}


});

jQuery(function($) {
  "use strict";
	
	/* Loading Js*/
	function loader() {
		$(window).on('load', function () {
			$('#ctn-preloader').addClass('loaded');
			$("#loading").fadeOut(1000);
			// Una vez haya terminado el preloader aparezca el scroll

			if ($('#ctn-preloader').hasClass('loaded')) {
				// Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
				$('#preloader').delay(1400).queue(function () {
					$(this).remove();
				});
			}
		});
	}
	loader();

	/* Mobile Menu */
	jQuery(".nav.navbar-nav li a").on("click", function() { 
		jQuery(this).parent("li").find(".utf_dropdown_menu").slideToggle();
		jQuery(this).find("li i").toggleClass("fa-angle-down fa-angle-up");
	});

	$('.nav-tabs[data-toggle="tab-hover"] > li > a').hover( function(){
    	$(this).tab('show');
	});
	
	/* Site search */
	$('.utf_nav_search').on('click', function () {
		$('.utf_search_block').fadeIn(350);
    });

	$('.utf_search_close').on('click', function(){
		$('.utf_search_block').fadeOut(350);
	});

	$('.navbar-nav .menu-dropdown').on('click', function (event) {
		event.preventDefault();
		event.stopPropagation();
		$(this).siblings().slideToggle();
	});
	
	$('.nav-tabs[data-toggle="tab-hover"] > li > a').hover( function(){
    	$(this).tab('show');
	});

	/*Fixed Header **/
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 250) {
		   $('.utf_sticky').addClass('sticky fade_down_effect');
		} else {
		   $('.utf_sticky').removeClass('sticky fade_down_effect');
		}
	});	
	
  	/* Owl Carousel */
	
  	//Trending Slide
  	$(".trending-slide").owlCarousel({
		loop:true,
		animateIn: 'fadeIn',
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		nav:true,
		margin:30,
		dots:false,
		mouseDrag:false,
		slideSpeed:500,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items : 1,
		responsive:{
			0: {
				items:1,
			},
			600: {
				items:1,
			}			
		}
	});

  	//Utf Featured Slide
	$(".utf_featured_slider").owlCarousel({
		loop:true,
		animateOut: 'fadeOut',
		autoplay:false,
		autoplayHoverPause:true,
		nav:true,
		margin:0,
		dots:false,
		mouseDrag:true,
		touchDrag:true,
		slideSpeed:500,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items : 1,
		responsive:{
		  0:{
				items:1
		  },
		  600:{
				items:1
		  }
		}
	});
	
	//Utf Latest News Slide
	$(".utf_latest_news_slide").owlCarousel({
		loop:false,
		animateIn: 'fadeInLeft',
		autoplay:false,
		autoplayHoverPause:true,
		nav:true,
		margin:30,
		dots:false,
		mouseDrag:false,
		slideSpeed:500,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items : 3,
		responsive:{
		  0:{
				items:1
		  },
		  600:{
			    items:2
		  },
		  768:{
			    items:2
		  },
		  992:{
			    items:3
		  },
		  1200:{
			    items:4
		  },
		}
	});
	
	//Utf Latest News Slide2
	$(".utf_latest_news_slide2").owlCarousel({
		loop:false,
		animateIn: 'fadeInLeft',
		autoplay:false,
		autoplayHoverPause:true,
		nav:true,
		margin:30,
		dots:false,
		mouseDrag:false,
		slideSpeed:500,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items : 3,
		responsive:{
		  0:{
				items:1
		  },
		  600:{
			    items:2
		  },
		  768:{
			    items:2
		  },
		  992:{
			    items:3
		  },
		  1200:{
			    items:3
		  },
		}
	});

	//Utf Latest More News Slide
	$(".utf_more_news_slide").owlCarousel({
		loop:false,
		autoplay:false,
		autoplayHoverPause:true,
		nav:false,
		margin:30,
		dots:true,
		mouseDrag:false,
		slideSpeed:500,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items : 1,
		responsive:{
		  0:{
				items:1
		  },
		  600:{
				items:1
		  }
		}
	});

	//Utf Post Slide	
	$(".utf_post_slide").owlCarousel({
		loop:true,
		animateOut: 'fadeOut',
		autoplay:false,
		autoplayHoverPause:true,
		nav:true,
		margin:30,
		dots:false,
		mouseDrag:false,
		slideSpeed:500,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items : 1,
		responsive:{
		  0:{
				items:1
		  },
		  600:{
				items:1
		  }
		}
	});

	/* Popup */
	$(document).ready(function(){
		$(".gallery-popup").colorbox({rel:'gallery-popup', transition:"fade", innerHeight:"500"});
		$(".popup").colorbox({iframe:true, innerWidth:600, innerHeight:400});
	});
	
	/* Back to top */
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			 $('#back-to-top').fadeIn();
		} else {
			 $('#back-to-top').fadeOut();
		}
	});
	
	// scroll body to 0px on click
	$('#back-to-top').on('click', function () {
		 $('#back-to-top').tooltip('hide');
		 $('body,html').animate({
			  scrollTop: 0
		 }, 800);
		 return false;
	});
	$('#back-to-top').tooltip('hide');	

	/* Newsletter Subscription Functionality */
	function initNewsletter() {
		// Prevent default browser tooltip and handle with custom UI
		$('.utf_newsletter_form form').attr('novalidate', 'novalidate');

		$(document).on('submit', '.utf_newsletter_form form', function (e) {
			e.preventDefault();

			var $form = $(this);
			var $block = $form.closest('.utf_newsletter_block');
			var $intro = $block.find('.utf_newsletter_introtext');
			var $formContainer = $form.closest('.utf_newsletter_form');
			var $input = $form.find('input[type="email"]');
			var $button = $form.find('button');
			var email = $.trim($input.val());

			// Remove any previous message
			$block.find('.utf_newsletter_msg').remove();

			// Validation: Empty check
			if (!email) {
				showNewsletterMsg($form, 'Please enter your email address.', 'error');
				shakeInput($input);
				$input.focus();
				return;
			}

			// Validation: Email format regex
			var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if (!emailRegex.test(email)) {
				showNewsletterMsg($form, 'Please enter a valid email address (e.g. name@example.com).', 'error');
				shakeInput($input);
				$input.focus();
				return;
			}

			// Retrieve existing subscribers
			var subscribers = [];
			try {
				subscribers = JSON.parse(localStorage.getItem('codenexon_subscribers')) || [];
			} catch (err) {
				subscribers = [];
			}

			// Check if already subscribed
			var alreadySubscribed = subscribers.some(function (sub) {
				return sub.email && sub.email.toLowerCase() === email.toLowerCase();
			});

			if (alreadySubscribed) {
				showNewsletterMsg($form, 'You are already subscribed with this email! Thank you for being a loyal reader.', 'info');
				return;
			}

			// Show loading state
			var originalBtnHtml = $button.html();
			$button.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Subscribing...');

			// Optional external endpoint if configured
			var endpoint = $form.attr('data-endpoint') || window.CODENEXON_NEWSLETTER_ENDPOINT || null;
			if ($form.attr('action') && $form.attr('action') !== '#' && $form.attr('action').indexOf('http') === 0) {
				endpoint = $form.attr('action');
			}

			function completeSubscription() {
				// Store in localStorage
				subscribers.push({
					email: email,
					date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
					timestamp: new Date().toISOString()
				});
				try {
					localStorage.setItem('codenexon_subscribers', JSON.stringify(subscribers));
				} catch (e) {
					console.warn('Could not save to localStorage', e);
				}

				// Transition to success card
				$intro.slideUp(300);
				$formContainer.slideUp(300, function () {
					var safeEmail = $('<div>').text(email).html();
					var successHtml = '' +
						'<div class="utf_newsletter_success">' +
						'  <div class="utf_newsletter_success_icon"><i class="fa fa-check-circle"></i></div>' +
						'  <h4>You\'re Subscribed!</h4>' +
						'  <p>Thank you for joining CodeNexon! We\'ve registered <strong>' + safeEmail + '</strong> for our weekly tech digest.</p>' +
						'  <div class="utf_newsletter_badge"><i class="fa fa-shield"></i> No spam. Unsubscribe anytime.</div>' +
						'  <div class="utf_newsletter_reset_wrap">' +
						'    <button type="button" class="utf_newsletter_reset_btn">Subscribe another email</button>' +
						'  </div>' +
						'</div>';

					$block.append(successHtml);

					// Restore button state for future uses
					$button.prop('disabled', false).html(originalBtnHtml);
					$input.val('');
				});
			}

			if (endpoint) {
				// If third-party webhook/formspree URL provided
				fetch(endpoint, {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email: email })
				})
				.then(function () {
					completeSubscription();
				})
				.catch(function () {
					// Even if network fails on external mock, save locally
					completeSubscription();
				});
			} else {
				// Client-side realistic delay
				setTimeout(function () {
					completeSubscription();
				}, 600);
			}
		});

		// Reset button handler to subscribe another email
		$(document).on('click', '.utf_newsletter_reset_btn', function () {
			var $block = $(this).closest('.utf_newsletter_block');
			var $success = $block.find('.utf_newsletter_success');
			var $intro = $block.find('.utf_newsletter_introtext');
			var $formContainer = $block.find('.utf_newsletter_form');

			$success.fadeOut(250, function () {
				$success.remove();
				$intro.slideDown(250);
				$formContainer.slideDown(250, function () {
					$block.find('input[type="email"]').focus();
				});
			});
		});

		function showNewsletterMsg($form, message, type) {
			var $block = $form.closest('.utf_newsletter_block');
			$block.find('.utf_newsletter_msg').remove();

			var icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
			var msgHtml = '<div class="utf_newsletter_msg utf_newsletter_' + type + '"><i class="fa ' + icon + '"></i> ' + message + '</div>';
			$form.after(msgHtml);
		}

		function shakeInput($input) {
			$input.addClass('utf_newsletter_shake');
			setTimeout(function () {
				$input.removeClass('utf_newsletter_shake');
			}, 450);
		}
	}
	initNewsletter();

	// Global helpers for site admin / owner to view and export subscribers
	window.getCodeNexonSubscribers = function () {
		try {
			var list = JSON.parse(localStorage.getItem('codenexon_subscribers')) || [];
			console.log('%cCodeNexon Subscribers (' + list.length + ' total):', 'color:#ec0000; font-weight:bold; font-size:14px;');
			console.table(list);
			return list;
		} catch (e) {
			return [];
		}
	};

	window.exportCodeNexonSubscribers = function () {
		var list = window.getCodeNexonSubscribers();
		if (!list.length) {
			alert('No newsletter subscribers found yet.');
			return;
		}
		var csvContent = "data:text/csv;charset=utf-8,Email,Date,Timestamp\n" +
			list.map(function (e) {
				return '"' + (e.email || '') + '","' + (e.date || '') + '","' + (e.timestamp || '') + '"';
			}).join("\n");
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "codenexon_subscribers_" + new Date().toISOString().slice(0, 10) + ".csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
});
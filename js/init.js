/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* Theme (see js/theme.js — auto follows OS until user toggles)
------------------------------------------------------ */

   function syncThemeToggle() {
      var PT = window.PortfolioTheme;
      if (!PT) return;
      var t = document.documentElement.getAttribute('data-theme') || 'light';
      var btn = document.getElementById('theme-toggle');
      if (!btn) return;
      var isDark = t === 'dark';
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      var mode = PT.getMode();
      btn.setAttribute(
         'title',
         mode === 'auto'
            ? 'Theme: matching system (Shift+click locks a choice)'
            : 'Theme: saved choice (Shift+click to match system again)'
      );
   }

   if (window.PortfolioTheme) {
      window.PortfolioTheme.apply();
   }
   syncThemeToggle();

   var colorSchemeMq = window.matchMedia('(prefers-color-scheme: dark)');
   function onSystemThemeChange() {
      if (!window.PortfolioTheme || window.PortfolioTheme.getMode() !== 'auto') {
         return;
      }
      window.PortfolioTheme.apply();
      syncThemeToggle();
   }
   if (colorSchemeMq.addEventListener) {
      colorSchemeMq.addEventListener('change', onSystemThemeChange);
   } else if (colorSchemeMq.addListener) {
      colorSchemeMq.addListener(onSystemThemeChange);
   }

   $('#theme-toggle').on('click', function (e) {
      if (!window.PortfolioTheme) return;
      if (e.shiftKey) {
         e.preventDefault();
         window.PortfolioTheme.setMode('auto');
         syncThemeToggle();
         return;
      }
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      window.PortfolioTheme.setMode(next);
      syncThemeToggle();
   });

/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {
      var nav = $('#nav-wrap');
      if ($(window).scrollTop() > 8) {
         nav.addClass('opaque');
      } else {
         nav.removeClass('opaque');
      }
	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   $('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
               '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      $.ajax({

	      type: "POST",
	      url: "inc/sendEmail.php",
	      data: data,
	      success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();   
            }
            // There was an error
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
            }

	      }

      });
      return false;
   });


});









;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {

			//Typed plugin	
			$(function(){
	        $("#typed").typed({
	            stringsElement: $('#typed-strings'),
	            typeSpeed: 20,
	            backDelay: 500,
	            loop: false
	        });
		});

		$('.intro h2').addClass('animate');	

		//Fix header on scroll
		$win.on('load scroll', function() {
      		$('.header').toggleClass('fixed', $win.scrollTop() > 111);  
      
    	});

		//Button arrow down scroll animation
		$('.btn-scroll-down').on('click', function(e){
			e.preventDefault();
			var target_offset = $("#about").offset().top;

			$("html, body").animate({scrollTop: target_offset}, 1500);
		});

		//activate nav trigger
		$('.nav-trigger').on('click',function(e){
			e.preventDefault();

			$(this).toggleClass('active');
			$('nav').toggleClass('mobile');
		});

		//Swap engentive image on mobile
		$win.resize(function() {
		    /*If browser resized, check width again */
		    if ($win.width() < 768) {
		     	$('.responsive-image').append($('.engentive-image-holder'));	
		    } 
		 });

		//Add counter
		var a = 0;
		$win.scroll(function() {
			
		  var oTop = $('.section-statistics').offset().top - window.innerHeight;
		  if (a == 0 && $win.scrollTop() > oTop) {
		    $('.counter').each(function () {
			
			    $(this).prop('Counter',0).animate({
			        Counter: $(this).text()
			    }, {
			        duration: 3000,
			        easing: 'swing',
			        step: function (now) {
			            $(this).text(Math.ceil(now).toLocaleString('en'));
			        }
			    });
			
		});
		    a = 1;
		  }

		});

		//Navigation scroll to anchor
		$(".nav a, .logo, .logo-small").on('click', function(e){
			e.preventDefault();
			$this = $(this);
			
		    //get the full url - like mysitecom/index.htm#home
		    var full_url = this.href;

		    //split the url by # and get the anchor target name - home in mysitecom/index.htm#home
		    var parts = full_url.split("#");
		    var trgt = parts[1];

		    //get the top offset of the target anchor
		    var target_offset = $("#"+trgt).offset();
		    var target_top = target_offset.top;

		    //goto that anchor by setting the body scroll top to anchor top
		    $('html, body').animate({scrollTop:target_top}, 1500);

		});

		// Cache selectors
		var lastId,
		    topMenu = $(".nav ul"),
		    topMenuHeight = topMenu.outerHeight()*4,


		    // All list items
		    menuItems = topMenu.find("a"),
		    // Anchors corresponding to menu items
		    scrollItems = menuItems.map(function(){
		      var item = $($(this).attr("href"));
		      if (item.length) { return item; }
		    });
		    

		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		menuItems.click(function(e){
		  var href = $(this).attr("href"),
		      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		  $('html, body').stop().animate({ 
		      scrollTop: offsetTop
		  }, 1500);
		  e.preventDefault();
		});

		// Bind to scroll
		$win.scroll(function(){
		   // Get container scroll position
		   var fromTop = $(this).scrollTop()+topMenuHeight;
		   
		   // Get id of current scroll item
		   var cur = scrollItems.map(function(){
		     if ($(this).offset().top < fromTop)
		       return this;
		   });
		   // Get the id of the current element
		   cur = cur[cur.length-1];
		   var id = cur && cur.length ? cur[0].id : "";
		   
		   if (lastId !== id) {
		       lastId = id;
		       // Set/remove current class
		       menuItems
		         .parent().removeClass("current")
		         .end().filter("[href='#"+id+"']").parent().addClass("current");
		   }                   
		});

		  $win.scroll(function() {
			 var winT = $win.scrollTop();
			 performanceData(winT)
			 
			 function performanceData(topPosition) {
				$('.js-animation').each(function() {
				var element = $(this),
				winH = $win.height()/1.5

				for (var i = element.length - 1; i >= 0; i--) {
						var currentElementTop = element.eq(i).offset().top - winH - 20

						if ( topPosition > currentElementTop ) {
							element.addClass('animate')
						} else {
							element.removeClass('animate')
						};
					};
				})
			}
		});

	});	
})(jQuery, window, document);

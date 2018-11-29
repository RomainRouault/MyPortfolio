$(function() {

  //init at 0
  var position = $(window).scrollTop();
 
  $(window)

  //hide/show big logo hero part
  .scroll(function() {
    var winTop = $(window).scrollTop();
    if (winTop >= 30) {
      $("body").addClass("sticky-shrinknav-wrapper");
      $("#logo").removeClass('hero');

    } else{
      $("body").removeClass("sticky-shrinknav-wrapper");
      $("#logo").addClass('hero');
    }
  })

  //hide/show menu nav
  .scroll(function() {
    //
    var scroll = $(window).scrollTop();
    if (scroll > position && scroll >= 350) {
      $(".sticky-shrinknav-header").addClass("hide-nav");
      $("#hexa-int").removeClass("theyseemerollin");
    } else{
      $(".sticky-shrinknav-header").removeClass("hide-nav");
      $("#hexa-int").addClass("theyseemerollin");
    }
    position = scroll;
  })

	//hide/show toggling events for responsive menu
	$(".menu-icon").click(function(){
		//hide/show title header
		$(".sticky-shrinknav-header-title-wrapper").toggle();
		$(this).toggleClass("active");
		//hide show the menu
		$(".sticky-shrinknav-header").toggleClass("toggled-menu");
		//they hatin
		$("#hexa-int-small").toggleClass("theyseemerollin");
	});
	//hide menu
	$(".menu-icon.active").click(function(){
		$("body").addClass("sticky-shrinknav-wrapper");
	});


	//hide hero if url load with ash (anchor)
	if (window.location.hash){
		$(".sticky-shrinknav-header").addClass("hide-nav");
	}



});
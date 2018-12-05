$(function() {

  // Cache selectors
  var lastId,
      header = $(".sticky-shrinknav-header"),
      //body
      body =  $('body'),
      //sticky menu dekstop
      stickyMenu = $(".sticky-shrinknav-menu"),
      stickyMenuHeight = stickyMenu.outerHeight(),
      // All list items
      menuItems = header.find("a"),
      //Anchors of the menu
       anchorsMenuItems = menuItems.map(function(){
        var item = $(this).attr("href");
        return item;
      });
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item;}
      });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    //get current height on click
    headerHeight = header.outerHeight();
    //get current scroll
    var scroll = $(window).scrollTop();


    //if the hero header is show/we are at the top of the page on large device
    if (headerHeight > stickyMenuHeight && stickyMenu.is(":visible"))
    {
      //200 = the height lost by the body when header shrinked
      headerHeight = 200;
    }

    //if we are on a small device 
    if($('.menu-icon').is(":visible"))
    {
      //toggle the menu after click on an item menu
      $(".menu-icon").click();

      //if we are not at the top of the page
      if(scroll >= 50)
      {
          headerHeight = 0;
      }
    }



    var href = $(this).attr("href");

    //get the offset of the element calcul 
      var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top;
      //if the offset is below the menu after header had shrinked, so show the menu lower
      if (offsetTop > scroll && scroll > 50)
      {
        console.log("coucou");
        var offsetTopFinal = offsetTop+headerHeight-1;
      }
      else
      {
        var offsetTopFinal = offsetTop-headerHeight+1;
      }
      //smooth scroll
      $('html, body').stop().animate({ 
          scrollTop: offsetTopFinal
      }, 500);

    e.preventDefault();
  });


  // Bind to scroll
  $(window).scroll(function(){
      headerHeight = header.outerHeight();
     // Get container scroll position
     var fromTop = $(this).scrollTop()+headerHeight;
     
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
         // Set/remove active class to menu items
         menuItems
           .parent().removeClass("active")
           .end().filter("[href='#"+id+"']").parent().addClass("active");
        // Set/remove active class to body section
        $('section').removeClass("active");
        if (id)
        {
          $("#"+id).addClass("active");
        }
     }                   
  });

  //hide hero if url load with ash (anchor)
  if (window.location.hash){
    queryHash = window.location.hash;
    if ($.inArray(queryHash, anchorsMenuItems) !== -1)
    {
      $(".sticky-shrinknav-header").addClass("hide-nav");
    }
  }

});
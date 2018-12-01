$(function() {

  // Cache selectors
  var lastId,
      header = $(".sticky-shrinknav-header"),
      //body
      body =  $('body'),
      initialBodyHeight = body.outerHeight(),
      //sticky menu dekstop
      stickyMenu = $(".sticky-shrinknav-menu"),
      stickyMenuHeight = stickyMenu.outerHeight(),
      //sticky menu small device
      mobileStickyMenu = $("#top-header-small-device"),
      mobileStickyMenuHeight = mobileStickyMenu.outerHeight(),
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
    //get current height of the body
    currentBodyHeight = body.outerHeight();


    //if the hero header is show/we are at the top of the page on large device
    if (headerHeight > stickyMenuHeight && stickyMenu.is(":visible"))
    {
      //subtract the total height of the menu (twice : at top page and after scroll)
      headerHeight = headerHeight-(stickyMenuHeight*2);
    }

    //if we are on a small device 
    if($('.menu-icon').is(":visible"))
    {
      //toggle the menu after click on an item menu
      $(".menu-icon").click();

      //if we are at the top of the page
      if(currentBodyHeight == initialBodyHeight)
      {
          // 200 = the height lost by the body when top header is shriking
          headerHeight = 200;
      }
      //we are not at the top
      else{
        // just substract the height of the sticky menu
        headerHeight = mobileStickyMenuHeight-10;
      }
    }

    var href = $(this).attr("href");

    //get the offset of the element and calcul with
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-headerHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
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
         // Set/remove active class
         menuItems
           .parent().removeClass("active")
           .end().filter("[href='#"+id+"']").parent().addClass("active");
     }                   
  });

  //hide hero if url load with ash (anchor)
  if (window.location.hash){
    queryHash = window.location.hash;
    if ($.inArray(queryHash, anchorsMenuItems) !== -1)
    {
      console.log('oui!');
      $(".sticky-shrinknav-header").addClass("hide-nav");
    }
  }

});
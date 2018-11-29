// Cache selectors
var lastId,
    header = $(".sticky-shrinknav-header"),
    stickyMenu = $(".sticky-shrinknav-menu"),
    stickyMenuHeight = stickyMenu.outerHeight(),
    // All list items
    menuItems = header.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item;}
    });


// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){

  headerHeight = header.outerHeight();

  //if the hero header is show/we are at the top of the page
  if(headerHeight > stickyMenuHeight)
  {
    //subtract the total height of the menu (twice : at top page and after scroll)
    headerHeight = headerHeight-(stickyMenuHeight*2);
  }

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
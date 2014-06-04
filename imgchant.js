
(function ($) {
//lightbox image
   $.fn.lightbox = function(){
   $(this).on('click', function(){
   var windowH = window.innerHeight || $(window).height(),
       windowW = window.innerWidth || $(window).width(),
       picwidth = 800,
       picText = null;
   //Make a black overlay to tone out background
   $('<div id="overlay"></div>')
   .css('opacity', '0')
   .animate({'opacity': '0.6'}, 'slow')
   .appendTo('body');
   //the div which will contain the image
   $('<div id="lightbox"></div>')
   .hide()
   .appendTo('body');
   //image to put in lightbox
   $('<img id="image">')
   .attr('src', $(this).attr('src'))
   .css({
    'max-height': windowH - 20,
    'max-width': picwidth,
   })
   .attr('alt', $(this).attr('alt'))
   .load(function(){
   $('#lightbox')
    .css({
     'top': ((windowH - $('#lightbox').height()) / 2 < 0) ? 0 : (windowH - $('#lightbox').height()) / 2,
     'left':((windowW - $('#lightbox').width()) / 2 < 0) ? 0 : (windowW - $('#lightbox').width()) / 2,
    })
    .fadeIn();
   })
   .appendTo('#lightbox');
//close button
   $('<div id="close-button"></div>')
   .css({
     'top': -15,
     'right': -15
     //'width': 25
   })
   .appendTo('#lightbox');
   //image text, fetch alt from image use as image text
   $('<div id="alt"></div>')
   .css({
    'height' : 30,
    'width' : $('#lightbox').width(),
    'top': ($('#lightbox').height() - 35)
   })
   .hide()
   .appendTo('#lightbox');
   
   picText = $('#image').attr('alt');
   console.log(picText)
   $('#alt').text(picText);
   //when hovering show image text
   $('#lightbox').hover(function(){
   $('#alt')
   .fadeIn(500)
   .show();
   }, function(){
   $('#alt').delay(400).fadeOut(500);

   });
   //close functions either click x or escape
   $('#close-button').click(function(){
   closeDown();
   });
   $(document).keyup(function(e){
   if (e.keyCode == 27){
   closeDown();
   }
   });
   function closeDown(){
   $('#overlay, #lightbox').remove();
   }
 
   		   
   });
  
}
//lightboxgallery
  $.fn.lightgallery = function(){
  $(this).on('click', function(){
   var windowH = window.innerHeight || $(window).height(),
       windowW = window.innerWidth || $(window).width(),
       picwidth = 800;
   $(this).addClass('selected');
   //create overlay to focus on image
   $('<div id="overlay"></div>')
   .css('opacity', '0')
   .animate({'opacity': '0.6'}, 'slow')
   .appendTo('body');
   
   //container for pics
   $('<div id="lightgallery"></div>')
   .hide()
   .appendTo('body');   
  
   //image
   $('<img>')
   .addClass('img')
   .attr('id', $(this).attr('id'))
   .attr('src', $(this).attr('src'))
   .css({
    'max-height': windowH - 20,
    'max-width': picwidth
   })
   .load(function(){
   $('#lightgallery')
    .css({
     'top': ((windowH - $('#lightgallery').height()) / 2 < 0) ? 0 : (windowH - $('#lightgallery').height()) / 2,
     'left':((windowW - $('#lightgallery').width()) / 2 < 0) ? 0 : (windowW - $('#lightgallery').width()) / 2,
    })
    .fadeIn();
   })
   .appendTo('#lightgallery');

   //closebutton
   $('<div id="close-button"></div>')
   .css({
     'top': -15,
     'right': -15,
     'width': 25
   })
   .appendTo('#lightgallery');
   
   //on hover show arrows to control lightbox gallery
   $('#lightgallery').hover(function(){
   $('#arrowl, #arrowr')
   .fadeIn(500)
   .show();
   }, function(){
   $('#arrowl, #arrowr').delay(400).fadeOut(500);
   });
   
   //left arrow
   $('<div id="arrowl" class="arrows"></div>')
   .css({
     'top': ($('#lightgallery ').height() / 2),
     'left': 10
   })
   .hide()
   .appendTo('#lightgallery');
   
   //right arrow
   $('<div id="arrowr" class="arrows"></div>')
   .css({
     'top': ($('#lightgallery ').height() / 2),
     'right': 10
   })
   .hide()
   .appendTo('#lightgallery');
   
   //go back
   $('#arrowl').on('click', function(){
    swapImg('previous');
  });
   //go forth
  $('#arrowr').on('click', function(){
    swapImg('next');
  });
  
  //change image according to direction
  function swapImg(direction){
  //if-else to decide direction and to wrap gallery
  if(direction === 'next'){
  if($('img.selected').attr('id') === $('.gallery').last().attr('id')){
    $('img.selected')
    .removeClass('selected');
    $('.gallery').first()
    .addClass('selected');
  }else{
  $('img.selected')
    .removeClass('selected')
    .next().addClass('selected');
  }
   $('.img')
   .attr('src', $('.selected').attr('src'));
  }else if(direction === 'previous'){
  if($('img.selected').attr('id') === $('.gallery').first().attr('id')){
    $('img.selected')
    .removeClass('selected');
    $('.gallery')
    .last()
    .addClass('selected');
  }else{
  $('img.selected')
    .removeClass('selected')
    .prev().addClass('selected');
  }
   $('.img')
   .attr('src', $('.selected').attr('src'));
   
  }
}
  
   //closing functions, contains closebutton and escape to close
   $('#close-button').click(function(){
   closeDown();
   });
   
   $(document).keyup(function(e){
   if (e.keyCode == 27){
   closeDown();
   }
   });
   
   function closeDown(){
   $('#overlay, #lightgallery').remove();
   $(this).removeClass('selected');
   }

});
  
}

//slider
$.fn.slideshow = function(){ 
  var slideshowLength = $('img', this).length,
  currentPic = slideshowLength - 1,
  zindex = parseInt($(this).css('z-index')),
  currentZindex = zindex,
  $this = $(this),
  intervalId = setInterval(function(){
  rotateImages();
  }, 5000);
  //make holder for squares
  $('<div></div>')
  .addClass('squares')
  .css({
   'bottom': 0,
   'right': 0,
   'z-index': 10
  })
  .appendTo($this);
  //make squares to indicate what picture is showing
  for(var i = 0; i < slideshowLength; i++){
  $('<div></div>')
  .attr('id', i)
  .addClass('square')
  .appendTo('.squares');
  }
  //swap the images
  function rotateImages(){
  $('img', $this)
  .eq(currentPic)
  .fadeOut('slow', function() {
  $(this)
  .css('z-index', zindex)
  .fadeIn(0)
  .siblings('img', this).each(function(){
  $(this).css('z-index', ((parseInt($(this).css('z-index')) - zindex + 1) % slideshowLength + zindex));
  
  });
  //make sure square is lit up to see what image is showing
  $('.square')
  .eq(currentPic)
  .addClass('shine');
  });
  
  $('.square')
  .eq(currentPic)
  .removeClass('shine')
 
  currentPic = (slideshowLength + currentPic - 1) % slideshowLength;
  }
  
  $('img', $this)
  .each(function(){
  $(this)
  .attr('src', $(this).attr('src'))
  .css('z-index', currentZindex++);
  
  })
  //on clicking swap image
  .click(function(){
  rotateImages();
  });


}
})(jQuery);

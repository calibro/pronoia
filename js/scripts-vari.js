// dynamic offset for affix nav


$('nav').affix({
      offset: {
        top: $('#big-header').height()
      }
}); 





// navbar offset for scrollspy

var offset = 50;

$('.navbar li a').click(function(event) {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView();
    scrollBy(0, -offset);
});



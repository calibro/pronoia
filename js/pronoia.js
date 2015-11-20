/* dynamic offset for affix nav */

$('nav').affix({
      offset: {
        top: $('#erowidHeader').height()+$('#intro').outerHeight()
      }
});

var offset = 50;

$('.navbar li a').click(function(e) {
  e.preventDefault();
  // store hash
  var hash = this.hash;
  // animate
  $('html, body').animate({
      scrollTop: $(hash).offset().top-50
    }, 300, function(){
  });
});

/* parallax effect */

d3.select('#erowidHeader').on('mousemove', function(){
  var width = d3.select(this).style('width').replace('px','');
  var height = d3.select(this).style('height').replace('px','');
  var coordinates = d3.mouse(this);

  var diffX = d3.round((coordinates[0] - width/2) * 50 / (width/2));
  var diffY = d3.round((coordinates[1] - height/2) * 50 / (height/2));
  d3.select(this).style("transform", "scale(1.005) translate("+ diffX/300 + "%, " + diffY/300 +"%)");
  d3.select("#title").style("transform", "scale(0.995) translate("+ (-1*diffX/300) + "%, " + (-1*diffY/300) +"%)");
  d3.select("#subtitle").style("transform", "scale(0.995) translate("+ (-1*diffX/300) + "%, " + (-1*diffY/300) +"%)");
})

d3.select('#erowidHeader').on('mouseout', function(){
  d3.select(this).style("transform", "scale(1) translate(0%, 0%)")
  d3.select("#title").style("transform", "scale(1)translate(0%, 0%)")
  d3.select("#subtitle").style("transform", "scale(1)translate(0%, 0%)")

})

/* glitch*/

setInterval(function(){
  var random = Math.floor(Math.random()*2)+1;
  d3.select(".glitch")
    .classed("glitchDynamic_"+random, true)


  setTimeout(function(){
    d3.select(".glitch")
      .classed("glitchDynamic_"+random, false)
  },50)

}, 40000);

/* button statistics*/
  $('#section4 .btn-group-substances button').button('toggle')
  var buttons = d3.select('#section4 .btn-group').selectAll('.btn')
    .data([{visible:true}, {visible:true},{visible:true}, {visible:true}])

  buttons.on('click', function(d){
    $(this).button('toggle')
    var type = d3.select(this).attr("dtype")
    d.visible = d.visible?false:true;
    if(d.visible){
      d3.select('#'+type).style('display','block')
    }else {
      d3.select('#'+type).style('display','none')
    }
})


/* button bigrams*/
d3.xml("img/bigrams/amphetamines.svg", "image/svg+xml", function(xml) {

  var svgNode = xml.getElementsByTagName("svg")[0];
  var svg = d3.select('#bigramviz').node().appendChild(svgNode);
  d3.select('#bigramviz svg').selectAll('text').attr("font-family", "'Crimson Text', serif")

  $('#section6 .btn-group-substances button[data="amphetamines"]').button('toggle')
  var buttons = d3.select('#section6').select('.btn-group-substances').selectAll('.btn')

  buttons.on('click', function(d){
    $('#section6 .btn-group-substances button.active').button('toggle')
    $(this).button('toggle')
    var substance = d3.select(this).attr('data');
    d3.xml("img/bigrams/"+ substance +".svg", "image/svg+xml", function(xml) {
      d3.select('#bigramviz').select('svg').remove()
      var svgNode = xml.getElementsByTagName("svg")[0];
      var svg = d3.select('#bigramviz').node().appendChild(svgNode);
      d3.select('#bigramviz svg').selectAll('text').attr("font-family", "'Crimson Text', serif")
    })
  })

});

/* button boxplot*/
d3.xml("img/dosage/amphetamines.svg", "image/svg+xml", function(xml) {

  var svgNode = xml.getElementsByTagName("svg")[0];
  var svg = d3.select('#dosage').node().appendChild(svgNode);
  d3.select('#dosage svg').selectAll('text').attr("font-family", "'Crimson Text', serif")

  $('#section11 .btn-group-substances button[data="amphetamines"]').button('toggle')
  var buttons = d3.select('#section11').select('.btn-group-substances').selectAll('.btn')

  buttons.on('click', function(d){
    $('#section11 .btn-group-substances button.active').button('toggle')
    $(this).button('toggle')
    var substance = d3.select(this).attr('data');
    d3.xml("img/dosage/"+ substance +".svg", "image/svg+xml", function(xml) {
      d3.select('#dosage').select('svg').remove()
      var svgNode = xml.getElementsByTagName("svg")[0];
      var svg = d3.select('#dosage').node().appendChild(svgNode);
      d3.select('#dosage svg').selectAll('text').attr("font-family", "'Crimson Text', serif")
    })
  })

});

/* scroll statistics*/
var myInterval = false;
d3.selectAll('.leftscrollhelper').on('mouseenter', function(e){
  var div = $(this);
  var toscroll = div.next()
  myInterval = setInterval(function(){
    var leftPos = toscroll.scrollLeft();
    var pixel = leftPos - 20;
    toscroll.animate({scrollLeft: pixel},99);
  }, 100);
})

d3.selectAll('.leftscrollhelper').on('mouseout', function(){
  $(this).stop();
  clearInterval(myInterval);
  myInterval = false;
})

d3.selectAll('.rigthscrollhelper').on('mouseenter', function(e){
  var div = $(this);
  var toscroll = div.prev()
  myInterval = setInterval(function(){
    var leftPos = toscroll.scrollLeft();
    var pixel = leftPos + 20;
    toscroll.animate({scrollLeft: pixel},99);
  }, 100);
})

d3.selectAll('.rigthscrollhelper').on('mouseout', function(){
  $(this).stop();
  clearInterval(myInterval);
  myInterval = false;
})

/*favicon animation*/

facivon.animate([
  'img/favicon/fav01.png',
  'img/favicon/fav02.png',
  'img/favicon/fav03.png',
  'img/favicon/fav04.png'
],100)

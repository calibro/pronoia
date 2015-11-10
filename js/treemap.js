
var margin = {top: 40, right: 0, bottom: 10, left: 0},
    width = 1140 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

var color = d3.scale.ordinal().domain(['stimulants','hallucinogenics','sedatives','nootropics/supplements']).range(['#FF0815','#FF488E','#1FD59C','#2AEFEE']);

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.size; });

var div = d3.select("#section4").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", "auto")
    .style("top", "auto");


   


d3.json("treemap.json", function(error, root) {
  if (error) throw error;

  var node = div.datum(root).selectAll(".node")
      .data(treemap.nodes)
      .enter().append("div")
      .attr("class", "node")
      .call(position)
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .text(function(d) { return d.children ? null : d.name + ' (' + d.size + ' )'; });

  
});

// function position() {
//   this.style("left", function(d) { return d.x + "px"; })
//       .style("top", function(d) { return d.y + "px"; })
//       .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
//       .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
// }


function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}


var margin = {top: 40, right: 0, bottom: 10, left: 0},
    width = d3.select("#treemap").style("width").replace('px','') - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

var div = d3.select("#treemap").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("margin", "auto")

var color = d3.scale.ordinal().domain(['stimulants','hallucinogenics','sedatives','nootropics/supplements']).range(['#FF0815','#9578B3','#1FD59C','#2AEFEE']);

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.size; });



d3.json("data/treemap.json", function(error, root) {
  if (error) throw error;

  var node = div.datum(root).selectAll(".node")
      .data(treemap.nodes)
      .enter().append("div")
      .attr("class", "node")
      .call(position)
      .style("background", function(d) { return d.children ? null : color(d.color); })
      .text(function(d) { return d.children ? null : d.name + ' (' + d.size + ')'; })
      .filter(function(d){
        return d.children;
      })
      .style("pointer-events", "none")


});

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}

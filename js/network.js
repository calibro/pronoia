var sigInst;

sigma.parsers.json('data/graph.json', {
    renderer:{
      type: 'canvas',
  container: document.getElementById('networkContainer'),
    },
    settings: {
      mouseWheelEnabled: false,
      zoomMin: 0.1,
      zoomMax: 1,
      labelThreshold: 6,
      font: 'SourceSansPro-Regular',
      labelSize: 'proportional',
      labelSizeRatio: 1.5,
      maxEdgeSize:10,
      labelAlignment: 'top',
      borderColor: '#FDFDFD',
      doubleClickEnabled: false,
      minNodeSize: 2,
      maxNodeSize: 15
    }
}, function(s) {
    sigInst = s;
    var camera = sigInst.camera;
    var filter = sigma.plugins.filter(sigInst);

    var drag = false;

    var _dragListener = new sigma.events.drag(sigInst.renderers[0]);
    _dragListener.bind('drag', function(e) {
        drag = true;
    });
    _dragListener.bind('drop', function(e) {
        drag = false;
    });

    sigInst.graph.nodes().forEach(function(e){
      e.type = 'border';
      e.originalColor = e.color;
      e.originalLabel = e.label;
      e.name = e.label;
    });

    sigInst.graph.edges().forEach(function(e){
      e.color = 'rgba(130,130,130,0.2)';
      e.originalColor = e.color;
    });

    sigInst.refresh();

    var substances = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: sigInst.graph.nodes().map(function(d){return d.id})
    });

    $("#searchsub").typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      { source: substances}
      ).bind('typeahead:select', function(ev, suggestion) {
          var elm = sigInst.graph.nodes().filter(function(d){
            return d.id == suggestion;
          })[0]

          selectNode(elm);
          $('#searchsub').typeahead('val', null);
        });

    d3.select('#zoomIn').on('click', function(){
      if (camera.ratio < sigInst.settings("zoomMin")) return;
      sigma.misc.animation.camera(camera, {
        ratio: camera.ratio / camera.settings('zoomingRatio')
      }, {
        duration: 200
      });
    });

    d3.select('#zoomOut').on('click', function(){
      if (camera.ratio > sigInst.settings("zoomMax")) return;
      sigma.misc.animation.camera(camera, {
        ratio: camera.ratio * camera.settings('zoomingRatio')
      }, {
        duration: 200
      });
    })

    d3.select('#zoomReset').on('click', function(){
      sigma.misc.animation.camera(camera, {
          ratio: 1 ,
          x: 0,
          y: 0,
          angle: 0
        }, {
          duration: 200
        });
    })

    var selectNode = function(node){
      sigma.misc.animation.camera(camera, {
        ratio: camera.ratio ,
        x: node["read_cam0:x"],
        y: node["read_cam0:y"],
        angle: 0
      }, {
        duration: 200
      });

      filter.undo().apply();
      filter.neighborsOf(node.id).apply();
      var linked = sigInst.graph.nodes().filter(function(d){return !d.hidden && d.id != node.id})


      d3.select('.selectedNodes')
        .html("<h4>selected node</h4><p>" + node.label+"</p>");

      d3.select('.selectedNodes').classed('no-opacity', false)

      var div = d3.select('.linkedNodes')

      div.select("h4").remove()
      div.insert("h4", ".networkSide")
      div.select("h4").text('linked substances')

      var divLink = div.select('.networkSide')
      divLink.selectAll('.linkButton').remove();

      divLink.selectAll('.linkButton')
        .data(linked.sort(function(a,b){return d3.ascending(a.label,b.label)}))
        .enter()
        .append('span')
        .attr('class', 'linkButton badge')
        .text(function(d){
          return d.label
        }).on('click', function(d){
          var elm = sigInst.graph.nodes().filter(function(e){return e.id == d.id})[0]
          selectNode(elm)
        })

      div.classed('no-opacity', false)
    }

    sigInst.bind('clickNode', function(e) {
      if(!drag){
        sigma.misc.animation.camera(camera, {
          ratio: camera.ratio ,
          x: e.data.node["read_cam0:x"],
          y: e.data.node["read_cam0:y"],
          angle: 0
        }, {
          duration: 200
        });

        filter.undo().apply();
        filter.neighborsOf(e.data.node.id).apply();
        var linked = sigInst.graph.nodes().filter(function(d){return !d.hidden && d.id != e.data.node.id})


        d3.select('.selectedNodes')
          .html("<h4>selected node</h4><p>" + e.data.node.label+"</p>");

        d3.select('.selectedNodes').classed('no-opacity', false)

        var div = d3.select('.linkedNodes')

        div.select("h4").remove()
        div.insert("h4", ".networkSide")
        div.select("h4").text('linked substances')

        var divLink = div.select('.networkSide')
        divLink.selectAll('.linkButton').remove()

        divLink.selectAll('.linkButton')
          .data(linked.sort(function(a,b){return d3.ascending(a.label,b.label)}))
          .enter()
          .append('span')
          .attr('class', 'linkButton badge')
          .text(function(d){
            return d.label
          }).on('click', function(d){
            selectNode(d)
          })

        div.classed('no-opacity', false)
      }
    });

   sigInst.bind('clickStage', function(e) {
     if(!drag){
       filter.undo().apply();
       d3.select('.selectedNodes').classed('no-opacity', true)
       var div = d3.select('.linkedNodes').classed('no-opacity', true)
       setTimeout(function(){
         d3.select('.selectedNodes').html('')
         div.select("h4").remove()
         div.selectAll('.linkButton').remove();
       },500)
      }
    });
});

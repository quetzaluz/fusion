class EZLayoutMaker {
  constructor() {
    this.selectedKey = null;
    this.selectedLayer = null;
    this.layout = [];
    this.layout[0] = [];
  }

  start() {
    // TODO: Extract in addLayer function
    for(var l=0; l < 1; l++) {
      var $template = $('.layer-template').clone(false);
      $template.attr('class', 'layer layer-'+l);
      $template.attr('data-layer', l);
      $('body').append($template);

      // Setup handlers of all the keys
      for(var i=0; i <= 80; i++) {
        d3.select('.layer.layer-'+l+' .key.key-'+i).on("mouseover", function() {
          d3.select(this).classed({highlight: true});
        });
        d3.select('.layer.layer-'+l+' .key.key-'+i).on('mouseout', function() {
          d3.select(this).classed({highlight: false});
        });
        d3.select('.layer.layer-'+l+' .key.key-'+i).on('click', this.selectKey.bind(this));
      }
    }

    d3.select('body').on('keyup', function(e) {
      if(this.selectedKey != null && this.selectedLayer != null) {
        var $key = d3.select('.layer.layer-'+this.selectedLayer+' .key.key-'+this.selectedKey);
        var $text = d3.select('.layer.layer-'+this.selectedLayer+' .label.label-'+this.selectedKey);
        var $wrapper = $key.node().parentNode;

        if ($text.empty()) {
          $text = d3.select($wrapper).append('text')
            .attr('class', 'label label-'+this.selectedKey)
            .attr('x', +$key.attr('x') + $key.attr('width')/2)
            .attr('y', +$key.attr('y'));

          $text.append('tspan').attr('dx', 0).attr('dy', 30).text(d3.event.keyCode);
        } else {
          $text.select('text tspan').text(d3.event.keyCode);
        }
        this.layout[this.selectedLayer][this.selectedKey] = d3.event.keyCode;
      }
    }.bind(this));

    d3.select('#save').on('click', this.save.bind(this));
  }

  selectKey() {
    var $this = $(d3.event.target);
    var key = $this.data('key');
    var layer = $this.closest('svg').data('layer');

    if (this.selectedLayer != null && this.selectedKey != null) {
      d3.select('.layer.layer-'+this.selectedLayer+' .key.key-'+this.selectedKey).classed({selected: false});
    }
    if (this.selectedKey != key || this.selectedLayer != layer) {
      d3.select(d3.event.target).classed({selected: true});
      this.selectedKey = key;
      this.selectedLayer = layer;
    } else {
      this.selectedKey = null;
      this.selectedLayer = null;
    }
  }

  save() {
    console.log(this.layout);
  }
}

var ezlm = new EZLayoutMaker();
ezlm.start();

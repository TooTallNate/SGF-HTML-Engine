// The 'Circle' class renders a circle onto the game screen

module.load('_sgf', function(SGF) {

  function Circle() {

    // Default values
    // Center X
    this['cx'] = 0;
    // Center Y
    this['cy'] = 0;
    // Radius
    this['r'] = 10;

    this['_e'] = SGF['_svg']('circle');

  }
  module.exports = Circle;


  Circle.prototype['render'] = function(renderCount) {
    if (this['_cx'] !== this['cx']) {
      this['_e'].setAttribute('cx', this['_cx'] = this['cx']);
    }
    if (this['_cy'] !== this['cy']) {
      this['_e'].setAttribute('cy', this['_cy'] = this['cy']);
    }
    if (this['_r'] !== this['r']) {
      this['_e'].setAttribute('r', this['_r'] = this['r']);
    }
    if (this['_rfc']) {
      this['_e'].setAttribute('fill', this['_fc']);
      this['_rfc'] = false;
    }
    if (this['_rsc']) {
      this['_e'].setAttribute('stroke', this['_sc']);
      this['_rsc'] = false;
    }
    if (this['strokeWidth'] !== this['_sw']) {
      this['_e'].setAttribute('stroke-width', this['_sw'] = this['strokeWidth']);
    }
    if (this['fillOpacity'] !== this['_fo']) {
      this['_e'].setAttribute('fill-opacity', this['_fo'] = this['fillOpacity']);
    }
    if (this['strokeOpacity'] !== this['_so']) {
      this['_e'].setAttribute('stroke-opacity', this['_so'] = this['strokeOpacity']);
    }
  }

  // _fc - Fill Color
  // _rfc - Flag saying we need to re-render the Fill Color
  Circle.prototype['setFillColor'] = function(color) {
    this['_fc'] = color;
    this['_rfc'] = true;
  }

  // _sc - Stroke Color
  // _rsc - Flag saying we need to re-render the Stroke Color
  Circle.prototype['setStrokeColor'] = function(color) {
    this['_sc'] = color;
    this['_rsc'] = true;
  }

  Circle.prototype['toString'] = function() { return '[object Circle]'; }

});

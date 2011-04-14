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
      this['_e'].setAttribute('cx', this['cx']);
      this['_cx'] = this['cx'];
    }
    if (this['_cy'] !== this['cy']) {
      this['_e'].setAttribute('cy', this['cy']);
      this['_cy'] = this['cy'];
    }
    if (this['_r'] !== this['r']) {
      this['_e'].setAttribute('r', this['r']);
      this['_r'] = this['r'];
    }
  }

  Circle.prototype['toString'] = function() { return '[object Circle]'; }

});

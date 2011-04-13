// The 'Circle' class renders a circle onto the game screen

module.load('_sgf', './EventEmitter', function(SGF, Renderable) {

  function Circle() {
    // Default values
    // Center X
    this['cx'] = 0;
    // Center Y
    this['cy'] = 0;
    // Radius
    this['r'] = 10;
    // Fill color
    this['color'] = '000000';

    this['_e'] = SGF['_svg']('circle', {
      'cx': 0,
      'cy': 0,
      'r': 10,
      'fill': '#000000'
    });
  }
  module.exports = Circle;

  Circle.prototype['render'] = function() {

  }

});

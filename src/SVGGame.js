// SVGGame is in charge of creating the top-level <svg> element

module.load('_sgf', 'inherits', './Game', function(SGF, inherits, Game) {

  function SVGGame(path, container) {

    // Prepares the container for the <svg> node
    Game.call(this, path, container);

    // Create the <svg> node
    var svg = this['_s'] = SGF['_svg']('svg', {
      'xmlns': SGF['SVG_NS'],
      'version': '1.1',
      'width': '100%',
      'height': '100%'
    });
    this['container'].appendChild(this['_s']);
  }
  inherits(SVGGame, Game);
  module.exports = SVGGame;

});


module.load('inherits', './EventEmitter', function(inherits, EventEmitter) {

  function Game(path, container) {
    this['path'] = path;
    this['container'] = container;
  }
  inherits(Game, EventEmitter);
  module.exports = Game;

});

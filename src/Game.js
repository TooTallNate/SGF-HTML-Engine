// The main 'Game' class is in charge of the game loop, and is the main
// 'Container' element for the game.

module.load('_sgf', 'path', 'inherits', './EventEmitter', function(SGF, path, inherits, EventEmitter) {

  // We need the parsed url of the host page (the html page), so that the
  // game can (may) be loaded from the appropriate relative location
  var hostRoot = path['parse'](module.main.id);


  function Game(gameRoot, container) {
    this._running = false;
    this['path'] = gameRoot;
    this['container'] = container;

    // The container element's margin and padding need to be nullified
    container.style.margin = container.style.padding = '0px';

    // So we need to load the 'main.js' of the given game path.
    // Once it's loaded, we'll start the game loop.
    // We also save a (private) reference to the main module's
    // global scope, which is used to proxy to this (real) instance
    var self = this;
    var global = module.load(path['absolutize'](hostRoot, gameRoot + '/main'), function() {
      self['emit']('start');
      self['resume']();
    })[0]['global'];

    // We expose the global scope as 'game'; 'global' may also be used,
    // or 'this' at the top level of the game's 'main' module
    global['game'] = global;

    // We need to set up 'proxy' functions on the global scope of the
    // game's "main" module. This will give the appearance of this 'Game'
    // intance being the global scope of the main module, but really it's not
    for (var i in this) {
      if ("function" !== typeof this[i]) continue;
      (function(i) {
        global[i] = function() {
          return self[i].apply(self, arguments);
        }
      })(i);
    }
  }
  inherits(Game, EventEmitter);
  module.exports = Game;

  // Function to determine whether or not the game loop is currently running
  Game.prototype['isRunning'] = function() {
    return this._running;
  }

  // 'resume' resumes the game loop
  Game.prototype['resume'] = function() {
    if (this._running) return;

    this._running = true;
    this['emit']('resume');
  }

  // 'pause' pauses the game loop
  Game.prototype['pause'] = function() {
    if (!this._running) return;

    this._running = false;
    this['emit']('pause');
  }

});

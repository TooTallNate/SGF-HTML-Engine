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
    this['renderables'] = [];
    // These get incremented once per 'update'/'render' event.
    this['updateCount'] = this['renderCount'] = 0;

    // The container element's margin and padding need to be nullified
    // TODO: Ensure that the container 'hasLayout', how to do it cross-browser?
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

  // Add a renderable to the top-level game container.
  // A renderable may be any Object that contains a 'render'
  // function, though most of the time it will be a SGF
  // class like Circle, Rectangle, Sprite, etc.
  // 'shouldUpdate' defaults to true, and if true, sets up the
  // renderable to have it's 'update()' function called when the game
  // emits 'update'. 'shouldRender' defaults to true as well, and if true
  // sets up a listener to call the renderable's 'render()' function
  // when the game emits 'render'.
  Game.prototype['add'] = function(renderable, shouldUpdate, shouldRender) {
    this['renderables'].push(renderable);
    renderable['parent'] = this;
    // Add the low-level element to the container node
    this['_s'].appendChild(renderable['_e']);
    // The game developer has the option of specifying that a renderable
    // should not update or render, bases on the 2nd and 3rd arguments respectively
    if (shouldUpdate !== false) {
      renderable['_pu'] = function (uc) {
        renderable['update'] && renderable['update'](uc);
      }
      this['on']('update', renderable['_pu']);
    }
    if (shouldRender !== false) {
      renderable['_pr'] = function (rc) {
        renderable['render'] && renderable['render'](rc);
      }
      this['on']('render', renderable['_pr']);
    }
  }

  // Remove a renderable that has previously been added to
  // the game instance with 'add()'.
  Game.prototype['remove'] = function(renderable) {
    
  }

  Game.prototype['toString'] = function() { return '[object Game]'; }

});

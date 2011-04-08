// This is the SGF bootstrap file. It defines the webpage-visible
// 'SGF' object.
// TODO: Ensure's that ModuleJS is loaded.

(function(window, undefined) {

  // The 'SGF' namespace.
  var SGF = window['SGF'] = {};

  // We need to get the directory containing this bootstrap script. It's not a
  // usual module (since it get's loaded in a regular <script> tag on the page),
  // so we can't use the module.id or depend on relative resolution.
  var root = document.getElementById('SGF');
  root = root.src;
  root = root.substring(0, root.lastIndexOf('/'));


  // The 'createGame' function should be used to create and return a 'Game' instance
  // based off the given 'path'. The game will be rendered inside of 'container', which
  // should be a DOM element reference usually a <div> or <body>. Optionally, 'callback'
  // will be called when the new 'Game' instance has been created.
  function createGame(path, container, callback) {
    module.load(root + '/Game', function(Game) {
      var game = new Game(path, container);
      callback(null, game);
    });
  }
  SGF['createGame'] = createGame;


  // 'inherits' is a convenience function to make one function's prototype inherit
  // from another. It's pretty much used by all the SGF modules, so we define it here.
  var klass = function() {};
  function inherits(ctor, superCtor) {
    klass.prototype = superCtor.prototype;
    ctor.prototype = new klass;
    ctor.prototype['constructor'] = ctor;
  }
  module.define('inherits', inherits);

})(this);

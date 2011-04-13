// This is the SGF bootstrap file. It defines the webpage-visible
// 'SGF' object.
// TODO: Ensure's that ModuleJS is loaded.

(function(window, document, undefined) {

  // The 'SGF' namespace.
  var SGF = window['SGF'] = {};
  module.define('_sgf', SGF);

  // We need to get the directory containing this bootstrap script. It's not a
  // usual module (since it get's loaded in a regular <script> tag on the page),
  // so we can't use the module.id or depend on relative resolution.
  var root = document.getElementById('SGF');
  root = root.src;
  root = root.substring(0, root.lastIndexOf('/'));

  // SGF games have access to the public SGF modules at an
  // "absolute" level, so they should be defined first.
  module.provide('Circle', root+'/Circle.js');
  module.provide('EventEmitter', root+'/EventEmitter.js');
  module.provide('Game', root+'/Game.js');
  module.provide('Rectangle', root+'/Rectangle.js');


  // Feature support detection
  //   Rendering engine, should be something like VML for IE<=8, SVG for everyone else
  SGF['SVG_NS'] = 'http://www.w3.org/2000/svg';
  SGF['SVG_XL'] = 'http://www.w3.org/1999/xlink';
  SGF['SVG'] = !!document.createElementNS && !!createSVGElement('svg')['createSVGRect'];
  SGF['VML'] = false; // TODO
  var mode = SGF['SVG'] ? 'SVG' : 'VML';

  // Returns a new SVG element of the given type
  function createSVGElement(type, attrs) {
    var s = document.createElementNS(SGF['SVG_NS'], type);
    if (attrs) for (var attr in attrs) {
      s.setAttribute(attr, attrs[attr]);
    }
    return s;
  }
  SGF['_svg'] = createSVGElement;


  // The 'createGame' function should be used to create and return a 'Game' instance
  // based off the given 'path'. The game will be rendered inside of 'container', which
  // should be a DOM element reference usually a <div> or <body>. Optionally, 'callback'
  // will be called when the new 'Game' instance has been created.
  function createGame(path, container, callback) {
    module.load(root + '/' + mode + 'Game', function(Game) {
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

})(this, document);

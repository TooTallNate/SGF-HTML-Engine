Simple Game Framework
=====================
HTML Engine
-----------

The `HTML Engine` is an implementation of the [Simple Game Framework][SGF]
designed to work inside web browsers through the use of the browsers'
native JavaScript engines and render to a single container element on the page.

Some of the key features of using the `HTML Engine` are:

 * Your SGF game can be immediately deployable to users without ever needing
  to download and install, just open a web browser and point to a URL.

 * Is built using the latest HTML5 features like Audio and WebSockets. For the
  best browser compatibility, any HTML5 feature that is unsupported has an
  equivalent Flash fallback that kicks in completely automatically and transparently.

 * Deployment of your game on a webpage is easy, and your game can be placed
  inside a `<div>` somewhere on the page and function well with other page
  content (almost like a Flash window). Alternatively you can make a page
  dedicated to your SGF game, in which case you can place your game directly
  inside the page's `<body>` for a _psuedo_-"full screen" effect.

 * The engine is written with [ModuleJS][], so only the parts of the engine
  that you use in your game are ever actually downloaded to the client. If
  your game doesn't use any sound, then why load the supporting code for it?



### Deploying Your Game ###

To deploy your game on an HTML page, you must first include the bootstap
engine loader script, then simply call `SGF.createGame(path, container, cb)`
to create a `Game` instance. Here's a simple example:

    <!DOCTYPE HTML>
    <html>
      <head>
        <script type="text/javascript" src="http://html.sgfjs.org/SGF.js"></script>
      </head>
      <body>
        <div id="gameContainer" style="width:320px; height:240px;"></div>

        <script type="text/javascript">
          // The 'createGame' function requires the path to an SGF game hosted on an HTTP server,
          // a reference to a DOM container element the game will be rendered inside of, and
          // optionally a callback function when the `Game` instance is created.
          SGF.createGame("./myGame/", document.getElementById('gameContainer'), function(err, game) {
            if (err) {
              // The game could not be created for some reason
              throw err;
            }

            // the 'game' instance can receive events that your game creates, including logging,
            // and user-made events.
            game.on('log', function(val) {
              document.getElementById('gameLog').innerHTML += val + "<br>";
            });

            // You can also send events into your game instance, and pass objects. Useful to
            // pass info from a form submission, or something.
            game.emit('login', 'username', 'password');

          });
        </script>
      </body>
    </html>




### Securing Your Game ###

The `HTML Engine` was designed to be as open as possible. Never being restricted
by the `Same Origin Policy` is a primary goal throughout development. This means that
one website could theoretically hotlink to another site's SGF game(s), even against
their will.

So what do you do? There's no built in mechanism in the `HTML Engine` to prevent hotlinking,
therefore doing server-side checks before serving the content will likely be the most
secure. One way would be to check the HTTP `Referer` header, and ensure that it is
a page that you control, otherwise reject the connection. If you're using Apache,
the `.htaccess` file can do the trick nicely.

There's no _"right"_ way to secure your SGF game, as there are many different
[strategies that deal with hotlinking][hotlinking].



### Browser Compatibility ###

The `HTML Engine` attempts to support the widest range of web browsers possible, using
native browser features when available, and falling back to plugins when necessary.

Regular testing is done with:

 * Firefox 3.6+
 * Chrome 9+
 * Safari 5+
 * MobileSafari (iOS 4.3+)
 * Internet Explorer 6+


[SGF]: http://sgfjs.org
[ModuleJS]: http://modulejs.tootallnate.net
[hotlinking]: http://en.wikipedia.org/wiki/Inline_linking#Prevention

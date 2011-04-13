// This is a really basic test game.
console.log(game.isRunning() + ": game.isRunning(), outside the factory");

module.load('Circle', function(Circle) {

  console.log(game.isRunning() + ": game.isRunning(), inside the factory");
  var c = new Circle();
  c.cx = 50;
  c.cy = 50;
  c.r = 50;
  c.color = 'red';
  // Add to the game
  game.add(c);

  setTimeout(function() {
    console.log(game.isRunning() + ": game.isRunning(), after; should be true");
  }, 0);
});

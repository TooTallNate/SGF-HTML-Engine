// This is a really basic test game.
console.log(isRunning());

module.load('Circle', function(Circle) {

  var c = new Circle();
  c.cx = 50;
  c.cy = 50;
  c.r = 50;
  c.color = 'red';
  // Add to the game
  game.add(c);

});

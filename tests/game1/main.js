// This is a really basic test "game". It's simply going to render a Circle
// onto the game screen that's moving along the screen at a steady pace,
// bouncing off the screen boundaries when they're reached...

console.log(game.isRunning() + ": game.isRunning(), outside the factory; should be false");
console.log(game);

module.load('Circle', function(Circle) {

  // Create a 'Circle'
  var c = new Circle();
  // Start at the center of the game screen
  //c.cx = game.width / 2;
  //c.cy = game.height / 2;
  // Set a default radius of 25 pixels
  c.r = 25;
  c.strokeWidth = 5;
  c.setStrokeColor("#0000FF");
  c.setFillColor("#FF0000");

  // The direction x and y will each be set to some random value between -5 and 5
  c.dx = Math.random() * 10 - 10;
  c.dy = Math.random() * 10 - 10;

  // The 'update()' function will be called for every 'update' event the game
  // instance emits (after the call to 'add()' below). We set up custom logic
  // here to move the circle along the screen, and check if we've hit any screen
  // boundaries so that the ball may reverse direction.
  c.update = function(updateCount) {
    this.cx += this.dx;
    this.cy += this.dy;
    if (this.cx-this.r < 0 || this.cx+this.r > game.width) {
      this.dx *= -1;
    }
    if (this.cy-this.r < 0 || this.cy+this.r > game.height) {
      this.dy *= -1;
    }
  }

  // Add to the game, the circle will no be rendered to the canvas,
  // and the circle's 'update()' function will be called automatically.
  game.add(c);

  console.log(game.isRunning() + ": game.isRunning(), inside the factory; should be false");
  setTimeout(function() {
    console.log(game.isRunning() + ": game.isRunning(), after factory has finished; should be true");
  }, 0);

});

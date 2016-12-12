// This file implements the Enemy and Player classes
// =============================================================================
// Initial X and Y coordinates for char
var INITIAL_X = 202;
var INITIAL_Y = 415;
var COLLIDED = 50;
var speeds = [310, 300, 210];
var score = 0;

// Enemy char
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speeds[Math.floor(Math.random() * speeds.length)];
    this.x = x;
    this.y = y;
};

// Updates enemy position
Enemy.prototype.update = function(dt) {
    // Movement is the same for all computers
    this.x += this.speed * dt;
    // Canvas width is set to 505
    if (this.x >= 505) {
        this.x = 0;
    }
};

// renders enemy in the window
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// =============================================================================

// Player
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// The player's position will de updated when they reach water
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.reset(INITIAL_X, INITIAL_Y);
        alertify.alert('Winner!', 'You bested the Bugs!<br>Now do it again ;)');
        score += 1;
        $('#score').text(score);
    }
};

// Renders player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles key input recieved by the player:
// (1) Walks one square when left, right, up or down key is pushed
// (2) Does not let player wander off canvas
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= 101;
    } else if (key === 'right' && this.x < 400) {
        this.x += 101;
    } else if (key === 'up' && this.y > 0) {
        this.y -= 93;
    } else if (key === 'down' && this.y < 400) {
        this.y += 93;
    }
};

// Resets player position to bottom middle of the canvas
Player.prototype.reset = function(x, y) {
    this.x = x;
    this.y = y;
};

// Instantiating all enemies and the player

var allEnemies = [
    new Enemy(0, 60),
    new Enemy(202, 145),
    new Enemy(404, 230)
];

var player = new Player(INITIAL_X, INITIAL_Y);

// =============================================================================

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Checks if the player COLLIDED with an enemy, resets score back to zero, shows the player an alert informing what happened, then resets player's position back to the start
function checkCollisions(allEnemies, player) {
    for (i = 0; i < allEnemies.length; i++) {
        if ((player.y >= allEnemies[i].y - COLLIDED && player.y <= allEnemies[i].y + COLLIDED) && (player.x >= allEnemies[i].x - COLLIDED && player.x <= allEnemies[i].x + COLLIDED)) {
            alertify.alert('Game Over', 'You Lose<br>Your score has been reset Try again?');
            score = 0;
            $('#score').text(score);
            player.reset(INITIAL_X, INITIAL_Y);
        }
    }
};
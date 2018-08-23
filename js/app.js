/*jshint esversion: 6 */
const numRows = 6,
    numCols = 5;
    cWidth = 505;
    cHeight = 606;
    resourcesHeight = 85;
    resourcesWidth = 101;

/**
 * 
 * Random function that return a random value between the parameters
 * @param {number} min
 * @param {number} max
 */
let speed = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Enemies our player must avoid
var Enemy = function(sprite, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed (50,500);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -resourcesWidth;
        this.speed = speed (50,500);
    }
    this.handleCollision(this.x, this.y, player.x, player.y);
};

/**
 * Detects collisions between rectangles around the sprite
 * added some margins for the width to handle the .png transparent bg
 * @param {number} ex enemy X coordinate
 * @param {number} ey enemy Y coordinate
 * @param {number} px player X coordinate
 * @param {number} py player Y coordinate
 */
Enemy.prototype.handleCollision = function(ex, ey, px, py) {
    let rectEnemy = {x: ex, y: ey, width: resourcesWidth-20, height: resourcesHeight};
    let rectPlayer = {x: px, y: py, width: resourcesWidth-20, height: resourcesHeight};

    if (rectPlayer.x < rectEnemy.x + rectEnemy.width &&
        rectPlayer.x + rectPlayer.width > rectEnemy.x &&
        rectPlayer.y < rectEnemy.y + rectEnemy.height &&
        rectPlayer.height + rectPlayer.y > rectEnemy.y) {
        // collision detected | reset player position
        player.x = 202;
        player.y = 404;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


class Player {
    /**
     * 
     * @param {string} sprite 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    /**
     * Constantantly updates the player position
     * @param {number} dt
     */
    update(dt) {
        this.winCondition(this.x, this.y);
        this.constrainPlayerToMap(this.x, this.y);
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Update Player position based on user input
     * @param {string} keyPress 
     */
    handleInput(keyPress) {
        switch(keyPress) {
            case "left":
                this.x -= resourcesWidth;
                break;
            case "up":
                this.y -= resourcesHeight;
                break;
            case "right":
                this.x += resourcesWidth;
                break;
            case "down":
                    this.y += resourcesHeight;
                break;
        }
    }

    /**
     * Method to determine the win condition for Player
     * @param {number} x 
     * @param {number} y 
     */
    winCondition(x, y) {
        if (y < 0 ) {
            alert("you won!");
            this.x = 202;
            this.y = 400;
        }
    }

    /**
     * Method to constrain the player to the map
     * @param {number} x
     * @param {number} y
     */
    constrainPlayerToMap(x, y) {
        if (x > (cWidth - resourcesWidth)) {
            this.x = (cWidth - resourcesWidth);
        }

        if (x < 0) {
            this.x = 0;
        }
        // TODO: make it dynamic maybe
        if (y > 400) {
            this.y = 400;
        }
    }
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
    new Enemy('images/enemy-bug.png', -20,  60),
    new Enemy('images/enemy-bug.png', -60, 60),
    new Enemy('images/enemy-bug.png', -100, 145),
    new Enemy('images/enemy-bug.png', -50, 145),
    new Enemy('images/enemy-bug.png', -20, 230),
    new Enemy('images/enemy-bug.png', -110, 230)
];
var player = new Player('images/char-boy.png', 202, 404);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Modified it to listen for "keydown" - like any gamer would want :))
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
